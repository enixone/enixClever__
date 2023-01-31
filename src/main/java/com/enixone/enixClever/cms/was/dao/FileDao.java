package com.enixone.enixClever.cms.was.dao;

import com.enixone.enixClever.cms.was.model.FileVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileDao {
    List<FileVO> selectFileListByDocId(String docId);
    FileVO selectFileInfo(String fileId);
    int insertFile(FileVO vo);
    int updateFile(FileVO vo);
    int deleteFile(String fileId);
    int deleteFileList(List<String> fileIdList);
    int deleteFileListByDocId(String docId);

    int insertDocFileMapping(
            @Param("docId") String docId,
            @Param("fileId") String fileId
    );
    int deleteDocFileMapping(
            @Param("docId") String docId,
            @Param("fileId") String fileId
    );

    int deleteDocFileMappingByDocId(
            @Param("docId") String docId
    );


}
