package com.enixone.enixClever.cms.was.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.enixone.enixClever.cms.was.model.AssignDeptVO;
import com.enixone.enixClever.cms.was.model.GroupVO;

@Repository
public interface GroupDao {
    List<GroupVO> selectRootGroupList(String boxId);
    List<GroupVO> selectChildGroupList(String parentGroupId);
    List<GroupVO> selectAllGroupList();
    List<GroupVO> selectGroupListByGroupName(String groupName);
    List<GroupVO> searchGroupList(
    		@Param("groupName") String groupName
    		);
    
    GroupVO selectGroupInfo(String groupId);
    int insertGroup(GroupVO vo);
    int updateGroup(GroupVO vo);
    int deleteGroup(String groupId);

    int insertAssignDept(
            @Param("userKey") String userKey,
            @Param("groupId") String groupId,
            @Param("isMain") String isMain
    );

    AssignDeptVO selectAssignDept(
            @Param("userKey") String userKey,
            @Param("groupId") String groupId
    );
}
