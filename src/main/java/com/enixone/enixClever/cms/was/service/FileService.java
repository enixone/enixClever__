package com.enixone.enixClever.cms.was.service;

import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.base.Constants;
import com.enixone.enixClever.cms.was.model.FileVO;
import com.enixone.enixClever.cms.was.utils.FileUtils;
import com.enixone.enixClever.core.common.GenerateKey;
import com.enixone.enixClever.core.exceptions.EnixCleverException;

@Service
public class FileService extends BaseService {
    @Value("${temp.uploadPath}")
    String tempUploadPath;

    @Value("${temp.savePath}")
    String savePath;


    public List<FileVO> selectFileListByDocId(String docId) {
        return fileDao.selectFileListByDocId(docId);
    }

    public FileVO selectFileInfo(String fileId) {
        return fileDao.selectFileInfo(fileId);
    }

    public String insertFile(FileVO vo) throws Exception {
    	
    	GenerateKey genKey = GenerateKey.getInstance();
    	vo.setFileId(genKey.getKey("15"));
        
        // fileId 필수
        // 임시 업로드 경로 : tempUploadPath + tempUploadName
        // 임시 저장 경로에 저장한다
        String tempPath = Paths.get(tempUploadPath, vo.getTempUploadName()).toString();

logger.info("tempPath > " + tempPath);
        
        if (!FileUtils.existsFile(tempPath)) {
            throw new EnixCleverException ("파일이 업로드 되지 않았습니다.");
        }

        // 파일 저장 경로
//        vo.setFileHash("");
        vo.setFilePath(Paths.get(savePath, vo.getFileId()).toString());
        vo.setFileSize(FileUtils.getFileSize(tempPath));
        vo.setExtension(FileUtils.getFileExtension(vo.getFileName()));
        vo.setStatusCode(Constants.STATUS_ACTIVE);

        // [임시] 파일 저장 (이동)
        FileUtils.moveFile(tempPath, vo.getFilePath());

        logger.info("fileId : " + vo.getFileId());
        logger.info("fileName : " + vo.getFileName());
        logger.info("fileHash : " + vo.getFileHash());

        // 파일 정보 저장
        fileDao.insertFile(vo);

        return vo.getFileId();
    }

    public String cloneFile(String fileId) throws Exception {
        FileVO vo = fileDao.selectFileInfo(fileId);

        if (vo == null) {
            throw new EnixCleverException ("파일 정보가 없어서 복제에 실패했습니다");
        }

        String newFilePath = Paths.get(FileUtils.getFileFolderPath(vo.getFilePath()), vo.getFileId()).toString();
        FileUtils.copyFile(vo.getFilePath(), newFilePath);

        GenerateKey genKey = GenerateKey.getInstance();
    	vo.setFileId(genKey.getKey("16"));
    	vo.setFilePath(newFilePath);

        // 파일 정보 저장
        fileDao.insertFile(vo);

        return vo.getFileId();
    }

    public int updateFile(FileVO vo) {
        return fileDao.updateFile(vo);
    }

    public int deleteFile(String fileId) throws Exception {
        return deleteFileList(Arrays.asList(fileId));
    }

    public int deleteFileList(List<String> fileIdList) throws Exception {

        for (String fileId : fileIdList) {
            // 기존 정보 조회
            FileVO vo = fileDao.selectFileInfo(fileId);

            // 논리 데이터 삭제
            fileDao.deleteFile(fileId);

            // 물리 파일 삭제
            FileUtils.deleteFile(vo.getFilePath());
        }


        return fileIdList.size();
    }

    public int deleteFileListByDocId(String docId) {
        return fileDao.deleteFileListByDocId(docId);
    }


    public int insertDocFileMapping(String docId, String fileId) {
        return fileDao.insertDocFileMapping(docId, fileId);
    }

    public int deleteDocFileMapping(String docId, String fileId) {
        return fileDao.deleteDocFileMapping(docId, fileId);
    }

    public int deleteDocFileMappingByDocId(String docId) {
        return fileDao.deleteDocFileMappingByDocId(docId);
    }

}
