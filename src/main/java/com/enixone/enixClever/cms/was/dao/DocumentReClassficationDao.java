package com.enixone.enixClever.cms.was.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentBookmarkVO;
import com.enixone.enixClever.cms.was.model.DocumentReClassficationVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;

@Repository
public interface DocumentReClassficationDao {
	int createReclassfication(DocumentReClassficationVO reclass);
}
