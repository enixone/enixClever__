package com.enixone.enixClever.cms.was.model;

import com.enixone.enixClever.cms.was.base.VO;

public class AssignDeptVO extends VO {
    private String userKey;
    private String groupId;
    private String isMain;

    public String getUserKey() {
        return userKey;
    }

    public void setUserKey(String userKey) {
        this.userKey = userKey;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getIsMain() {
        return isMain;
    }

    public void setIsMain(String isMain) {
        this.isMain = isMain;
    }
}