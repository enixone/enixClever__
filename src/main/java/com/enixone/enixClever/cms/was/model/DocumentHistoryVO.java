package com.enixone.enixClever.cms.was.model;

import com.enixone.enixClever.cms.was.base.VO;

public class DocumentHistoryVO extends VO {
    
	private String historyId;
    private String docId;
    private String docName;
    private String actorId;
    private String actorName;
    private String actorRoleId;
    private String actorRoleName;
    private String actionCode;
    private String actionDate;
    private String actionIp;
    
	private boolean isBatch;
    

	
	public String getActorRoleId() {
		return actorRoleId;
	}
	public void setActorRoleId(String actorRoleId) {
		this.actorRoleId = actorRoleId;
	}
	public String getActorRoleName() {
		return actorRoleName;
	}
	public void setActorRoleName(String actorRoleName) {
		this.actorRoleName = actorRoleName;
	}
	public boolean isBatch() {
		return isBatch;
	}
	public void setBatch(boolean isBatch) {
		this.isBatch = isBatch;
	}
	public String getHistoryId() {
		return historyId;
	}
	public void setHistoryId(String historyId) {
		this.historyId = historyId;
	}
	public String getDocId() {
		return docId;
	}
	public void setDocId(String docId) {
		this.docId = docId;
	}
	public String getDocName() {
		return docName;
	}
	public void setDocName(String docName) {
		this.docName = docName;
	}
	public String getActorId() {
		return actorId;
	}
	public void setActorId(String actorId) {
		this.actorId = actorId;
	}
	public String getActorName() {
		return actorName;
	}
	public void setActorName(String actorName) {
		this.actorName = actorName;
	}
	public String getActionCode() {
		return actionCode;
	}
	public void setActionCode(String actionCode) {
		this.actionCode = actionCode;
	}
	public String getActionDate() {
		return actionDate;
	}
	public void setActionDate(String actionDate) {
		this.actionDate = actionDate;
	}
	public String getActionIp() {
		return actionIp;
	}
	public void setActionIp(String actionIp) {
		this.actionIp = actionIp;
	}
	
	

    
}
