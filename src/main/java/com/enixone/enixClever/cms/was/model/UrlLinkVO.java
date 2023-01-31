package com.enixone.enixClever.cms.was.model;

import com.enixone.enixClever.cms.was.base.VO;

public class UrlLinkVO extends VO {
    private String linkId;
    private String creatorId;
    private String creatorName;
    private String docId;
    private String docName;
    private String linkName;
    private String createDate;
    private String expireDate;
    private int readLimit;
    private int readCount;
    private String linkStatus;
    private String linkStatusName;

    private String expireCode;

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public String getDocName() {
        return docName;
    }

    public void setDocName(String docName) {
        this.docName = docName;
    }

    public String getLinkStatusName() {
        return linkStatusName;
    }

    public void setLinkStatusName(String linkStatusName) {
        this.linkStatusName = linkStatusName;
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

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    public String getDocId() {
        return docId;
    }

    public void setDocId(String docId) {
        this.docId = docId;
    }

    public String getLinkName() {
        return linkName;
    }

    public void setLinkName(String linkName) {
        this.linkName = linkName;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public int getReadLimit() {
        return readLimit;
    }

    public void setReadLimit(int readLimit) {
        this.readLimit = readLimit;
    }

    public int getReadCount() {
        return readCount;
    }

    public void setReadCount(int readCount) {
        this.readCount = readCount;
    }

    public String getLinkStatus() {
        return linkStatus;
    }

    public void setLinkStatus(String linkStatus) {
        this.linkStatus = linkStatus;
    }
}
