package com.enixone.enixClever.cms.was.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.base.Constants;
import com.enixone.enixClever.cms.was.model.AssignDeptVO;
import com.enixone.enixClever.cms.was.model.AssignPermissionVO;
import com.enixone.enixClever.cms.was.model.FolderVO;
import com.enixone.enixClever.cms.was.model.GroupVO;
import com.enixone.enixClever.cms.was.model.PermissionVO;
import com.enixone.enixClever.core.common.GenerateKey;
import com.enixone.enixClever.core.exceptions.EnixCleverException;

@Service
@Transactional
public class GroupService extends BaseService {


    @Autowired
    SqlSession sqlSession;

    @Autowired
    FolderService folderService;

    @Autowired
    PermissionService permissionService;

    
    public List<GroupVO> selectRootGroupList(String boxId) {
        return groupDao.selectRootGroupList(boxId);
    }

    public List<GroupVO> selectChildGroupList(String parentGroupId) {
        return groupDao.selectChildGroupList(parentGroupId);
    }

    public List<GroupVO> selectAllGroupList() {
        return groupDao.selectAllGroupList();
    }

    public GroupVO selectGroupInfo(String groupId) {
        return groupDao.selectGroupInfo(groupId);
    }
    
    public List<GroupVO> selectGroupListByGroupName(String groupName) {
        return groupDao.selectGroupListByGroupName(groupName);
    }
    
    public List<GroupVO> searchGroupList(String groupName) {
        return groupDao.searchGroupList(groupName);
    }
    

    /**
     * 그룹 등록
     * @param vo
     * @return
     */
    @Transactional
    public String insertGroup(GroupVO vo) throws Exception {
        
    	// 그룹 아이디 생성
    	GenerateKey genKey = GenerateKey.getInstance();
    	String groupId = genKey.getKey("55");
    	vo.setGroupId(groupId);
    	vo.setBoxId("BOX_GROUP");
    
    
        // 부서 기본 권한 생성
        PermissionVO permVO = new PermissionVO();
        permVO.setPermissionName(vo.getGroupName() + " 부서 권한");
        permVO.setIsSystem("Y");
        permVO.setOwnerId(groupId);
        permVO.setOwnerType("GROUP");
        permVO.setCreatorId(getSessionUserKey());
        
        //부서 기본 권한에 접근권한 상세를 적용한다. 
        AssignPermissionVO permItem = new AssignPermissionVO();
        permItem.setTargetName(vo.getGroupName());
        permItem.setTargetId(vo.getGroupId());
        permItem.setTargetType("GROUP");
        permItem.setRead("Y");
        permItem.setCreate("Y");
        permItem.setUpdate("N");
        permItem.setDelete("N");
        permItem.setListView("Y");
        permItem.setPermission("N");
        permItem.setDownload("Y");
        permItem.setEdit("Y");
        permItem.setPrint("Y");

        List<AssignPermissionVO> listPermItem = new ArrayList<AssignPermissionVO>(); 
        listPermItem.add(permItem);
        
        permVO.setAccessorList(listPermItem);
        
        // 부서 폴더 정보 구성
        FolderVO folderVO = new FolderVO();
        folderVO.setFolderName(vo.getGroupName());
        folderVO.setPermissionId(permissionService.insertPermission(permVO)); // 부서 기본권한 생성 후 폴더에 권한을 적용한다. 
        folderVO.setBoxId(vo.getBoxId());
        folderVO.setIsSystem("Y");
        folderVO.setIsGroupOnly("Y");
        folderVO.setStatusCode(Constants.STATUS_ACTIVE); // 활성화 상태
        folderVO.setTypeCode(Constants.FOLDER_TYPE_GROUP); // 부서 폴더 타입

        // 부서 폴더 등록하고, 그룹에 폴더 아이디를 넣어준다. 
        vo.setGroupFolderId(folderService.insertFolder(folderVO));
        
        // 부서 등록
        groupDao.insertGroup(vo);
 
        return vo.getGroupId();
    }

    /**
     * 그룹 수정
     * @param vo
     * @return
     */
    public int updateGroup(GroupVO vo) throws Exception {
        // 부서 기본 권한 명 수정
        permissionDao.updatePermissionName(vo.getGroupId(), vo.getGroupName() + " 부서 권한");

        // 그룹 폴더 명 수정
        folderService.updateFolderName(vo.getGroupId(), vo.getGroupName());

        // 그룹 수정
        return groupDao.updateGroup(vo);
    }

    /**
     * 그룹 삭제
     * @param groupId
     * @return
     */
    public void deleteGroup(String groupId) throws Exception {
        // 기존 그룹 정보 조회
        GroupVO groupInfo = groupDao.selectGroupInfo(groupId);

        // 기존 그룹 폴더 정보 조회
        FolderVO folderInfo = folderDao.selectFolderInfo(groupId);

        // 부서 기본권한을 사용중인 문서
        int assignDocs = permissionDao.countAssignDocs(groupId);

        // 부서 기본권한을 사용중인 폴더
        int assignFolders = permissionDao.countAssignFolders(groupId);

        // 하위 그룹 유무
        if (groupInfo.getChildCount() > 0) {
            throw new EnixCleverException("하위 부서가 존재하여 삭제할 수 없습니다.");
        }

        // 사용자 유무
        if (groupInfo.getUserCount() > 0) {
            throw new EnixCleverException("부서에 사용자가 존재하여 삭제할 수 없습니다.");
        }

        // 부서 폴더 하위에 등록된 폴더 유무
        if (groupInfo.getChildCount() > 0) {
            throw new EnixCleverException("하위폴더가 존재하여 삭제할 수 없습니다.");
        }

        /* 폴더의 경우로 보여 비활성화
        // 부서 폴더에 등록된 문서 유무
        if (folderInfo.getDocCount() > 0) {
            throw new EnixCleverException("폴더에 등록된 문서가 존재하여 삭제할 수 없습니다.");
      	}
		*/	
        // 부서 기본권한을 사용중인 문서 유무
        if (assignDocs > 0) {
            throw new EnixCleverException("부서 기본권한을 사용중인 문서가 존재하여 삭제할 수 없습니다.");
        }

        // 부서 기본권한을 사용중인 폴더 유무
        if (assignFolders > 0) {
            throw new EnixCleverException("부서 기본권한을 사용중인 폴더가 존재하여 삭제할 수 없습니다.");
        }

        // 부서 기본 폴더 삭제
        folderDao.deleteFolder(groupId);

        // 부서 삭제
        groupDao.deleteGroup(groupId);

        // 부서 기본 권한 아이템 삭제
        permissionDao.deleteAssignListByPermission(groupId);

        // 부서 기본 권한 삭제
        permissionDao.deletePermission(groupId);

    }

    /**
     * 부서원 추가
     * @param groupId
     * @param userKeyList
     * @throws Exception
     */
    public void insertGroupUser(String groupId, List<String> userKeyList) throws Exception {

        for (String userKey : userKeyList) {
            AssignDeptVO vo = groupDao.selectAssignDept(userKey, groupId);

            if (vo != null) {
                continue;
            }

            groupDao.insertAssignDept(userKey, groupId, "N");
        }
    }

}
