package com.enixone.enixClever.core.interceptors;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.enixone.enixClever.cms.was.model.UserVO;
import com.enixone.enixClever.cms.was.service.UserService;
import com.enixone.enixClever.core.annotation.LoginCheckAnnotation;

@Service
@PropertySource("classpath:resources/configuration.properties")
public class SessionCheckInterceptor extends HandlerInterceptorAdapter {

	
	@Autowired
	UserService userService;
	
	protected Logger logger = LogManager.getLogger(getClass());
	
    @Value("${dev.mode}")
    private String devMode;

    @Value("${dev.sessionPass}")
    private boolean sessionCheckPass;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        try {

            HttpSession session = request.getSession();
            LoginCheckAnnotation loginCheckAnnotation = ((HandlerMethod) handler).getMethodAnnotation((LoginCheckAnnotation.class));

            logger.debug("===================================================================================");
            logger.debug("■ RequestURL > " + request.getRequestURL());
            
            Map<String, String[]> map = request.getParameterMap();
            for(String keyItem : map.keySet()) {
                String[] values = map.get(keyItem);
                for(int i=0; i<values.length; i++) {
            		logger.debug(" >> "+ keyItem + ","+values[i]);
            	}	
            }
            
            if (sessionCheckPass) {
            	logger.debug("- Session check pass mode");
                
            	UserVO _tempVO = new UserVO();
            	
            	_tempVO.setUserKey("enixClever");
            	_tempVO.setUserPass("a1234567");
            	
            	// 로그인 처리 후 사용자 정보를 반환받는다
                UserVO dbUserInfo = userService.loginProcess(_tempVO);

                // 세션에 저장한다
                request.getSession().setAttribute("loggedUser", dbUserInfo);
            	
                return true;
            }
//            } else if (loginCheckAnnotation == null) {
//                
//            	logger.debug("sesssion Check .....");
//            	
//            	// 로그인 체크를 해야하는 API가 아닐 경우
//                return true;
//            }

            
            String callURL = request.getRequestURL().toString();
            
            
            if(StringUtils.startsWithIgnoreCase(callURL, "/enixClever/manager")) {
            	
            	logger.debug("This menu is Admin function.....");
            	
            }
            
            
            // 로그인 페이지일 경우
            if (StringUtils.endsWithIgnoreCase(callURL, "/login")) {
            	return true;
            } else {
            	
            	logger.debug("Request URL", callURL);
            	
            	// 세션에 저장된 사용자 정보 조회
                UserVO user = (UserVO) request.getSession().getAttribute("loggedUser");

            	// 로그인 상태가 아닐 경우
                if (user == null && !StringUtils.endsWithIgnoreCase(callURL, "/session")) {
                	logger.debug("Login infomation Not FOUND-Invalid Session");
                	response.setStatus(901);
                	return false;
                } else {
                    return true;
                }
                
            }
            

        } catch (Exception e) {
            e.printStackTrace();
        }

        return super.preHandle(request, response, handler);
    }
}
