package com.enixone.enixClever.cms.was.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.model.AssignPermissionVO;
import com.enixone.enixClever.cms.was.model.BookmarkFolderVO;
import com.enixone.enixClever.cms.was.model.FolderVO;
import com.enixone.enixClever.cms.was.utils.CommonUtil;
import com.enixone.enixClever.cms.was.utils.PermissionUtil;
import com.enixone.enixClever.core.common.GenerateKey;
import com.enixone.enixClever.core.exceptions.EnixCleverException;

@Service
@Transactional
public class FolderService extends BaseService {


    @Autowired
    SqlSession sqlSession;



    /**
     * [내 문서함] 문서함의 최상위 폴더 목록 조회
     * @param boxId
     * @return
     */
    public List<FolderVO> selectMyPrivateRootFolderList(String boxId, String userKey) {

        //------------------------------------------------------------
        // 1. 폴더 조회
        //------------------------------------------------------------

        List<FolderVO> folderList = folderDao.selectRootFolderList(boxId, null, "N");

        //------------------------------------------------------------
        // 2. 조회된 폴더에 마스터 권한을 설정한다
        //------------------------------------------------------------
        PermissionUtil.setAdminPermissionToFolder(folderList);

        return folderList;
    }

    /**
     * [부서 문서함] 사용자가 속한 부서 폴더 목록 조회
     * @param userKey
     * @return
     */
    public List<FolderVO> selectMyGroupFolderList(String boxId, String userKey) {
        //------------------------------------------------------------
        // 1. 권한 조회 및 계산
        //------------------------------------------------------------

        // 루트 폴더의 권한 아이디 목록을 조회한다
        List<String> folderPermissionIdList = folderDao.selectRootFolderPermissionIdList(boxId);
        List<AssignPermissionVO> permissionInfoList = new ArrayList<>();

        // 권한을 계산하여 조회한다
        for (String folderPermissionId : folderPermissionIdList) {
            permissionInfoList.add(permissionDao.getUserPermission(folderPermissionId, userKey));
        }

        // 목록조회가 가능한 권한 목록
        List<String> listViewPermissions = PermissionUtil.getListViewPermission(permissionInfoList);

        //------------------------------------------------------------
        // 2. 권한에 해당된 폴더 조회
        //------------------------------------------------------------

        List<FolderVO> folderList = folderDao.selectMyGroupFolderList(boxId, userKey);

        //------------------------------------------------------------
        // 3. 조회된 폴더에 권한을 설정한다
        //------------------------------------------------------------
        PermissionUtil.setFolderPermission(folderList, permissionInfoList);

        return folderList;
    }

    /**
     * [전사, 업무 문서함] 문서함의 최상위 폴더 목록 조회
     * @param boxId
     * @return
     */
    public List<FolderVO> selectRootFolderList(String boxId, String userKey) {
    	
    	//------------------------------------------------------------
        // 1. 권한 조회 및 계산
        //------------------------------------------------------------

        // 루트 폴더의 권한 아이디 목록을 조회한다
        List<String> folderPermissionIdList = folderDao.selectRootFolderPermissionIdList(boxId);
        List<AssignPermissionVO> permissionInfoList = new ArrayList<>();

        // 권한을 계산하여 조회한다
        for (String folderPermissionId : folderPermissionIdList) {
            permissionInfoList.add(permissionDao.getUserPermission(folderPermissionId, userKey));
        }

        // 목록조회가 가능한 권한 목록
        List<String> listViewPermissions = PermissionUtil.getListViewPermission(permissionInfoList);

        //------------------------------------------------------------
        // 2. 권한에 해당된 폴더 조회
        //------------------------------------------------------------

        List<FolderVO> folderList = folderDao.selectRootFolderList(boxId, listViewPermissions, "Y");

        //------------------------------------------------------------
        // 3. 조회된 폴더에 권한을 설정한다
        //------------------------------------------------------------
        PermissionUtil.setFolderPermission(folderList, permissionInfoList);

        return folderList;
    }

    /**
     * [전사문서함] 하위 폴더 목록 조회
     * @param parentFolderId
     * @return
     */
    public List<FolderVO> selectGlobalFolderListByParentId(String parentFolderId,  boolean isGlobalBox, boolean showGroupOnlyFolder) throws Exception{
        //------------------------------------------------------------
        // 1. 권한 조회 및 계산
        //------------------------------------------------------------

        // 루트 폴더의 권한 아이디 목록을 조회한다
        List<String> folderPermissionIdList = folderDao.selectChildFolderPermissionIdList(parentFolderId);
        List<AssignPermissionVO> permissionInfoList = new ArrayList<>();

        // 권한을 계산하여 조회한다
        for (String folderPermissionId : folderPermissionIdList) {
            permissionInfoList.add(permissionDao.getUserPermission(folderPermissionId, getSessionUserKey()));
        }

        // 목록조회가 가능한 권한 목록
        List<String> listViewPermissions = PermissionUtil.getListViewPermission(permissionInfoList);

        //------------------------------------------------------------
        // 2. 권한에 해당된 폴더 조회
        //------------------------------------------------------------
        // system 폴더를 조회한다 (부서 기본 폴더)
        // 그룹 전용 폴더를 제외한 나머지 폴더를 조회한다
        List<FolderVO> folderList = folderDao.selectFolderListByParentId(
                parentFolderId,
                listViewPermissions,
                (isGlobalBox ? "Y" : "N"),
                (showGroupOnlyFolder ? "Y" : "N")
        );

        //------------------------------------------------------------
        // 3. 조회된 폴더에 권한을 설정한다
        //------------------------------------------------------------
        PermissionUtil.setFolderPermission(folderList, permissionInfoList);

        return folderList; 
    }

