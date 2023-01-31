package com.enixone.enixClever.cms.was.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.RoleVO;
import com.enixone.enixClever.core.common.GenerateKey;
import com.enixone.enixClever.core.exceptions.EnixCleverException;

@Service
@Transactional
public class RoleService extends BaseService {

	public List<RoleVO> selectRoleList() {
        return roleDao.selectRoleList();
    }
	
	
	public List<RoleVO> selectRoleListByGroupName(String roleName) {
        return roleDao.selectRoleListByGroupName(roleName);
    }    
    
    public List<RoleVO> selectRoleListPage(PaginationVO paging) {
        return roleDao.selectRoleListPage(paging);
    }
    
    public List<RoleVO> searchRoleList(String roleName) {
    	return roleDao.searchRoleList(roleName);
    }

    public RoleVO selectRoleInfo(String roleId) {
        return roleDao.selectRoleInfo(roleId);
    }

    @Transactional
    public String insertRole(RoleVO vo) throws Exception {
        
    	GenerateKey genKey = GenerateKey.getInstance();
    	String roleId = genKey.getKey("91");
    	
        vo.setRoleId(roleId);
        vo.setCreatorId(getSessionUserKey());

        roleDao.insertRole(vo);
        return roleId;
    }

    @Transactional
    public void updateRole(RoleVO vo) throws Exception {

        // 수정자 아이디 저장
        vo.setUpdatorId(getSessionUserKey());

        // 권한 기본정보 수정
        roleDao.updateRole(vo);
    }

    public int deleteRole(String roleId) {
        int assignUsers = roleDao.countAssignUsers(roleId);

        if (assignUsers > 0) throw new EnixCleverException("역할을 사용중인 사용자가 있습니다.");

        return roleDao.deleteRole(roleId);
    }

}
