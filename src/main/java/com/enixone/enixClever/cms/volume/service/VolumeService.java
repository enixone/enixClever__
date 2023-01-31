package com.enixone.enixClever.cms.volume.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.model.FileVO;

@Service
public class VolumeService extends BaseService {

    @Value("${temp.uploadPath}")
    String tempUploadPath;

    @Value("${temp.savePath}")
    String savePath;

    public void attachFile(FileVO vo) throws Exception {
    } 
}
