package com.enixone.enixClever.cms.was.model;

import org.apache.commons.lang3.StringUtils;

public class PermissionInfo {
    private boolean read;
    private boolean create;
    private boolean update;
    private boolean delete;
    private boolean listView;
    private boolean permission;
    private boolean download;
    private boolean edit;
    private boolean print;
    
    public PermissionInfo(AssignPermissionVO vo) {
        this.read = StringUtils.equals("Y", vo.getRead());
        this.create = StringUtils.equals("Y", vo.getCreate());
        this.update = StringUtils.equals("Y", vo.getUpdate());
        this.delete = StringUtils.equals("Y", vo.getDelete());
        this.listView = StringUtils.equals("Y", vo.getListView());
        this.permission = StringUtils.equals("Y", vo.getPermission());
        this.download = StringUtils.equals("Y", vo.getDownload());
        this.edit = StringUtils.equals("Y", vo.getEdit());
        this.print = StringUtils.equals("Y", vo.getPrint());
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public boolean isCreate() {
        return create;
    }

    public void setCreate(boolean create) {
        this.create = create;
    }

    public boolean isUpdate() {
        return update;
    }

    public void setUpdate(boolean update) {
        this.update = update;
    }

    public boolean isDelete() {
        return delete;
    }

    public void setDelete(boolean delete) {
        this.delete = delete;
    }

    public boolean isListView() {
        return listView;
    }

    public void setListView(boolean listView) {
        this.listView = listView;
    }

    public boolean isPermission() {
        return permission;
    }

    public void setPermission(boolean permission) {
        this.permission = permission;
    }

    public boolean isDownload() {
        return download;
    }

    public void setDownload(boolean download) {
        this.download = download;
    }
    
    public boolean isEdit() {
		return edit;
	}

	public void setEdit(boolean edit) {
		this.edit = edit;
	}

	public boolean isPrint() {
		return print;
	}

	public void setPrint(boolean print) {
		this.print = print;
	}

	public PermissionInfo() {

    }
}
