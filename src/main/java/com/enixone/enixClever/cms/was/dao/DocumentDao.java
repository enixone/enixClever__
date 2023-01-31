package com.enixone.enixClever.cms.was.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentBookmarkVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;

@Repository
public interface DocumentDao {
    List<DocumentVO> selectDocListByFolderId(
            @Param("folderId") String folderId,
            @Param("permissionList") List<String> permissionList,
            @Param("paging")PaginationVO paging
            );
    List<String> selectPermissionIdListByDocFolderId(String folderId);
    
    List<String> selectPermissionIdDocListByUserKey(String userKey);
    
    
    DocumentVO selectDocInfo(String docId);
    List<DocumentVO> selectAllVersionDocInfo(String docId);

    int countDocByFolderId(String folderId);
    int insertDocument(DocumentVO vo);
    int trashDocument(
            @Param("docId") String docId,
            @Param("firstDocId") String firstDocId
    );
    /* 문서-파일 맵핑 */
    int insertMappingDocFile(
    		@Param("docId") String docId,
            @Param("fileId") String fileId
    );


    /* 만료 문서 */
    List<DocumentVO> selectExpiredDocList(
            @Param("paging")PaginationVO paging
    );
    List<DocumentVO> selectMyExpireDocList(
            @Param("userKey") String userKey,
            @Param("paging")PaginationVO paging
    );

    List<DocumentVO> selectExpiredDocListByInterval(
            @Param("interval") String interval,
            @Param("intervalValue") String intervalValue,
            @Param("intervalCode") String intervalCode
    );

    void setExpiredDoc(String docId);
    void restoreDoc(String docId);

    /* 휴지통 문서 */
    List<DocumentVO> selectTrashDocList(
            @Param("userKey") String userKey,
            @Param("paging")PaginationVO paging
    );

    int terminateDocument(String docId);


    /* 휴지통 문서 */
    List<DocumentVO> selectTerminateDocList(
            @Param("paging")PaginationVO paging
    );

    /* 최근 문서 */
    List<DocumentVO> selectRecentDocList(
            @Param("actorId") String actorId,
            @Param("paging") PaginationVO paging
    );

    /* 사용자의 부서 문서함 문서 조회 */
    List<DocumentVO> selectUserWorkspaceDocs(String userKey);

    /**
     * 문서 소유권 변경
     * @param docId 문서 아이디
     * @param ownerId 소유자 아이디
     */
    void changeOwner(
            @Param("docId") String docId,
            @Param("ownerId") String ownerId
    );
}
