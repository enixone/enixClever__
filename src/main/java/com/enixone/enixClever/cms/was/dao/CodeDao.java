package com.enixone.enixClever.cms.was.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.enixone.enixClever.cms.was.model.CodeVO;

@Repository
public interface CodeDao {
    List<CodeVO> selectPosition();
    
}