    /**
     * 폴더 상세 정보 조회
     * @param folderId
     * @return
     */
    public FolderVO selectFolderInfo(String folderId) {
        return folderDao.selectFolderInfo(folderId);
    }

    /**
     * 폴더 등록
     * @param vo
     * @return
     */
    @Transactional
    public String insertFolder(FolderVO vo) throws Exception {

        // [유효성 검사] 동일 폴더 명
        if (folderDao.countDuplicateNameFolder(vo.getParentFolderId(), vo.getFolderName(), null) > 0) {
            throw new EnixCleverException("동일한 폴더명이 이미 있습니다");
        }

        // 폴더 아이디 생성
        if (StringUtils.isBlank(vo.getFolderId())) {
        	GenerateKey genKey = GenerateKey.getInstance();
        	vo.setFolderId(genKey.getKey("15"));
        }

        // 생성자 아이디 지정
        if (StringUtils.isBlank(vo.getCreatorId())) {

            // 로그인 유저를 생성자로 지정한다
            vo.setCreatorId(getSessionUserKey());
        }

        // [문서함 - 폴더] 맵핑 등록
        boxDao.insertMappingBoxFolder(vo.getBoxId(), vo.getFolderId());

        // 폴더 등록
        folderDao.insertFolder(vo);

        return vo.getFolderId();
    }

    /**
     * 폴더 수정
     * @param vo
     * @return
     */
    public int updateFolder(FolderVO vo) throws Exception {

        // [유효성 검사] 동일 폴더 명
        if (CommonUtil.notEmpty(vo.getFolderName()) && folderDao.countDuplicateNameFolder(vo.getParentFolderId(), vo.getFolderName(), vo.getFolderId()) > 0) {
            throw new EnixCleverException("동일한 폴더명이 이미 있습니다");
        }

        // 수정자 아이디 지정
        if (StringUtils.isBlank(vo.getUpdatorId())) {

            // 로그인 유저를 생성자로 지정한다
            vo.setUpdatorId(getSessionUserKey());
        }
        return folderDao.updateFolder(vo);
    }

    /**
     * 폴더 이름 변경
     * @param folderId
     * @param folderName
     * @return
     * @throws Exception
     */
    public int updateFolderName(String folderId, String folderName) throws Exception {
        return folderDao.updateFolderName(folderId, folderName, getSessionUserKey());
    }

    /**
     * 하위 폴더 갯수 수정
     * @param folderId
     * @param childCount
     * @return
     */
    public int updateChildCount(String folderId, int childCount) {
        return folderDao.updateChildCount(folderId, childCount);
    }

    /**
     * 폴더 삭제
     * @param folderId
     * @return
     */
    public void deleteFolder(String folderId) throws Exception {

        // 하위 폴더 유무
        if (folderDao.countChildFolder(folderId) > 0) {
            throw new EnixCleverException("하위폴더가 존재하여 삭제할 수 없습니다.");
        }

        // 문서 유무
        if (docDao.countDocByFolderId(folderId) > 0) {
            throw new EnixCleverException("폴더에 등록된 문서가 존재하여 삭제할 수 없습니다.");
        }


        // 문서함 - 폴더 맵핑 삭제
        boxDao.deleteMappingBoxFolder(folderId);

        // 폴더 삭제
        folderDao.deleteFolder(folderId);
    }

    /**
     * 북마크 폴더 등록
     * @param folderId
     * @return
     * @throws Exception
     */
    public String insertBookmarkFolder(String folderId) throws Exception {

        FolderVO dbInfo = folderDao.selectBookmarkFolderInfo(folderId, getSessionUserKey());

        if (dbInfo != null) {
            throw new EnixCleverException("이미 등록된 폴더입니다.");
        }

        BookmarkFolderVO vo = new BookmarkFolderVO();
        
        GenerateKey genKey = GenerateKey.getInstance();
    	vo.setBookmarkId(genKey.getKey("12"));
        vo.setUserKey(getSessionUserKey());
        vo.setFolderId(folderId);

        // 북마크 등록
        folderDao.insertBookmarkFolder(vo);

        return vo.getBookmarkId();
    }

    /**
     * 북마크 폴더 삭제
     * @param folderId
     * @return
     */
    public int deleteBookmarkFolder(String folderId) throws Exception {
        return folderDao.deleteBookmarkFolder(folderId, getSessionUserKey());
    }

    /**
     * 북마크 폴더 정보 조회
     * @param userKey
     * @return
     */
    public List<FolderVO> selectBookmarkFolderByUserKey(String userKey) {

        //------------------------------------------------------------
        // 1. 권한 조회 및 계산
        //------------------------------------------------------------
        List<AssignPermissionVO> permissionInfoList = new ArrayList<>();

        List<FolderVO> list = folderDao.selectBookmarkFolderByUserKey(userKey);
        List<String> permissionIdList = new ArrayList<>();

        // 권한을 계산하여 조회한다
        for (FolderVO folderInfo : list) {
            if (!permissionIdList.contains(folderInfo.getPermissionId())) {
                permissionInfoList.add(permissionDao.getUserPermission(folderInfo.getPermissionId(), userKey));
            }
        }

        //------------------------------------------------------------
        // 2. 조회된 폴더에 권한을 설정한다
        //------------------------------------------------------------
        PermissionUtil.setFolderPermission(list, permissionInfoList);

        return list;
    }
    
    
    /**
     * [공통] 전체 폴더 목록을 조회한다.
     * @param keywords
     * @return
     */
    public List<FolderVO> selectFolderListByBoxId(String userKey, String boxId, String folderName) {

    	List<FolderVO> folderList = folderDao.selectFolderListByBoxId(userKey, boxId, folderName);

        return folderList;
    }

    
    
    
}
