package com.enixone.enixClever.cms.was.service;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.model.BoxVO;
import com.enixone.enixClever.cms.was.model.FileVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoxService extends BaseService {

    public List<BoxVO> selectBoxList() {
        return boxDao.selectBoxList();
    }

}
