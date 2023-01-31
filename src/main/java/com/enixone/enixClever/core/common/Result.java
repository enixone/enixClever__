package com.enixone.enixClever.core.common;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.base.VO;
import com.enixone.enixClever.cms.was.model.WorkFlowVO;

public class Result {
    private Status status;
    private Map<String, Object> data;
    private PaginationVO paging;
    private String message;
    private String now;
    
    public String getNow() {
    	Date _now = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		this.now = formatter.format(_now);
    	return now;
	}

		//결과에 값이 있는 경우 해당 Object의 아이디를 넣어 둔다. 리턴용을 사용
    private String objectId;

    public String getObjectId() {
		return objectId;
	}

	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}

	public Result() {
        this.status = Status.FAIL;
    }

    public Status getStatus() {
        return status;
    }

    public Map<String, Object> getData() {
        return data;
    }

   
    
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
    	this.message = message;
    }
    
    public void addData(String key, Object value) {
        if (this.data == null) {
            this.data = new HashMap();
        }

        this.data.put(key, value);
    }

    public void setSuccess() {
    	this.status = Status.SUCCESS;
    }
    
    public void setSuccess(String message) {
        this.setSuccess();
        this.message = message;
    }
    
    public void setSuccess(Object[][] datas) {
        this.setSuccess();

        for (Object[] data : datas) {
            this.addData(data[0].toString(), data[1]);
        }
    }

    public void setFail() {
        this.status = Status.FAIL;
    }

    public void setFail(String message) {
        this.setFail();
        this.message = message;
    }


    public void setError() {
        this.status = Status.ERROR;
    }
    public void setError(String message) {
        this.setError();
        this.message = message;
    }

    public PaginationVO getPaging() {
        return paging;
    }

    public void setPageInfo(VO vo) {
        if (vo != null) {
            this.paging = new PaginationVO();
            this.paging.setStartNo(vo.getStartNo());
            this.paging.setEndNo(vo.getEndNo());
            this.paging.setKeyword(vo.getKeyword());
            this.paging.setOrderBy(vo.getOrderBy());
            this.paging.setOrderKey(vo.getOrderKey());
            this.paging.setStatusCode(vo.getStatusCode());
            this.paging.setPageNo(vo.getPageNo());
            this.paging.setPerPage(vo.getPerPage());
            this.paging.setTotalCount(vo.getTotalCount());
            this.paging.setTotalPage(vo.getTotalPage());
        }
    }

    public void setPageInfo(List<? extends VO> list) {
        if (list != null && list.size() > 0) {
            this.setPageInfo(list.get(0));
        }
    }

    
    
    
    private static enum Status {
        INVALID_SESSION,
        SUCCESS,
        FAIL,
        ERROR;
    }
}