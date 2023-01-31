package com.enixone.enixClever.core.configuration;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.quartz.CronTrigger;
import org.quartz.JobDataMap;
import org.quartz.Trigger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.quartz.CronTriggerFactoryBean;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import com.enixone.enixClever.cms.was.schedule.ExpiredDocumentSchedule;
import com.enixone.enixClever.core.configuration.quartz.AutowiringSpringBeanJobFactory;


@Configuration
public class QuartzConfig {
    @Autowired
    private PlatformTransactionManager transactionManager;

    @Autowired
    private ApplicationContext applicationContext;

    public static SchedulerFactoryBean quartzScheduler = new SchedulerFactoryBean();
    protected Logger logger = LogManager.getLogger(getClass());

    @PostConstruct
    public void init() {
    	logger.debug("QuartzConfig Start!!!!!!!!!!!!!!!!!!!!!!------------------------------------------------------------------------------------------------------------------------");
    }

    public static String _expiredDocument	= "0 0 13 * * ?";	// [스케줄]만기문서 수집 스케줄 매일 0시 0분 마다수행
    
    @Bean
    public SchedulerFactoryBean quartzScheduler() {
        
    	quartzScheduler.setTransactionManager(transactionManager);
        quartzScheduler.setOverwriteExistingJobs(true);
        quartzScheduler.setSchedulerName("enixClever-quartz-scheduler");

        // custom job factory of spring with DI support for @Autowired!
        AutowiringSpringBeanJobFactory jobFactory = new AutowiringSpringBeanJobFactory();
        jobFactory.setApplicationContext(applicationContext);
        quartzScheduler.setJobFactory(jobFactory);
        quartzScheduler.setQuartzProperties(quartzProperties());
        quartzScheduler.setTriggers(selectScheduleList());

        return quartzScheduler;
    }

    private Trigger[] selectScheduleList() {
        List<Trigger> triggerList = new ArrayList<>();
        try {

            {
                triggerList.add(getExpiredocumentCollectSchedule());
            }


        } catch (Exception e) {
            e.printStackTrace();
        } finally {

        }
        return triggerList.toArray(new Trigger[triggerList.size()]);
    }

    /**
     * 만기문서 수집 스케줄
     * @return
     * @throws Exception
     */
    private CronTrigger getExpiredocumentCollectSchedule() throws Exception {
    	
    	JobDetailFactoryBean syslogDetail = new JobDetailFactoryBean();
        syslogDetail.setJobClass(ExpiredDocumentSchedule.class);
        syslogDetail.setName("만기문서 수집 스케줄");
        syslogDetail.setJobDataMap(new JobDataMap());
        syslogDetail.afterPropertiesSet();

        CronTriggerFactoryBean cronFactory = new CronTriggerFactoryBean();
        cronFactory.setName(UUID.randomUUID().toString());
        cronFactory.setJobDetail(syslogDetail.getObject());
        cronFactory.setCronExpression(_expiredDocument); 
        cronFactory.afterPropertiesSet();

        return cronFactory.getObject();
    }

    @Bean
    public Properties quartzProperties() {
        PropertiesFactoryBean propertiesFactoryBean = new PropertiesFactoryBean();
        Properties properties = null;
        try {
            propertiesFactoryBean.afterPropertiesSet();
            properties = propertiesFactoryBean.getObject();

        } catch (IOException e) {
            System.out.println("Cannot load quartz.properties.");
        }

        return properties;
    }
}
