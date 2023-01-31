package com.enixone.enixClever.cms.was.model;

import com.enixone.enixClever.cms.was.base.VO;
import org.springframework.stereotype.Component;

@Component
public class CodeVO extends VO {
    /**
     * origin member
     */
	private String codeGroup;
	private String code;
	private String codeName;
	private String idx;
	private String description;
	
	public String getCodeGroup() {
		return codeGroup;
	}
	public void setCodeGroup(String codeGroup) {
		this.codeGroup = codeGroup;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCodeName() {
		return codeName;
	}
	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}
	public String getIdx() {
		return idx;
	}
	public void setIdx(String idx) {
		this.idx = idx;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
	
	
}
