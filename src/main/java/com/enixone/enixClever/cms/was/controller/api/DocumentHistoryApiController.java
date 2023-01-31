package com.enixone.enixClever.cms.was.controller.api;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentHistoryVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.cms.was.model.FileVO;
import com.enixone.enixClever.core.common.Result;

@RestController
@RequestMapping ("/docHistory")
public class DocumentHistoryApiController extends BaseController {

	/**
	 * 문서 이력을 조회한다.
	 * @param docId
	 * @param result
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/{docId}", method = RequestMethod.GET)
    public Result selectDocumentHistoryList(@PathVariable String docId, final Result result) throws Exception {

		List<DocumentHistoryVO> vo = docHistoryService.selectDocumentHistoryList(docId);
		result.setSuccess(new Object[][] {
                {"docHisotory", vo}
        });
        
        return result;
    }
    
}
