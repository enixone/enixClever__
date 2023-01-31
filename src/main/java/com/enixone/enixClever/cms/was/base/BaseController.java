package com.enixone.enixClever.cms.was.base;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.enixone.enixClever.cms.was.service.BoxService;
import com.enixone.enixClever.cms.was.service.ChangeOwnerService;
import com.enixone.enixClever.cms.was.service.CodeService;
import com.enixone.enixClever.cms.was.service.DocumentBookmarkService;
import com.enixone.enixClever.cms.was.service.DocumentHistoryService;
import com.enixone.enixClever.cms.was.service.DocumentService;
import com.enixone.enixClever.cms.was.service.FileService;
import com.enixone.enixClever.cms.was.service.FolderService;
import com.enixone.enixClever.cms.was.service.GroupService;
import com.enixone.enixClever.cms.was.service.MyPrivateService;
import com.enixone.enixClever.cms.was.service.PermissionService;
import com.enixone.enixClever.cms.was.service.RoleService;
import com.enixone.enixClever.cms.was.service.StatisticsService;
import com.enixone.enixClever.cms.was.service.TypeService;
import com.enixone.enixClever.cms.was.service.UrlLinkService;
import com.enixone.enixClever.cms.was.service.UserService;
import com.enixone.enixClever.cms.was.service.WorkFlowService;

public class BaseController {

	protected Logger logger = LogManager.getLogger(getClass());
	
	
    @Autowired
    protected UserService userService;

    @Autowired
    protected FileService fileService;

    @Autowired
    protected FolderService folderService;

    @Autowired
    protected BoxService boxService;
    
    @Autowired
    protected CodeService codeService;
    
    @Autowired
    protected DocumentService docService;
    
    @Autowired
    protected DocumentBookmarkService docBookmarkService;
    
    @Autowired
    protected WorkFlowService workflowService;
    
    @Autowired
    protected GroupService groupService;

    @Autowired
    protected PermissionService permissionService;

    @Autowired
    protected RoleService roleService;

    @Autowired
    protected MyPrivateService myPrivateService;

    @Autowired
    protected TypeService typeService;

    @Autowired
    protected DocumentHistoryService docHistoryService;

    @Autowired
    protected StatisticsService statisticsService;

    @Autowired
    protected UrlLinkService urlLinkService;

    @Autowired
    protected ChangeOwnerService changeOwnerService;
}
