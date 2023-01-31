package com.enixone.enixClever.cms.was.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.model.DocumentReClassficationVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.cms.was.model.WorkFlowVO;
import com.enixone.enixClever.core.common.GenerateKey;

@Service
@Transactional
public class WorkFlowService extends BaseService {

	
	
	public String getWorkFlowId(String workflowType, String docId) throws Exception {
	    
		return workflowDao.getWorkFlowId(workflowType, docId, getSessionUserKey());
    }
	
	
	public List<WorkFlowVO> getWorkFlowApploval(String docId) throws Exception {
	    
		return workflowDao.getWorkFlowApploval(docId, getSessionUserKey());
    }
	


	/**
	 * Workflow를 승인한다. 
	 * @param vo
	 * @return
	 * @throws Exception
	 */
	public int updateWorkFlow(WorkFlowVO vo) throws Exception {
	
		int rtnVal = 0;
		
		//워크플로우 Actor정보 적용
		vo.setActorId(getSessionUserKey());
		vo.setActorName(getSessionUserName());
		
		// 문서 기본 정보 조회
		rtnVal = workflowDao.updateWorkFlow(vo);
		
		//문서 등록승인 경우에만 업데이트 한다. 
		if(rtnVal == 1 && "APPROVAL".equals(vo.getWorkflowStatus())) {
			rtnVal = workflowDao.updateDocumentStatus(vo.getDocId(), "ACTIVE");
		}
		
		return rtnVal;	
	}

	
	/**
	 * 신규 WorkFlow를 생성한다. 
	 * @param wfVo
	 * @return
	 * @throws Exception
	 */
	public String createWorkFlow(WorkFlowVO wfVo) throws Exception {
		
		GenerateKey genKey = GenerateKey.getInstance();
		
        wfVo.setWorkflowId(genKey.getKey("wf"));
    	wfVo.setDocId(wfVo.getDocId());
    	wfVo.setWorkflowStatus("PROMOTION");
    	wfVo.setCreatorId(getSessionUserKey());
        wfVo.setCreatorName(getSessionUserName());
    	
    	workflowDao.insertWorkFlow(wfVo);
	
    	return wfVo.getWorkflowId();
    	
	}
	
	
	/**
	 * 문서 재분류 아이템을 생성한다.
	 * @param wfVo
	 * @return
	 * @throws Exception
	 */
	public String createReclassfication(DocumentReClassficationVO reClassVo) throws Exception {
		
		GenerateKey genKey = GenerateKey.getInstance();
		reClassVo.setReclassId(genKey.getKey("rd"));
 
		documentReClassficationDao.createReclassfication(reClassVo);
	
    	return reClassVo.getReclassId();
    	
	}
	
	
	private String getDocumentStatus(String status) {
		
		String rtnVal = "";
		
		if(status.equals("APPROVAL")) {
			rtnVal = "ACTIVE";
		}

		return rtnVal;	
	}
	
	
	
}
