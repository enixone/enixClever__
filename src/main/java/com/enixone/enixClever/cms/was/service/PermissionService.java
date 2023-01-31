package com.enixone.enixClever.cms.was.service;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.AssignPermissionVO;
import com.enixone.enixClever.cms.was.model.PermissionVO;
import com.enixone.enixClever.cms.was.model.RoleVO;
import com.enixone.enixClever.core.common.GenerateKey;
import com.enixone.enixClever.core.exceptions.EnixCleverException;

@Service
@Transactional
public class PermissionService extends BaseService {

    public List<PermissionVO> selectPermissionList() {
        return permissionDao.selectPermissionList();
    }

    public List<PermissionVO> selectPermissionListPage(PaginationVO paging) {
        return permissionDao.selectPermissionListPage(paging);
    }

    public PermissionVO selectPermissionInfo(String permissionId) {
        PermissionVO vo = permissionDao.selectPermissionInfo(permissionId);
        vo.setAccessorList(permissionDao.selectAssignListByPermissionId(permissionId));
        return vo;
    }

    @Transactional
    public String insertPermission(PermissionVO vo) throws Exception {
        
    	GenerateKey genKey = GenerateKey.getInstance();
    	String permissionId = genKey.getKey("00");

        vo.setPermissionId(permissionId);
        vo.setCreatorId(getSessionUserKey());

        for (AssignPermissionVO item : vo.getAccessorList()) {
            item.setPermissionId(permissionId);
            permissionDao.insertAssignPermission(item);
        }

        permissionDao.insertPermission(vo);
        return vo.getPermissionId();
    }

    @Transactional
    public void updatePermission(PermissionVO vo) throws Exception {

        // 수정자 아이디 저장
        vo.setUpdatorId(getSessionUserKey());

        // 권한 기본정보 수정
        permissionDao.updatePermission(vo);

        // 권한 할당자 정보 삭제
        permissionDao.deleteAssignListByPermission(vo.getPermissionId());

        // 권한 할당자 정보 추가
        for (AssignPermissionVO item : vo.getAccessorList()) {
            item.setPermissionId(vo.getPermissionId());
            permissionDao.insertAssignPermission(item);
        }

    }

    public void deletePermission(String permissinoId) {

        int assignDocs = permissionDao.countAssignDocs(permissinoId);
        int assignFolders = permissionDao.countAssignFolders(permissinoId);

        if (assignDocs > 0) throw new EnixCleverException("권한을 사용중인 문서가 있습니다.");
        if (assignFolders > 0) throw new EnixCleverException("권한을 사용중인 폴더가 있습니다.");

        // 권한 아이템 삭제
        permissionDao.deleteAssignListByPermission(permissinoId);

        // 권한 삭제
        permissionDao.deletePermission(permissinoId);
    }

    public List<AssignPermissionVO> selectAssignListByPermissionId(String permissionId) {
        return permissionDao.selectAssignListByPermissionId(permissionId);
    }

    public int insertAssignPermission(AssignPermissionVO vo) {
        return permissionDao.insertAssignPermission(vo);
    }

    public int updateLastAssign(String permissionId) {
        return permissionDao.updateLastAssignDate(permissionId);
    }

    public int updateAssignPermission(AssignPermissionVO vo) {
        return permissionDao.updateAssignPermission(vo);
    }

    public int deleteAssignPermission(String permissionId, String targetId) {
        return permissionDao.deleteAssignPermission(permissionId, targetId);
    }

    public int deleteAssignListByPermission(String permissionId) {
        return permissionDao.deleteAssignListByPermission(permissionId);
    }

    
    
    
    public List<PermissionVO> selectAvailablePermission(String userKey) {
        RoleVO roleVO = roleDao.selectRoleInfoByUserKey(userKey);

        // 관리자여부 체크
        if (StringUtils.equals(roleVO.getAdmin(), "Y")) {
            // 관리자일경우 전체 권한 목록을 조회한다
            return permissionDao.selectPermissionList();
        } else {
            // 일반 사용자일경우 사용 가능한 권한 목록을 조회한다
            return permissionDao.selectAvailablePermission(userKey);
        }
    }
}
