package com.enixone.enixClever.cms.was.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.RoleVO;

@Repository
public interface RoleDao {
    List<RoleVO> selectRoleList();
    List<RoleVO> selectRoleListPage(
            @Param("paging")PaginationVO paging
    );
    
    List<RoleVO> selectRoleListByGroupName(
            @Param("roleName")String roleName
    );
    List<RoleVO> searchRoleList(
    		@Param("roleName")String roleName
	);
    
    RoleVO selectRoleInfo(String roleId);
    RoleVO selectRoleInfoByUserKey(String userKey);
    int insertRole(RoleVO vo);
    int updateRole(RoleVO vo);
    int deleteRole(String roleId);

    int countAssignUsers(String permissionId);
}
