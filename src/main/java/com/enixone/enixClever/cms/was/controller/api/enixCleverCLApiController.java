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
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.cms.was.model.FileVO;
import com.enixone.enixClever.core.common.Result;

@RestController
@RequestMapping ("/enixCleverAPI")
public class enixCleverCLApiController extends BaseController {

	//private static Logger logger = LogManager.getLogger(DocumentApiController.class);
	
    /** 
     * 문서 등록
     * @param vo
     * @param result 
     * @return
     */
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public Result insertDocument(@RequestBody final DocumentVO vo, final Result result) throws Exception {

    	logger.info("folderId"+vo.getFolderId());
    	
    	String docId = docService.insertDocument(vo);
    	
    	result.setObjectId(docId);
    	
    	return result;
    }

}
