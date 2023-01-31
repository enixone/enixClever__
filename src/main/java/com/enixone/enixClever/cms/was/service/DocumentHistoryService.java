package com.enixone.enixClever.cms.was.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentHistoryVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.cms.was.model.UserVO;
import com.enixone.enixClever.core.common.GenerateKey;

@Service
public class DocumentHistoryService extends BaseService {

    public List<DocumentHistoryVO> selectDocumentHistoryList(String docId){
        return docHistoryDao.selectDocumentHistoryList(docId);
    }

    public String insertDocumentHistory(UserVO actorInfo, String docId, String docName, String actionCode, String actionIp, boolean isBatch) throws Exception {
        DocumentHistoryVO vo = new DocumentHistoryVO();
        
        GenerateKey genKey = GenerateKey.getInstance();
    	
        vo.setHistoryId(genKey.getKey("hs"));
        vo.setDocId(docId);
        vo.setDocName(docName);
        vo.setActorId(actorInfo.getUserKey());
        vo.setActorName(actorInfo.getUserName());
        vo.setActorRoleId(actorInfo.getRoleId());
        vo.setActorRoleName(actorInfo.getRoleName());
        vo.setActionCode(actionCode);
        vo.setActionIp(actionIp);
        vo.setBatch(isBatch);
        
        docHistoryDao.insertDocumentHistory(vo);
        return vo.getHistoryId();
    }

    public List<DocumentVO> selectRecentDocList(PaginationVO paging) throws Exception {
    	paging.setOrderKey(convertColumeName(paging.getOrderKey()));
        return docDao.selectRecentDocList(getSessionUserKey(), paging);
    }

    public List<HashMap<String, Object>> selectDailyUserStats(String actorId, String fromDate, String toDate) {
        return docHistoryDao.selectDailyUserStat(actorId, fromDate, toDate);
    }

    public List<HashMap<String, Object>> selectDailyTypeStat(String fromDate, String toDate) {
        return docHistoryDao.selectDailyTypeStat(fromDate, toDate);
    }

    public List<HashMap<String, Object>> selectDailyGroupStat(String groupId, String fromDate, String toDate) {
        return docHistoryDao.selectDailyGroupStat(groupId, fromDate, toDate);
    }

    public List<HashMap<String, Object>> selectDailyMostReadStat(String fromDate, String toDate) {
        return docHistoryDao.selectDailyMostReadStat(fromDate, toDate);
    }
}
