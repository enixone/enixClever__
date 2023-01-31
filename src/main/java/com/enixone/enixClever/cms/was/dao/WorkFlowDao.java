package com.enixone.enixClever.cms.was.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.enixone.enixClever.cms.was.model.DocumentReClassficationVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.cms.was.model.WorkFlowVO;

@Repository
public interface WorkFlowDao { 
    
	int insertWorkFlow(WorkFlowVO workflow);
	
	String getWorkFlowId(
			@Param("workflowType") String workflowType,
			@Param("docId") String docId,
			@Param("userKey") String userKey
	);
	
	
	List<WorkFlowVO> getWorkFlowApploval(
			@Param("docId") String docId,
			@Param("userKey") String userKey
	);
	
	
	int updateWorkFlow(WorkFlowVO workflow);
	
	int updateDocumentStatus(
			@Param("docId") String docId,
			@Param("documentStatus") String documentStatus);
	
}
