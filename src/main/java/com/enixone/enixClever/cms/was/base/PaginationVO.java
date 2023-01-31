package com.enixone.enixClever.cms.was.base;

public class PaginationVO {
    private int totalPage;
    private int totalCount =0;
    private int pageNo;
    private int perPage;

    private int startNo;
    private int endNo;

    private String fromDate;
    private String toDate;
    private String orderKey;
    private String orderBy;
    private String searchKey;
    private String keyword;
    private String statusCode;
    
    public String getFromDate() {
        return fromDate;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public String getToDate() {
        return toDate;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
    }

    public int getTotalPage() {
        if (perPage != 0) {
            this.totalPage = (totalCount / perPage) + ((totalCount % perPage == 0) ? 0 : 1);
        }
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public int getPerPage() {
        return perPage;
    }

    public void setPerPage(int perPage) {
        this.perPage = perPage;
    }

    public int getStartNo() {
        this.startNo = (pageNo - 1) * perPage + 1;
        return startNo;
    }

    public void setStartNo(int startNo) {
        this.startNo = startNo;
    }

    public int getEndNo() {
        this.endNo = (pageNo * perPage);
        return endNo;
    }

    public void setEndNo(int endNo) {
        this.endNo = endNo;
    }

    public String getOrderKey() {
    	
    	if(orderKey.equals("docName"))						orderKey = "ED.DOC_NAME";
    	else if(orderKey.equals("statusCode"))				orderKey = "ED.STATUS_CODE";
    	else if(orderKey.equals("version"))					orderKey = "ED.VERSION";
    	else if(orderKey.equals("creatorName"))				orderKey = "ED.CREATOR_NAME";
    	else if(orderKey.equals("createDate"))				orderKey = "ED.CREATE_DATE";
    	else if(orderKey.equals("statusCodeName"))			orderKey = "ED.STATUS_CODE_NAME";
    	else if(orderKey.equals("securityCodeName"))		orderKey = "ED.SECURITY_CODE_NAME";
    	else if(orderKey.equals("docTypeIdName"))			orderKey = "ED.DOC_TYPE_ID_NAME";
    	else if(orderKey.equals("fileCount"))				orderKey = "ED.FILE_COUNT";
    	
        return orderKey;
    }

    public void setOrderKey(String orderKey) {
        this.orderKey = orderKey;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }

    public String getSearchKey() {
		return searchKey;
	}

	public void setSearchKey(String searchKey) {
		this.searchKey = searchKey;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}
}
