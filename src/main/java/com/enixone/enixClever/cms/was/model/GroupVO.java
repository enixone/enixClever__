package com.enixone.enixClever.cms.was.model;

import com.enixone.enixClever.cms.was.base.VO;

public class GroupVO extends VO {
	private String groupId;
	private String groupName;
    private String parentGroupId;
    private String parentGroupName;
	private String statusCodeName;
    private String createDate;
    private String updateDate;
    
    private String groupFolderId;
    private String groupFolderName;
    private int childCount;
    private int userCount;
    private String boxId;
    
    
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getParentGroupId() {
		return parentGroupId;
	}
	public void setParentGroupId(String parentGroupId) {
		this.parentGroupId = parentGroupId;
	}
	public String getParentGroupName() {
		return parentGroupName;
	}
	public void setParentGroupName(String parentGroupName) {
		this.parentGroupName = parentGroupName;
	}
	public String getStatusCodeName() {
		return statusCodeName;
	}
	public void setStatusCodeName(String statusCodeName) {
		this.statusCodeName = statusCodeName;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}
	public String getGroupFolderId() {
		return groupFolderId;
	}
	public void setGroupFolderId(String groupFolderId) {
		this.groupFolderId = groupFolderId;
	}
	public String getGroupFolderName() {
		return groupFolderName;
	}
	public void setGroupFolderName(String groupFolderName) {
		this.groupFolderName = groupFolderName;
	}
	public int getChildCount() {
		return childCount;
	}
	public void setChildCount(int childCount) {
		this.childCount = childCount;
	}
	public int getUserCount() {
		return userCount;
	}
	public void setUserCount(int userCount) {
		this.userCount = userCount;
	}
	public String getBoxId() {
		return boxId;
	}
	public void setBoxId(String boxId) {
		this.boxId = boxId;
	}
    
    
    
}