package com.enixone.enixClever.cms.was.model;

import com.enixone.enixClever.cms.was.base.VO;

import java.util.List;

public class PermissionVO extends VO {
    private String permissionId;
    private String permissionName;
    private String isSystem;
    private String ownerId;
    private String ownerName;
    private String ownerType;
    private String ownerTypeName;
    private String creatorId;
    private String creatorName;
    private String createDate;
    private String updatorId;
    private String updatorName;
    private String updateDate;
    private String lastAssignDate;
    
    
    public String getLastAssignDate() {
		return lastAssignDate;
	}

	public void setLastAssignDate(String lastAssignDate) {
		this.lastAssignDate = lastAssignDate;
	}

	private List<AssignPermissionVO> accessorList;

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getOwnerTypeName() {
        return ownerTypeName;
    }

    public void setOwnerTypeName(String ownerTypeName) {
        this.ownerTypeName = ownerTypeName;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public String getOwnerType() {
        return ownerType;
    }

    public void setOwnerType(String ownerType) {
        this.ownerType = ownerType;
    }

    public List<AssignPermissionVO> getAccessorList() {
        return accessorList;
    }

    public void setAccessorList(List<AssignPermissionVO> accessorList) {
        this.accessorList = accessorList;
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

    public String getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(String permissionId) {
        this.permissionId = permissionId;
    }

    public String getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName;
    }

    public String getIsSystem() {
        return isSystem;
    }

    public void setIsSystem(String isSystem) {
        this.isSystem = isSystem;
    }
}
