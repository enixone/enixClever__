package com.enixone.enixClever.core.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class SessionListener implements HttpSessionListener {
    
	protected Logger logger = LogManager.getLogger(getClass());
	
	@Override
    public void sessionCreated(HttpSessionEvent se) {
        se.getSession().setMaxInactiveInterval(60 * 60); // 1시간
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        logger.info("세션이 종료됐습니다");
    }
}
