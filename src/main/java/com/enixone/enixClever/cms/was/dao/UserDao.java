package com.enixone.enixClever.cms.was.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.UserVO;

@Repository
public interface UserDao {
    List<UserVO> selectUserList(
    		@Param("paging") PaginationVO paging, 
    		@Param("statusCode") String statusCode
    );
    List<UserVO> selectUserListByUserName(
            @Param("userKey") String userKey,
            @Param("userName") String userName
    );
    List<UserVO> searchUserListByUserName(
            @Param("userName") String userName
    );
    List<UserVO> selectAllGroupUserList(
            @Param("groupId") String groupId
    );
    List<UserVO> selectGroupUserList(
            @Param("groupId") String groupId,
            @Param("paging") PaginationVO paging
    );
    
    List<UserVO> selectgroupMember(
    		@Param("groupId") String groupId,
    		@Param("paging") PaginationVO paging
    );
    
    List<UserVO> selectMainUser(
    		@Param("userName") String userName,
    		@Param("paging") PaginationVO paging
    );
    
    UserVO selectUserInfo(String userKey);
    int insertUser(UserVO user);
    int updateUser(UserVO user);
    
    int approvalUser(UserVO user);
    
    int updateUserStatus(
            @Param("statusCode") String statusCode,
            @Param("userKey") String userKey
    );
    int deleteUserList(List<String> userKeyList);
    

}
