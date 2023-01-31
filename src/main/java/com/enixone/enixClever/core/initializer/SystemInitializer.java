package com.enixone.enixClever.core.initializer;

import com.enixone.enixClever.cms.was.utils.DirectoryUtils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class SystemInitializer {
    @Value("${temp.uploadPath}")
    private String uploadPath;

    @Value("${temp.downloadPath}")
    private String downloadPath;

    @Value("${temp.sharePath}")
    private String sharePath;
    @Value("${temp.savePath}")
    private String savePath;

    
    protected Logger logger = LogManager.getLogger(getClass());
    
    
    @PostConstruct
    public void init() {
        try {
            
        	DirectoryUtils.createDirectory(uploadPath);
            DirectoryUtils.createDirectory(downloadPath);
            DirectoryUtils.createDirectory(sharePath);
            DirectoryUtils.createDirectory(savePath);
            
			logger.info("=============================================================================");
			logger.info(" ■ enixClever Service initialize");
			logger.info("   1. Repository Information ");
			logger.info("     > Upload Repository : "+ uploadPath); 
			logger.info("     > Download Repository : "+ downloadPath);
			logger.info("     > Save Repository : "+ sharePath);
			logger.info("     > Share Repository : "+ savePath);
			logger.info("=============================================================================");
			
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
