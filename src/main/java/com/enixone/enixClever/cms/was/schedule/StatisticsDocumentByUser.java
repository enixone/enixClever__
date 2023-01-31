package com.enixone.enixClever.cms.was.schedule;

import java.util.HashMap;
import java.util.List;

import org.apache.commons.collections4.MapUtils;
import org.apache.ibatis.annotations.Param;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.enixone.enixClever.cms.was.base.Constants;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.UserVO;
import com.enixone.enixClever.cms.was.service.DocumentHistoryService;
import com.enixone.enixClever.cms.was.service.StatisticsService;
import com.enixone.enixClever.cms.was.service.UserService;
import com.enixone.enixClever.cms.was.utils.DateUtils;

/**
 * [통계] 사용자별 문서 현황 수집 스케줄
 * Daily Schedule
 * every 00:00 running
 */
@Component
public class StatisticsDocumentByUser implements Job {

    //private static final Logger logger = LogManager.getLogger("batch");
	private static Logger logger = LogManager.getLogger(StatisticsDocumentByUser.class);


    private static boolean isRunning = false;

    @Autowired
    UserService userService;

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

        logger.info(String.format("[사용자별 문서 현황] range %s ~ %S", searchRange[0], searchRange[1]));

        // 1. 전체 사용자 목록 조회
        List<UserVO> userList = userService.selectUserList(new PaginationVO(), date);

        logger.info("userList : " + userList.size());

        // 2. 사용자별 통계 수집 시작
        for (UserVO user : userList) {

            // 2-1. 사용자의 오늘일자 데이터를 수집한다
            List<HashMap<String, Object>> statsList = docHistoryService.selectDailyUserStats(user.getUserKey(), searchRange[0], searchRange[1]);

            // 내용이 없으면 다음 유저로
           if (statsList.isEmpty()) {
                continue;
            }

            logger.info("stats : " + statsList.size());

           for (HashMap<String, Object> stat : statsList) {
               String actionCode = MapUtils.getString(stat, "ACTION_CODE");
               int count = MapUtils.getInteger(stat, "CNT");
               logger.info(String.format("%s : %d", actionCode, count));

               statisticsService.insertActorData(date, actionCode, count, user.getUserKey(), Constants.ACTOR_USER);
           }
        }
    }
}
