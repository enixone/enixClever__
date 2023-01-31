package com.enixone.enixClever.cms.was.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.cms.was.model.statistics.ActorStats;
import com.enixone.enixClever.cms.was.model.statistics.DocumentTrace;

@Repository
public interface StatisticsDao {
    List<DocumentVO> selectMostViewDocList(
            @Param("fromDate") String fromDate,
            @Param("toDate") String toDate,
            @Param("paging") PaginationVO paging
    );

    List<ActorStats> selectStatsByUser(
            @Param("userName") String userName,
            @Param("fromDate") String fromDate,
            @Param("toDate") String toDate,
            @Param("paging") PaginationVO paging
    );

    List<ActorStats> selectStatsByGroup(
            @Param("groupName") String groupName,
            @Param("fromDate") String fromDate,
            @Param("toDate") String toDate,
            @Param("paging") PaginationVO paging
    );

    List<ActorStats> selectStatsByType(
            @Param("fromDate") String fromDate,
            @Param("toDate") String toDate
    );

    List<DocumentTrace> searchDocumentTrace(
            @Param("fromDate") String fromDate,
            @Param("toDate") String toDate,
            @Param("actionCodeList") List<String> actionCodeList,
            @Param("groupName") String groupName,
            @Param("docName") String docName,
            @Param("paging") PaginationVO paging
    );

    void insertActorData(
            @Param("statsId") String statsId,
            @Param("statsDate") String statsDate,
            @Param("dataType") String dataType,
            @Param("dataCount") int dataCount,
            @Param("actorId") String actorId,
            @Param("actorType") String actorType
    );

    void insertMostReadData(
            @Param("statsId") String statsId,
            @Param("statsDate") String statsDate,
            @Param("dataType") String dataType,
            @Param("dataCount") int dataCount,
            @Param("docId") String docId
    );

    void insertDocTypeData(
            @Param("statsId") String statsId,
            @Param("statsDate") String statsDate,
            @Param("dataType") String dataType,
            @Param("dataCount") int dataCount,
            @Param("docTypeId") String docTypeId
    );
}
