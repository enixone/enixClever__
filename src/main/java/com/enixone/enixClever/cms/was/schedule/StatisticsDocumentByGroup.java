package com.enixone.enixClever.cms.was.schedule;

import java.util.HashMap;
import java.util.List;

import org.apache.commons.collections4.MapUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.enixone.enixClever.cms.was.base.Constants;
import com.enixone.enixClever.cms.was.model.GroupVO;
import com.enixone.enixClever.cms.was.service.DocumentHistoryService;
import com.enixone.enixClever.cms.was.service.GroupService;
import com.enixone.enixClever.cms.was.service.StatisticsService;
import com.enixone.enixClever.cms.was.utils.DateUtils;

/**
 * [통계] 부서별 문서 현황 수집 스케줄
 * Daily Schedule
 * every 00:00 running
 */
@Component
public class StatisticsDocumentByGroup implements Job {

    //private static final Logger logger = LogManager.getLogger("batch");
	private static Logger logger = LogManager.getLogger(StatisticsDocumentByGroup.class);
	
    private static boolean isRunning = false;

    @Autowired
    GroupService groupService;

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

        logger.info(String.format("[부서별 문서 현황] range %s ~ %S", searchRange[0], searchRange[1]));

        // 1. 전체 부서 목록 조회
        List<GroupVO> groupList = groupService.selectAllGroupList();

        logger.info("groupList : " + groupList.size());

        // 2. 그룹별 통계 수집 시작
        for (GroupVO group : groupList) {

            // 2-1. 그룹의 오늘일자 데이터를 수집 한다
            List<HashMap<String, Object>> statsList = docHistoryService.selectDailyGroupStat(group.getGroupId(), searchRange[0], searchRange[1]);

            // 내용이 없으면 다음 그룹으로
            if (statsList.isEmpty()) {
                continue;
            }

            logger.info("stats : " + statsList.size());

            for (HashMap<String, Object> stat : statsList) {
                String actionCode = MapUtils.getString(stat, "ACTION_CODE");
                int count = MapUtils.getInteger(stat, "CNT");

                logger.info(String.format("%s : %d", actionCode, count));

                statisticsService.insertActorData(date, actionCode, count, group.getGroupId(), Constants.ACTOR_GROUP);

            }
        }
    }


}
