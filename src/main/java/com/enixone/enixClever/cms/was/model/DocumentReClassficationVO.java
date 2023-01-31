package com.enixone.enixClever.cms.was.model;

import com.enixone.enixClever.cms.was.base.VO;

public class DocumentReClassficationVO extends VO {
    
	private String reclassId;
	private String docId;
	private String workflowId;
	private String securityCode;
	private String folderId;
	private String expireDate;
	private String creatorId;
	private String creatorName;
	private String creatorDate;
	
	public String getReclassId() {
		return reclassId;
	}
	public void setReclassId(String reclassId) {
		this.reclassId = reclassId;
	}
	
	public String getDocId() {
		return docId;
	}
	public void setDocId(String docId) {
		this.docId = docId;
	}
	public String getWorkflowId() {
		return workflowId;
	}
	public void setWorkflowId(String workflowId) {
		this.workflowId = workflowId;
	}
	public String getSecurityCode() {
		return securityCode;
	}
	public void setSecurityCode(String securityCode) {
		this.securityCode = securityCode;
	}
	public String getFolderId() {
		return folderId;
	}
	public void setFolderId(String folderId) {
		this.folderId = folderId;
	}
	public String getExpireDate() {
		return expireDate;
	}
	public void setExpireDate(String expireDate) {
		this.expireDate = expireDate;
	}
	public String getCreatorId() {
		return creatorId;
	}
	public void setCreatorId(String creatorId) {
		this.creatorId = creatorId;
	}
	public String getCreatorName() {
		return creatorName;
	}
	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}
	public String getCreatorDate() {
		return creatorDate;
	}
	public void setCreatorDate(String creatorDate) {
		this.creatorDate = creatorDate;
	}
        
    
}
