package com.enixone.enixClever.cms.was.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentBookmarkVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;

@Repository
public interface DocumentBookmarkDao {
	/* 북마크 문서 */
    int insertBookmarkDoc(DocumentBookmarkVO vo);
    int deleteBookmarkDoc(
    		@Param("userKey") String userKey,
    		@Param("docId") String docId
   );
    
    List<DocumentVO> selectBookmarkDocByUserKey(
            @Param("userKey") String userKey,
            @Param("paging")PaginationVO paging
    );
    
    DocumentBookmarkVO selectIsBookmark(
    		@Param("userKey") String userKey,
    		@Param("docId") String docId
    );
    
}
