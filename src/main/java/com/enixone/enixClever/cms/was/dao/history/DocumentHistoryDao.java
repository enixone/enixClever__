package com.enixone.enixClever.cms.was.dao.history;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.enixone.enixClever.cms.was.model.DocumentHistoryVO;

@Repository
public interface DocumentHistoryDao {
    
	
	List<DocumentHistoryVO> selectDocumentHistoryList(
    		@Param("docId") String docId
    );
    
    int insertDocumentHistory(DocumentHistoryVO vo);

    /**
     * 사용자의 문서 사용 현황을 조회 한다
     * @param actorId
     * @param fromDate
     * @param toDate
     * @return
     */
    List<HashMap<String, Object>> selectDailyUserStat(
            @Param("actorId") String actorId,
            @Param("fromDate") String fromDate,
            @Param("toDate") String toDate
    );

    List<HashMap<String, Object>> selectDailyGroupStat(
            @Param("groupId") String groupId,
            @Param("fromDate") String fromDate,
            @Param("toDate") String toDate
    );

    List<HashMap<String, Object>> selectDailyTypeStat(
            @Param("fromDate") String fromDate,
            @Param("toDate") String toDate
    );

    List<HashMap<String, Object>> selectDailyMostReadStat(
            @Param("fromDate") String fromDate,
            @Param("toDate") String toDate
    );
}
