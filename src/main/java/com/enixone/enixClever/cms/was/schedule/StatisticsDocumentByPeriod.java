package com.enixone.enixClever.cms.was.schedule;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

/**
 * [통계] 기간별 문서 수집 스케줄
 */
public class StatisticsDocumentByPeriod implements Job {

    //private static final Logger logger = LogManager.getLogger("batch");
	private static Logger logger = LogManager.getLogger(StatisticsDocumentByPeriod.class);
	
    private static boolean isRunning = false;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {

    }
}
