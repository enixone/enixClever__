package com.enixone.enixClever.cms.was.schedule;

import java.net.InetAddress;
import java.util.List;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;

import com.enixone.enixClever.cms.was.base.Constants;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.cms.was.model.UserVO;
import com.enixone.enixClever.cms.was.service.DocumentHistoryService;
import com.enixone.enixClever.cms.was.service.DocumentService;

public class ExpiredDocumentSchedule implements Job {

    //private static final Logger logger = LogManager.getLogger("batch");
	private static Logger logger = LogManager.getLogger(ExpiredDocumentSchedule.class);
	 
    private static boolean isRunning = false;
    private static String adminUserKey = "enixclever";

    @Autowired
    DocumentService docService;

    @Autowired
    DocumentHistoryService docHistoryService;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {

    	
    	System.out.println("-------------------------------------------------------------------------------------------------------------");
    	
        String id = UUID.randomUUID().toString();

        if (isRunning) {
            logger.info("[" + id + "] already running");
            return;
        }

        try {
            isRunning = true;

            /*
            CODE_GROUP	CODE	CODE_NAME
            EXPIRE	1MONTH	1개월
            EXPIRE	1YEAR	1년
            EXPIRE	3YEAR	3년
            EXPIRE	5YEAR	5년
            EXPIRE	7DAY	일주일
            EXPIRE	UNLIMIT	무제한
             */
            // 5년 만료 문서 처리
            expireProcess("YEAR", "5");

            // 3년 만료 문서 처리
            expireProcess("YEAR", "3");

            // 1년 만료 문서 처리
            expireProcess("YEAR", "1");

            // 1개월 만료 문서 처리
            expireProcess("MONTH", "1");

            // 일주일 만료 문서 목록 처리
            expireProcess("DAY", "7");


        } catch (Exception e) {
            e.printStackTrace();
        } finally {
//			logger.info("[" + id + "] finished");
            isRunning = false;
        }
    }

    private void expireProcess(String interval, String intervalValue) throws Exception {
        
    	List<DocumentVO> targetDocList = docService.selectExpiredDocListByInterval(interval, intervalValue, intervalValue + interval);

        String ip = InetAddress.getLocalHost().getHostAddress();

        System.out.println(String.format("%s %s 유효성을 벗어난 문서를 조회.", intervalValue, interval));
        logger.info("기간 만료 문서 갯수 : " + targetDocList.size());

        if (CollectionUtils.isEmpty(targetDocList)) {
            return;
        }

        UserVO userVo = new UserVO();
        	userVo.setUserKey("enixclever");
        
        for (DocumentVO vo : targetDocList) {
            // 1. 히스토리 남긴다
            docHistoryService.insertDocumentHistory(
                    (new UserVO()),vo.getDocId(), vo.getDocName(), Constants.ACTION_EXPIRED, ip, false
            );

            // 2. 만료 처리 한다
            docService.setExpiredDoc(vo.getDocId(), adminUserKey, "localhost");
        }
    }
}
