package com.enixone.enixClever.cms.was.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.AssignPermissionVO;
import com.enixone.enixClever.cms.was.model.PermissionVO;

@Repository
public interface PermissionDao {
    List<PermissionVO> selectPermissionList();
    List<PermissionVO> selectPermissionListPage(
            @Param("paging") PaginationVO paging
    );
    PermissionVO selectPermissionInfo(String permissionId);
    int insertPermission(PermissionVO vo);
    int updatePermission(PermissionVO vo);
    int updatePermissionName(
            @Param("permissionId") String permissionId,
            @Param("permissionName") String permissionName
    );
    int deletePermission(String permissionId);

    List<AssignPermissionVO> selectAssignListByPermissionId(String permissionId);
    int insertAssignPermission(AssignPermissionVO vo);
    int updateAssignPermission(AssignPermissionVO vo);

    int updateLastAssignDate(String permissionId);
    
    int deleteAssignPermission(
            @Param("permissionId") String permissionId,
            @Param("targetId") String targetId
    );
    int deleteAssignListByPermission(String permissionId);

    List<PermissionVO> selectAvailablePermission(String targetId);
    int countAssignFolders(String permissionId);
    int countAssignDocs(String permissionId);

    AssignPermissionVO getUserPermission(
            @Param("permissionId") String permissionId,
            @Param("userKey") String userKey
    );
}
