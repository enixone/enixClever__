package com.enixone.enixClever.cms.was.model.statistics;

import com.enixone.enixClever.cms.was.base.VO;

public class ActorStats extends VO {
    private String userKey;
    private String userName;
    private String groupId;
    private String groupName;
    private int readCount;
    private int createCount;
    private int updateCount;
    private int deleteCount;

    public String getUserKey() {
        return userKey;
    }

    public void setUserKey(String userKey) {
        this.userKey = userKey;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

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

    public int getReadCount() {
        return readCount;
    }

    public void setReadCount(int readCount) {
        this.readCount = readCount;
    }

    public int getCreateCount() {
        return createCount;
    }

    public void setCreateCount(int createCount) {
        this.createCount = createCount;
    }

    public int getUpdateCount() {
        return updateCount;
    }

    public void setUpdateCount(int updateCount) {
        this.updateCount = updateCount;
    }

    public int getDeleteCount() {
        return deleteCount;
    }

    public void setDeleteCount(int deleteCount) {
        this.deleteCount = deleteCount;
    }
}
