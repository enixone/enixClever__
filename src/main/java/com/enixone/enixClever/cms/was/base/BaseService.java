package com.enixone.enixClever.cms.was.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.enixone.enixClever.cms.was.dao.BoxDao;
import com.enixone.enixClever.cms.was.dao.ChangeOwnerDao;
import com.enixone.enixClever.cms.was.dao.CodeDao;
import com.enixone.enixClever.cms.was.dao.DocumentBookmarkDao;
import com.enixone.enixClever.cms.was.dao.DocumentDao;
import com.enixone.enixClever.cms.was.dao.DocumentReClassficationDao;
import com.enixone.enixClever.cms.was.dao.FileDao;
import com.enixone.enixClever.cms.was.dao.FolderDao;
import com.enixone.enixClever.cms.was.dao.GroupDao;
import com.enixone.enixClever.cms.was.dao.MyPrivateDao;
import com.enixone.enixClever.cms.was.dao.PermissionDao;
import com.enixone.enixClever.cms.was.dao.RoleDao;
import com.enixone.enixClever.cms.was.dao.StatisticsDao;
import com.enixone.enixClever.cms.was.dao.TypeDao;
import com.enixone.enixClever.cms.was.dao.UrlLinkDao;
import com.enixone.enixClever.cms.was.dao.UserDao;
import com.enixone.enixClever.cms.was.dao.WorkFlowDao;
import com.enixone.enixClever.cms.was.dao.history.DocumentHistoryDao;
import com.enixone.enixClever.cms.was.model.UserVO;

public class BaseService {
	
	
	protected Logger logger = LogManager.getLogger(getClass());
	
    @Autowired
    protected HttpSession httpSession;

    @Autowired
    protected HttpServletRequest request;

    @Autowired
    protected HttpServletResponse response;
    
    @Autowired
    protected UserDao userDao;

    @Autowired
    protected WorkFlowDao workflowDao;
    
    @Autowired
    protected CodeDao codeDao;
    
    @Autowired
    protected FileDao fileDao;

    @Autowired
    protected FolderDao folderDao;

    @Autowired
    protected BoxDao boxDao;

    @Autowired
    protected DocumentDao docDao;

    @Autowired 
    protected DocumentBookmarkDao docBookmarkDao;

    @Autowired 
    protected DocumentReClassficationDao documentReClassficationDao;

    
    @Autowired
    protected GroupDao groupDao;

    @Autowired
    protected PermissionDao permissionDao;

    @Autowired
    protected RoleDao roleDao;

    @Autowired
    protected MyPrivateDao myPrivateDao;

    @Autowired
    protected TypeDao typeDao;

    @Autowired
    protected DocumentHistoryDao docHistoryDao;

    @Autowired
    protected StatisticsDao statisticsDao;

    @Autowired
    protected UrlLinkDao urlLinkDao;

    @Autowired
    protected ChangeOwnerDao changeOwnerDao;

    protected String getSessionUserKey() throws Exception {

    	UserVO user = (UserVO) httpSession.getAttribute("loggedUser");
        if (user == null) {
        	throw new Exception ("로그인 정보가 없습니다.");
        }
        return user.getUserKey();
    }
    
    protected String getSessionUserName() throws Exception {

        UserVO user = (UserVO) httpSession.getAttribute("loggedUser");
        if (user == null) {
        	throw new Exception ("로그인 정보가 없습니다.");
        }
        return user.getUserName();
    }
    
    
    protected UserVO getUserInfo() throws Exception {

        UserVO userInfo = (UserVO) httpSession.getAttribute("loggedUser");
        if (userInfo == null) {
        	throw new Exception ("로그인 정보가 없습니다.");
        }
        return userInfo;
    }
    

    protected String getRequestIp() throws Exception {
    	return request.getRemoteAddr();
    }
    
    
	public String convertColumeName(String aliasColumeName) {
	    	
	    	String cName = aliasColumeName;
	    	
	    	if(cName.equals("docName"))						cName = "ED.DOC_NAME";
	    	else if(cName.equals("statusCode"))				cName = "ED.STATUS_CODE";
	    	else if(cName.equals("version"))				cName = "ED.VERSION";
	    	else if(cName.equals("creatorName"))			cName = "ED.CREATOR_NAME";
	    	else if(cName.equals("createDate"))				cName = "ED.CREATE_DATE";
	    	else if(cName.equals("statusCodeName"))			cName = "ED.STATUS_CODE_NAME";
	    	else if(cName.equals("securityCodeName"))		cName = "ED.SECURITY_CODE_NAME";
	    	else if(cName.equals("docTypeIdName"))			cName = "ED.DOC_TYPE_ID_NAME";
	    	else if(cName.equals("fileCount"))				cName = "ED.FILE_COUNT";
	    	
	    	return cName;
    	
    }
    
    
    
}
