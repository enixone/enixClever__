package com.enixone.enixClever.cms.was.service;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.*;
import com.enixone.enixClever.cms.was.utils.CommonUtil;
import com.enixone.enixClever.cms.was.utils.DateUtils;
import com.enixone.enixClever.core.exceptions.EnixCleverException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UrlLinkService extends BaseService {

    @Autowired
    DocumentService docService;

    public UrlLinkVO selectLinkInfo(String linkId) {
        return urlLinkDao.selectLinkInfo(linkId);
    }

    public DocumentVO selectLinkDoc(String linkId) throws Exception {
        UrlLinkVO linkInfo = urlLinkDao.selectLinkInfo(linkId);

        if (linkInfo.getReadCount() >= linkInfo.getReadLimit()) {
            throw new EnixCleverException(linkInfo.getReadCount() + "회의 열람 횟수를 모두 소진하여 열람이 불가합니다.");

        } else if (DateUtils.isExpired(linkInfo.getExpireDate())) {
            throw new EnixCleverException(linkInfo.getExpireDate() + " 일까지만 열람이 가능합니다.");
        }

        // 조회 카운트 증가
        urlLinkDao.increaseReadCount(linkId);

        return docService.selectDocInfoWithoutHistory(linkInfo.getDocId());
    }

    public List<UrlLinkVO> selectLinkList(PaginationVO paging) throws Exception {
        return urlLinkDao.selectLinkList(getSessionUserKey(), paging);
    }

    public String createUrlLink(UrlLinkVO vo) throws Exception {

        // 신규 아이디 생성
        String linkId = CommonUtil.getUrlLink();

        // 생성한 아이디가 등록되어있지 않을경우 패스
        while (true) {
            UrlLinkVO dbInfo = urlLinkDao.selectLinkInfo(linkId);

            if (dbInfo == null) {
                break;
            }

            Thread.sleep(50);
        }

        // 링크 아이디 저장
        vo.setLinkId(linkId);

        // 만료 날짜 설정
        vo.setExpireDate(DateUtils.getIntervalDate(vo.getExpireCode()));

        // 생성자 설정
        vo.setCreatorId(getSessionUserKey());

        // 등록
        urlLinkDao.insertUrlLink(vo);

        return linkId;
    }

    public void resetCount(String linkId) {
        urlLinkDao.resetReadCount(linkId);
    }

    public void expandExpired(String linkId, String expireCode) throws Exception {

        String expireDate = DateUtils.getIntervalDate(expireCode);
        urlLinkDao.expandExpired(linkId, expireDate);
    }
}
