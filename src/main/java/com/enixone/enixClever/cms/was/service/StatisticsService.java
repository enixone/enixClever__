package com.enixone.enixClever.cms.was.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.cms.was.model.statistics.ActorStats;
import com.enixone.enixClever.cms.was.model.statistics.DocumentTrace;
import com.enixone.enixClever.core.common.GenerateKey;

@Service
public class StatisticsService extends BaseService {

    /**
     * 최다 조회 문서 목록 조회
     * @param fromDate
     * @param toDate
     * @param paging
     * @return
     */
    public List<DocumentVO> selectMostViewDocList(String fromDate, String toDate, PaginationVO paging) {
        return statisticsDao.selectMostViewDocList(fromDate, toDate, paging);
    }

    /**
     * 사용자별 문서 목록 조회
     * @param userName
     * @param fromDate
     * @param toDate
     * @param paging
     * @return
     */
    public List<ActorStats> selectStatsByUser(String userName, String fromDate, String toDate, PaginationVO paging) {
        return statisticsDao.selectStatsByUser(userName, fromDate, toDate, paging);
    }

    public List<DocumentTrace> searchDocumentTrace(String fromDate, String toDate, List<String> actionCodeList, String groupName, String docName, PaginationVO paging) {
        return statisticsDao.searchDocumentTrace(fromDate, toDate, actionCodeList, groupName, docName, paging);
    }

    /**
     * 사용자별 문서 목록 조회
     * @param userName
     * @param fromDate
     * @param toDate
     * @param paging
     * @return
     */
    public List<ActorStats> selectStatsByGroup(String userName, String fromDate, String toDate, PaginationVO paging) {
        return statisticsDao.selectStatsByGroup(userName, fromDate, toDate, paging);
    }

    /**
     * 유형별 문서 목록 조회
     * @param fromDate
     * @param toDate
     * @return
     */
    public List<ActorStats> selectStatsByType(String fromDate, String toDate) {
        return statisticsDao.selectStatsByType(fromDate, toDate);
    }

    /**
     * 사용자/부서 별 통계 추가
     * @param statsDate
     * @param dataType
     * @param dataCount
     * @param actorId
     * @param actorType
     */
    public void insertActorData(String statsDate, String dataType, int dataCount, String actorId, String actorType) {
        
    	GenerateKey genKey = GenerateKey.getInstance();
    	String statId = genKey.getKey("61");

        statisticsDao.insertActorData(statId, statsDate, dataType, dataCount, actorId, actorType);
    }

    /**
     * 최다 조회 문서 통계 추가
     * @param statsDate
     * @param dataType
     * @param dataCount
     * @param docId
     */
    public void insertMostReadData(String statsDate, String dataType, int dataCount, String docId) {
        
    	GenerateKey genKey = GenerateKey.getInstance();
    	String statId = genKey.getKey("62");

        statisticsDao.insertMostReadData(statId, statsDate, dataType, dataCount, docId);
    }

    /**
     * 문서 유형별 통계 추가
     * @param statsDate
     * @param dataType
     * @param dataCount
     * @param docTypeId
     */
    public void insertDocTypeData(String statsDate, String dataType, int dataCount, String docTypeId) {
    	
    	GenerateKey genKey = GenerateKey.getInstance();
    	String statId = genKey.getKey("63");
        
        statisticsDao.insertDocTypeData(statId, statsDate, dataType, dataCount, docTypeId);
    }
}
