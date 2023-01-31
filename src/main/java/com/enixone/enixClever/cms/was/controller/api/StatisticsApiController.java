package com.enixone.enixClever.cms.was.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.cms.was.model.statistics.ActorStats;
import com.enixone.enixClever.cms.was.model.statistics.DocumentTrace;
import com.enixone.enixClever.cms.was.utils.DateUtils;
import com.enixone.enixClever.core.common.Result;

@RestController
@RequestMapping ("/statistics")
public class StatisticsApiController extends BaseController {

    /**
     * 최다 조회 문서 목록
     * @param startDate
     * @param endDate
     * @param paging
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/mostView", method = RequestMethod.GET)
    public Result selectRecentDocList  (
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate,
            @ModelAttribute PaginationVO paging, final Result result) throws Exception {

        // 날짜의 시작 ~ 끝 표현식을 가져온다
        String fromDate = DateUtils.parseDateStart(startDate);
        String toDate = DateUtils.parseDateEnd(endDate);

        // 최다 조회 문서 목록 조회
        List<DocumentVO> docList = statisticsService.selectMostViewDocList(fromDate, toDate, paging);

        result.setPageInfo(docList);
        result.setSuccess(new Object[][] {
                {"docList", docList}
        });

        return result;
    }

    /**
     * 사용자별 문서 통계 조회
     * @param userName
     * @param startDate
     * @param endDate
     * @param paging
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/byUser", method = RequestMethod.GET)
    public Result selectStatsByUser(
            @RequestParam("userName") String userName,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate,
            @ModelAttribute PaginationVO paging, final Result result) throws Exception {

        // 날짜의 시작 ~ 끝 표현식을 가져온다
        String fromDate = DateUtils.parseDateStart(startDate);
        String toDate = DateUtils.parseDateEnd(endDate);

        // 사용자별 문서 목록 조회
        List<ActorStats> list = statisticsService.selectStatsByUser(userName, fromDate, toDate, paging);
        result.setPageInfo(list);
        result.setSuccess(new Object[][] {
                {"list", list}
        });

        return result;
    }

    /**
     * 부서별 문서 통계 조회
     * @param groupName
     * @param startDate
     * @param endDate
     * @param paging
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/byGroup", method = RequestMethod.GET)
    public Result selectStatsByGroup(
            @RequestParam("groupName") String groupName,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate,
            @ModelAttribute PaginationVO paging, final Result result) throws Exception {

        // 날짜의 시작 ~ 끝 표현식을 가져온다
        String fromDate = DateUtils.parseDateStart(startDate);
        String toDate = DateUtils.parseDateEnd(endDate);

        // 사용자별 문서 목록 조회
        List<ActorStats> list = statisticsService.selectStatsByGroup(groupName, fromDate, toDate, paging);
        result.setPageInfo(list);
        result.setSuccess(new Object[][] {
                {"list", list}
        });

        return result;
    }

    /**
     * 유형별 문서 통계 조회
     * @param startDate
     * @param endDate
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/byType", method = RequestMethod.GET)
    public Result selectStatsByGroup(
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate,
            final Result result) throws Exception {

        // 날짜의 시작 ~ 끝 표현식을 가져온다
        String fromDate = DateUtils.parseDateStart(startDate);
        String toDate = DateUtils.parseDateEnd(endDate);

        // 사용자별 문서 목록 조회
        List<ActorStats> list = statisticsService.selectStatsByType(fromDate, toDate);
        result.setPageInfo(list);
        result.setSuccess(new Object[][] {
                {"list", list}
        });

        return result;
    }

    /**
     * 문서 추적
     * @param groupName
     * @param startDate
     * @param endDate
     * @param paging
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/traceDoc", method = RequestMethod.GET)
    public Result searchDocumentTrace(
        @RequestParam("groupName") String groupName,
        @RequestParam("docName") String docName,
        @RequestParam(value = "actionCodeList[]", required = false) List<String> actionCodeList,
        @RequestParam("startDate") String startDate,
        @RequestParam("endDate") String endDate,
        @ModelAttribute PaginationVO paging, final Result result) throws Exception {

        // 날짜의 시작 ~ 끝 표현식을 가져온다
        String fromDate = DateUtils.parseDateStart(startDate);
        String toDate = DateUtils.parseDateEnd(endDate);

        logger.info("groupName : " + groupName);
        logger.info("docName : " + docName);
        logger.info("startDate : " + startDate);
        logger.info("endDate : " + endDate);
        if (actionCodeList != null) {
            logger.info("actionCodeList : " + actionCodeList.size());
            for (String actionCode : actionCodeList) {
                logger.info("code : " + actionCode);
            }
        }

        List<DocumentTrace> list = statisticsService.searchDocumentTrace(fromDate, toDate, actionCodeList, groupName, docName, paging);
        result.setPageInfo(list);
        result.setSuccess(new Object[][] {
                {"list", list}
        });

        return result;
    }

}
