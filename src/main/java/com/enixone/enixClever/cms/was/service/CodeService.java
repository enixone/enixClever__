package com.enixone.enixClever.cms.was.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.model.CodeVO;

@Service
@Transactional
public class CodeService extends BaseService {

	public List<CodeVO> selectPosition() {
		return codeDao.selectPosition();
	}

}
