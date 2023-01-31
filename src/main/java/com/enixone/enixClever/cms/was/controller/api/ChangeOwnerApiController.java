package com.enixone.enixClever.cms.was.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.model.ChangeOwnerVO;
import com.enixone.enixClever.core.common.Result;

@RestController
@RequestMapping ("/changeOwner")
public class ChangeOwnerApiController extends BaseController {

    /**
     * 소유권 인수인계 등록
     * @param vo
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "", method = RequestMethod.POST)
    public Result selectBoxList(@RequestBody ChangeOwnerVO vo, final Result result) throws Exception {
        String changeId = changeOwnerService.insertChangeOwner(vo);
        result.setSuccess(new Object[][]{
                {"changeId", changeId}
        });

        return result;
    }

    /**
     * 인계 목록 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "/give/{giverId}", method = RequestMethod.GET)
    public Result selectGiveList(@PathVariable String giverId, final Result result) {
        try {
            List<ChangeOwnerVO> changeOwnerList = changeOwnerService.selectGiveOwnerList(giverId);

            result.setSuccess(new Object[][] {
                    {"changeOwnerList", changeOwnerList}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 인수 목록 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "/take/{takerId}", method = RequestMethod.GET)
    public Result selectTakeList(@PathVariable String takerId, final Result result) {
        try {
            List<ChangeOwnerVO> takeOwnerList = changeOwnerService.selectTakeOwnerList(takerId);

            result.setSuccess(new Object[][] {
                    {"takeOwnerList", takeOwnerList}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 부서문서 중 소유한 문서 갯수 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "/owner/{userKey}/count", method = RequestMethod.GET)
    public Result selectOwnerDocCount(@PathVariable String userKey, final Result result) {
        try {
            int workspaceDocCount = changeOwnerService.countUserWorkspaceDocs(userKey);

            result.setSuccess(new Object[][] {
                    {"workspaceDocCount", workspaceDocCount}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 소유권 인수
     * @param result
     * @return
     */
    @RequestMapping(value = "/{changeId}/take", method = RequestMethod.POST)
    public Result takeOwnership(@PathVariable String changeId, final Result result) {
        try {
            logger.info("changeId : " + changeId);

            changeOwnerService.takeOwner(changeId);
            result.setSuccess();
        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

}
