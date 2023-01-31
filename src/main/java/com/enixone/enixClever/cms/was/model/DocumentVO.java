package com.enixone.enixClever.cms.was.model;

import com.enixone.enixClever.cms.was.base.VO;

import java.util.List;

public class DocumentVO extends VO {
    private String docId;
    private String firstDocId;
    private String docName;
    private String docNo;
    private String docTypeId;
    private String docTypeIdName;
    private int fileCount;
    private String version;
    private String description;
    private String permissionId;
    private String permissionName;
    private String expireCode;
    private String expireDate; 
    private String expireCodeName;
    private String statusCode;
    private String statusCodeName;
    private String securityCode;
    private String securityCodeName;
    private String creatorId;
    private String creatorName;
    private String createDate;
    
    private String ownerId;
    private String ownerName;
    
    private String updatorId;
    private String updatorName;
    private String updateDate;
    private String deletorId;
    private String deletorName;
    private String deleteDate;

    private List<FileVO> fileList;
    private List<DocumentTypeItemVO> docTypeItemList;

    private String folderId;
    private String fullPath;

    
    /**
     * 사용자 정보 관련
     */
    
    private String groupName;
    
    
    /**
     * 워크플로우 관련 
     */
    private String actorId;
    private String actorName;
    private String actorMessage;
    private String actionDate;
    private String workflowId;
  	private String workflowTypeName;
  	private String workflowStatus;
  	private String workflowStatusName;
  	private String creationDate;
  	private String creatorMessage;
  	
  	
    
  	public String getDocNo() {
		return docNo;
	}

	public void setDocNo(String docNo) {
		this.docNo = docNo;
	}

	public String getCreatorMessage() {
		return creatorMessage;
	}

	public void setCreatorMessage(String creatorMessage) {
		this.creatorMessage = creatorMessage;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getWorkflowTypeName() {
		return workflowTypeName;
	}

	public void setWorkflowTypeName(String workflowTypeName) {
		this.workflowTypeName = workflowTypeName;
	}

	public String getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}

	public String getActorName() {
		return actorName;
	}

	public void setActorName(String actorName) {
		this.actorName = actorName;
	}

	public String getActorMessage() {
		return actorMessage;
	}

	public void setActorMessage(String actorMessage) {
		this.actorMessage = actorMessage;
	}
	
  	
    
    public String getActionDate() {
		return actionDate;
	}

	public void setActionDate(String actionDate) {
		this.actionDate = actionDate;
	}

	/* 계산된 권한 */
    private PermissionInfo permissionInfo;

    /* 현황 관련 */
    private int viewCount; 

    public int getViewCount() {
        return viewCount;
    }

    public void setViewCount(int viewCount) {
        this.viewCount = viewCount;
    }

    public String getExpireCode() {
        return expireCode;
    }

    public void setExpireCode(String expireCode) {
        this.expireCode = expireCode;
    }
    
    public String getExpireDate() {
		return expireDate;
	}

	public void setExpireDate(String expireDate) {
		this.expireDate = expireDate;
	}

    public String getExpireCodeName() {
        return expireCodeName;
    }

    public void setExpireCodeName(String expireCodeName) {
        this.expireCodeName = expireCodeName;
    }

    public List<DocumentTypeItemVO> getDocTypeItemList() {
        return docTypeItemList;
    }

    public void setDocTypeItemList(List<DocumentTypeItemVO> docTypeItemList) {
    	this.docTypeItemList = docTypeItemList;
    }

    public String getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName;
    }

    public PermissionInfo getPermissionInfo() {
        return permissionInfo;
    }

    public void setPermissionInfo(PermissionInfo permissionInfo) {
        this.permissionInfo = permissionInfo;
    }

    public String getFullPath() {
        return fullPath;
    }

    public void setFullPath(String fullPath) {
        this.fullPath = fullPath;
    }

    public String getFirstDocId() {
        return firstDocId;
    }

    public void setFirstDocId(String firstDocId) {
        this.firstDocId = firstDocId;
    }

    public String getFolderId() {
        return folderId;
    }

    public void setFolderId(String folderId) {
        this.folderId = folderId;
    }

    public List<FileVO> getFileList() {
        return fileList;
    }

    public void setFileList(List<FileVO> fileList) {
        this.fileList = fileList;
    }

    public String getDocTypeId() {
        return docTypeId;
    }

    public void setDocTypeId(String docTypeId) {
        this.docTypeId = docTypeId;
    }

    public String getDocTypeIdName() {
		return docTypeIdName;
	}

	public void setDocTypeIdName(String docTypeIdName) {
		this.docTypeIdName = docTypeIdName;
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

    public int getFileCount() {
        return fileCount;
    }

    public void setFileCount(int fileCount) {
        this.fileCount = fileCount;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(String permissionId) {
        this.permissionId = permissionId;
    }

    public String getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatusCodeName() {
        return statusCodeName;
    }

    public void setStatusCodeName(String statusCodeName) {
        this.statusCodeName = statusCodeName;
    }

    public String getSecurityCode() {
		return securityCode;
	}

	public void setSecurityCode(String securityCode) {
		this.securityCode = securityCode;
	}

	public String getSecurityCodeName() {
		return securityCodeName;
	}

	public void setSecurityCodeName(String securityCodeName) {
		this.securityCodeName = securityCodeName;
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

    public String getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}
    
    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getUpdatorId() {
        return updatorId;
    }

    public void setUpdatorId(String updatorId) {
        this.updatorId = updatorId;
    }

    public String getUpdatorName() {
        return updatorName;
    }

    public void setUpdatorName(String updatorName) {
        this.updatorName = updatorName;
    }

    public String getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
    }

    public String getDeletorId() {
        return deletorId;
    }

    public void setDeletorId(String deletorId) {
        this.deletorId = deletorId;
    }

    public String getDeletorName() {
        return deletorName;
    }

    public void setDeletorName(String deletorName) {
        this.deletorName = deletorName;
    }

    public String getDeleteDate() {
        return deleteDate;
    }

    public void setDeleteDate(String deleteDate) {
        this.deleteDate = deleteDate;
    }
    
    public String getActorId() {
		return actorId;
	}

	public void setActorId(String actorId) {
		this.actorId = actorId;
	}
    
    public String getWorkflowId() {
  		return workflowId;
  	}

  	public void setWorkflowId(String workflowId) {
  		this.workflowId = workflowId;
  	}

	public String getWorkflowStatus() {
		return workflowStatus;
	}

	public void setWorkflowStatus(String workflowStatus) {
		this.workflowStatus = workflowStatus;
	}

	public String getWorkflowStatusName() {
		return workflowStatusName;
	}

	public void setWorkflowStatusName(String workflowStatusName) {
		this.workflowStatusName = workflowStatusName;
	}
  	
}
