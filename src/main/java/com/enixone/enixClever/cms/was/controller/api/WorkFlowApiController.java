package com.enixone.enixClever.cms.was.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.cms.was.model.WorkFlowVO;
import com.enixone.enixClever.core.common.Result;

@RestController
@RequestMapping ("/workflow")
public class WorkFlowApiController extends BaseController {

    
	@RequestMapping(value = "/getId/{docId}/{workflowType}", method = RequestMethod.GET)
    public Result getWorkFlowId(@PathVariable String docId,@PathVariable String workflowType, final Result result) throws Exception {

		result.setObjectId(workflowService.getWorkFlowId(workflowType, docId));
		result.setSuccess();
		
        return result;
    }
	
	
	@RequestMapping(value = "/getApploval/{docId}", method = RequestMethod.GET)
    public Result getWorkFlowApploval(@PathVariable String docId, final Result result) throws Exception {

		List<WorkFlowVO> wfList = workflowService.getWorkFlowApploval(docId);
		
        result.addData("wfList",wfList);
        result.setSuccess(new Object[][]{
                {"wfList", wfList}
        });
        return result;

	}
	
	
	@RequestMapping(value = "/updateWorkFlow", method = RequestMethod.POST)
    public Result updateWorkFlow(@RequestBody final WorkFlowVO vo, final Result result) throws Exception {

		String rtnMessage = null;
		
		int rtnCnt = workflowService.updateWorkFlow(vo);
		
		switch(vo.getWorkflowStatus()) {
			case "APPROVAL" : rtnMessage = "승인되었습니다.";
				break;
			case "REJECTION" : rtnMessage = "반려되었습니다.";
				break;
			case "WITHDRAW" : rtnMessage = "회수되었습니다.";
				break;
			default : rtnMessage = "결제 상태 정보가 없습니다. ";
				break;
		}
		
		if(rtnCnt > 0) {
			result.setSuccess(rtnMessage);
		}else {
			result.setFail("해당 결제건이 없습니다.");
		}
		
        return result;
    }
	
	
	@RequestMapping(value = "/documentTakeover", method = RequestMethod.POST)
    public Result documentTakeover(@RequestBody final WorkFlowVO vo, final Result result) throws Exception {

		vo.setWorkflowType("TAKEOVER");
		vo.setWorkflowOwner(vo.getActorId());
        vo.setCreatorMessage(vo.getCreatorMessage());
		
		workflowService.createWorkFlow(vo);
		
		result.setSuccess("인수인계가 요청되었습니다.");
    	
    	return result;
		
    }
	
	
	@RequestMapping(value = "/documentDestroy", method = RequestMethod.POST)
    public Result documentDestroy(@RequestBody final WorkFlowVO vo, final Result result) throws Exception {

		vo.setWorkflowType("DESTROY");
		vo.setWorkflowOwner(vo.getActorId());
        vo.setCreatorMessage(vo.getCreatorMessage());
		
		workflowService.createWorkFlow(vo);
		
		result.setSuccess("문서파기 요청이 되었습니다.");
    	
    	return result;
		
    }
	
    
}
