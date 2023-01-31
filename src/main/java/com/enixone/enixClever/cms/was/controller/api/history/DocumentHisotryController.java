package com.enixone.enixClever.cms.was.controller.api.history;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.core.common.Result;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/history/doc")
public class DocumentHisotryController extends BaseController {

    /**
     * 최근 문서 조회
     * @param actorId
     * @param fromDate
     * @param toDate
     * @param paging
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/recent", method = RequestMethod.GET)
    public Result selectRecentDocList  (@ModelAttribute PaginationVO paging, final Result result) throws Exception {
    	
    	
    	List<DocumentVO> docList = docHistoryService.selectRecentDocList(paging);

        result.setPageInfo(docList);
        result.setSuccess(new Object[][] {
                {"docList", docList}
        });

        return result;
    }
}
