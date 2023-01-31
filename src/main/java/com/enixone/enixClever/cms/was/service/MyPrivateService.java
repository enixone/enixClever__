package com.enixone.enixClever.cms.was.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;

@Service
public class MyPrivateService extends BaseService {
	public List<DocumentVO> selectNewDocList(PaginationVO paging)   throws Exception {
		
		//------------------------------------------------------------
        // 1. 권한 조회 및 계산
        //------------------------------------------------------------
        List<String> permissionList = docDao.selectPermissionIdDocListByUserKey(getSessionUserKey());
		
        paging.setOrderKey(convertColumeName(paging.getOrderKey()));
        return myPrivateDao.selectNewDocList(getSessionUserKey(),permissionList,paging);
    }
	
	public List<DocumentVO> selectMyDocumentList(PaginationVO paging)  throws Exception {
		
		paging.setOrderKey(convertColumeName(paging.getOrderKey()));
		return myPrivateDao.selectMyDocumentList(getSessionUserKey(), paging);    
    }

	public List<DocumentVO> selectExpiredDocList(PaginationVO paging) throws Exception {
        return myPrivateDao.selectExpiredDocList(getSessionUserKey(), paging);
    }
	
	
	public List<DocumentVO> selectTempSaveList(PaginationVO paging) throws Exception {
		return myPrivateDao.selectTempSaveList(getSessionUserKey(), paging);
    }
	
	public List<DocumentVO> selectWorkflowList(String listPart, PaginationVO paging) throws Exception {
		paging.setOrderKey(convertColumeName(paging.getOrderKey()));
		return myPrivateDao.selectWorkflowList(getSessionUserKey(), listPart, paging);
    }
	
	
	public List<DocumentVO> selectSecurityDocList(PaginationVO paging) throws Exception {
        return myPrivateDao.selectSecurityDocList(getSessionUserKey(), paging);
    }
    //displayMember : ["docName", "statusCodeName", "version", "fileCount", "creatorName", "createDate"],
    
}
