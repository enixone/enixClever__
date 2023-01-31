package com.enixone.enixClever.cms.was.schedule;

import com.enixone.enixClever.cms.was.base.Constants;
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
 * [통계] 최다 조회 문서 수집 스케줄
 */
@Component
public class StatisticsMostReadDocument implements Job {
    //private static final Logger logger = LogManager.getLogger("batch");
	private static Logger logger = LogManager.getLogger(StatisticsMostReadDocument.class);

    private static boolean isRunning = false;

    @Autowired
    DocumentHistoryService docHistoryService;

    @Autowired
    StatisticsService statisticsService;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        try {
            running(DateUtils.getToday());

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

        // 1. 오늘 일자의 문서 조회 현황을 수집
        List<HashMap<String, Object>> statsList = docHistoryService.selectDailyMostReadStat(searchRange[0], searchRange[1]);

        logger.info("stats : " + statsList.size());

        // 2. 문서 조회 현황 등록
        for (HashMap<String, Object> stat : statsList) {
            String docId = MapUtils.getString(stat, "DOC_ID");
            int count = MapUtils.getInteger(stat, "CNT");

            statisticsService.insertMostReadData(date, Constants.ACTION_READ, count, docId);
        }
    }
}
