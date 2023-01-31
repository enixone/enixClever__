package com.enixone.enixClever.cms.was.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;

@Repository
public interface MyPrivateDao {
	List<DocumentVO> selectNewDocList(
            @Param("userKey") String userKey,
            @Param("permissionList") List<String> permissionList,
            @Param("paging")PaginationVO paging
    );
	
	/* 내 문서 */
    List<DocumentVO> selectMyDocumentList(
            @Param("userKey") String userKey,
            @Param("paging") PaginationVO paging
    );

    /* 임시 저장 문서 */
    List<DocumentVO> selectTempSaveList(
            @Param("userKey") String userKey,
            @Param("paging") PaginationVO paging
    );
    
    /* 만료 문서 */
    List<DocumentVO> selectExpiredDocList(
            @Param("userKey") String userKey,
            @Param("paging") PaginationVO paging
    );
    
    
    /* 결제 대상 문서 */
    List<DocumentVO> selectWorkflowList(
    		@Param("userKey") String userKey,
    		@Param("listPart") String listPart,
            @Param("paging") PaginationVO paging
    );
    
    /* 비밀관리 기록부 */
    List<DocumentVO> selectSecurityDocList(
    		@Param("userKey") String userKey,
    		@Param("paging") PaginationVO paging
    );
    
    
    
    
    
    
}
