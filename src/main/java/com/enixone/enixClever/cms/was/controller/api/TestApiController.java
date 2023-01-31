package com.enixone.enixClever.cms.was.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.model.FolderVO;
import com.enixone.enixClever.cms.was.model.PermissionVO;
import com.enixone.enixClever.cms.was.schedule.StatisticsDocumentByGroup;
import com.enixone.enixClever.cms.was.schedule.StatisticsDocumentByTypes;
import com.enixone.enixClever.cms.was.schedule.StatisticsDocumentByUser;
import com.enixone.enixClever.cms.was.schedule.StatisticsMostReadDocument;
import com.enixone.enixClever.core.common.Result;
import com.google.gson.Gson;

@RestController
@RequestMapping("/test")
public class TestApiController extends BaseController {

    @Autowired
    StatisticsDocumentByUser userSchedule;

    @Autowired
    StatisticsMostReadDocument statisticsMostReadDocs;

    @Autowired
    StatisticsDocumentByGroup statisticsDocsByGroup;

    @Autowired
    StatisticsDocumentByTypes statisticsDocsByTypes;

    /**
     * 사용자별 문서 수집 스케줄 테스트
     * @param result
     * @return
     */
    @RequestMapping(value = "/schedule/userDocs", method = RequestMethod.GET)
    public Result selectUserDocStats(@RequestParam("date") String date, final Result result) {
        try {
            logger.info("date : " + date);

            userSchedule.test(date);

            result.setSuccess();
        } catch (Exception e) {
            e.printStackTrace();
            result.setError(e.getMessage());
        }

        return result;
    }

    /**
     * 부서별 문서 수집 스케줄 테스트
     * @param result
     * @return
     */
    @RequestMapping(value = "/schedule/groupDocs", method = RequestMethod.GET)
    public Result selectGroupDocStats(@RequestParam("date") String date, final Result result) {
        try {
            logger.info("date : " + date);

            statisticsDocsByGroup.test(date);

            result.setSuccess();
        } catch (Exception e) {
            e.printStackTrace();
            result.setError(e.getMessage());
        }

        return result;
    }

    /**
     * 최다 문서 수집 스케줄 테스트
     * @param result
     * @return
     */
    @RequestMapping(value = "/schedule/mostReadDocs", method = RequestMethod.GET)
    public Result selectMostReadStats(@RequestParam("date") String date, final Result result) {
        try {
            logger.info("date : " + date);

            statisticsMostReadDocs.test(date);

            result.setSuccess();
        } catch (Exception e) {
            e.printStackTrace();
            result.setError(e.getMessage());
        }

        return result;
    }

    /**
     * 최다 문서 수집 스케줄 테스트
     * @param result
     * @return
     */
    @RequestMapping(value = "/schedule/docType", method = RequestMethod.GET)
    public Result selectDocType(@RequestParam("date") String date, final Result result) {
        try {
            logger.info("date : " + date);

            statisticsDocsByTypes.test(date);

            result.setSuccess();
        } catch (Exception e) {
            e.printStackTrace();
            result.setError(e.getMessage());
        }

        return result;
    }
    
    /**
     * ACL 가져오기
     * @param result
     * @return
     */
    @RequestMapping(value = "/autocomplete/acl", method = RequestMethod.GET)
    public String selectPermissionListByUserKey(@RequestParam String userKey, final String rtvValue) {
    	
    		List<PermissionVO> permissionList = permissionService.selectAvailablePermission(userKey);
   	
    		String[] array = new String[permissionList.size()];
    		
    		for(int i = 0; i < permissionList.size(); i++) {
    			array[i] = permissionList.get(i).getPermissionName();
    			logger.info(array[i]);
    		}
    		
          Gson gson = new Gson();

    	return gson.toJson(array);
    }
    
}
