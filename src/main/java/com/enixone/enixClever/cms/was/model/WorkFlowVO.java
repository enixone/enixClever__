package com.enixone.enixClever.cms.was.model;

import com.enixone.enixClever.cms.was.base.VO;
import org.springframework.stereotype.Component;

@Component
public class WorkFlowVO extends VO {
    
	/**
     * origin member
     */
	private String workflowId;
	private String workflowType;
    private String workflowStatus;
    private String workflowOwner;
    
    private String creatorId;
    private String creatorName;
    private String creationDate;
    private String creatorMessage;
    
    private String actorId;
    private String actorName;
    private String actionDate;
    private String actorMessage;
    
    private String isCompleted;
    private String completedDate;
    
    /**
     * foreign member
     */
    private String docId;    
    private String workflowTypeName;
    private String workflowStatusName;
    private String creatorInfo;
    
    
    public String getWorkflowStatus() {
		return workflowStatus;
	}

	public void setWorkflowStatus(String workflowStatus) {
		this.workflowStatus = workflowStatus;
	}

	public String getWorkflowTypeName() {
		return workflowTypeName;
	}

	public void setWorkflowTypeName(String workflowTypeName) {
		this.workflowTypeName = workflowTypeName;
	}

	public String getWorkflowStatusName() {
		return workflowStatusName;
	}

	public void setWorkflowStatusName(String workflowStatusName) {
		this.workflowStatusName = workflowStatusName;
	}

	public String getCreatorInfo() {
		return creatorInfo;
	}

	public void setCreatorInfo(String creatorInfo) {
		this.creatorInfo = creatorInfo;
	}

	public String getWorkflowId() {
		return workflowId;
	}

	public void setWorkflowId(String workflowId) {
		this.workflowId = workflowId;
	}

	public String getWorkflowType() {
		return workflowType;
	}

	public void setWorkflowType(String workflowType) {
		this.workflowType = workflowType;
	}

	public String getWorkflowOwner() {
		return workflowOwner;
	}

	public void setWorkflowOwner(String workflowOwner) {
		this.workflowOwner = workflowOwner;
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

	public String getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}

	public String getCreatorMessage() {
		return creatorMessage;
	}

	public void setCreatorMessage(String creatorMessage) {
		this.creatorMessage = creatorMessage;
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

	public String getActionDate() {
		return actionDate;
	}

	public void setActionDate(String actionDate) {
		this.actionDate = actionDate;
	}

	public String getActorMessage() {
		return actorMessage;
	}

	public void setActorMessage(String actorMessage) {
		this.actorMessage = actorMessage;
	}

	public String getIsCompleted() {
		return isCompleted;
	}

	public void setIsCompleted(String isCompleted) {
		this.isCompleted = isCompleted;
	}

	public String getCompletedDate() {
		return completedDate;
	}

	public void setCompletedDate(String completedDate) {
		this.completedDate = completedDate;
	}

	public String getDocId() {
		return docId;
	}

	public void setDocId(String docId) {
		this.docId = docId;
	}
    
}
