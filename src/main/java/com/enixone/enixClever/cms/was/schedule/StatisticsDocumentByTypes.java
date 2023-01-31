package com.enixone.enixClever.cms.was.schedule;

import com.enixone.enixClever.cms.was.service.DocumentHistoryService;
import com.enixone.enixClever.cms.was.service.StatisticsService;
import com.enixone.enixClever.cms.was.utils.DateUtils;
import org.apache.commons.collections4.MapUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

/**
 * [통계] 유형별 문서 통계
 */
@Component
public class StatisticsDocumentByTypes implements Job {

    //private static final Logger logger = LogManager.getLogger("batch");
	private static Logger logger = LogManager.getLogger(StatisticsDocumentByTypes.class);
	
    private static boolean isRunning = false;

    @Autowired
    DocumentHistoryService docHistoryService;

    @Autowired
    StatisticsService statisticsService;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {

        try {
            String today = DateUtils.getToday();
            running(today);

        } catch (Exception e) {
            logger.error(e);
        }
    }

    public void test(String date) throws Exception {
        running(date);
    }

    private void running(String date) throws Exception {
        String[] searchRange = DateUtils.getFullDayRange(date);
        logger.info(String.format("range %s ~ %S", searchRange[0], searchRange[1]));

        // 1. 오늘 일자의 유형별 문서 현황을 수집
        List<HashMap<String, Object>> statsList = docHistoryService.selectDailyTypeStat(searchRange[0], searchRange[1]);

        logger.info("stats : " + statsList.size());

        // 2. 유형별 현황 등록
        for (HashMap<String, Object> stat : statsList) {
            String docTypeId = MapUtils.getString(stat, "DOC_TYPE_ID");
            String actionCode = MapUtils.getString(stat, "ACTION_CODE");
            int count = MapUtils.getInteger(stat, "CNT");

            statisticsService.insertDocTypeData(date, actionCode, count, docTypeId);
        }

    }
}
