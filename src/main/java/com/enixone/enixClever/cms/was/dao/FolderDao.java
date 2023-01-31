package com.enixone.enixClever.cms.was.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.enixone.enixClever.cms.was.model.BookmarkFolderVO;
import com.enixone.enixClever.cms.was.model.FolderVO;

@Repository
public interface FolderDao {
    List<FolderVO> selectRootFolderList(
            @Param("boxId") String boxId,
            @Param("permissionList") List<String> permissionList,
            @Param("isSystem") String isSystem
    );
    List<String> selectRootFolderPermissionIdList(String boxId);
    List<String> selectChildFolderPermissionIdList(String parentFolderId);
    List<FolderVO> selectMyGroupFolderList(
            @Param("boxId") String boxId,
            @Param("userKey") String userKey);
    List<FolderVO> selectFolderListByParentId(
            @Param("parentFolderId") String parentFolderId,
            @Param("permissionList") List<String> permissionList,
            @Param("isSystem") String isSystem,
            @Param("showGroupOnlyFolders") String showGroupFolders
    );
    FolderVO selectFolderInfoByDocId(String docId);
    int countChildFolder(String parentFolderId);
    FolderVO selectFolderInfo(String folderId);
    int countDuplicateNameFolder(
            @Param("parentFolderId") String parentFolderId,
            @Param("folderName") String folderName,
            @Param("folderId") String folderId
    );
    int insertFolder(FolderVO vo);
    int updateFolder(FolderVO vo);
    int updateFolderName(
            @Param("folderId") String folderId,
            @Param("folderName") String folderName,
            @Param("updatorId") String updatorId
    );
    int updateChildCount(
            @Param("folderId") String folderId,
            @Param("childCount") int childCount
    );
    int deleteFolder(String folderId);

    /* EO_MAPPING_FOLDER_DOC */
    int insertMappingFolderDoc(
            @Param("folderId") String folderId,
            @Param("docId") String docId
    );

    int updateOldVersionDoc(String docId);


    /* 북마크 폴더 */
    int insertBookmarkFolder(BookmarkFolderVO vo);
    int deleteBookmarkFolder(
             @Param("folderId") String folderId,
             @Param("userKey") String userKey
    );

    FolderVO selectBookmarkFolderInfo(
            @Param("folderId") String folderId,
            @Param("userKey") String userKey
    );
    List<FolderVO> selectBookmarkFolderByUserKey(String userKey);
    
    
    List<FolderVO> selectFolderListByBoxId(
            @Param("boxId") String boxId,
            @Param("userKey") String userKey,
            @Param("folderName") String folderName
    );
    
    
}
