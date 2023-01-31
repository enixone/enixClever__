package com.enixone.enixClever.cms.was.dao;

import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.UrlLinkVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UrlLinkDao {
    int insertUrlLink(UrlLinkVO vo);
    List<UrlLinkVO> selectLinkList(
            @Param("userKey") String userKey,
            @Param("paging") PaginationVO paging
    );

    UrlLinkVO selectLinkInfo(String linkId);

    int resetReadCount(String linkId);
    int increaseReadCount(String linkId);
    int expandExpired(
            @Param("linkId") String linkId,
            @Param("expireDate") String expireDate
    );
}
