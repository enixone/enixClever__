package com.enixone.enixClever.cms.was.service;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.base.Constants;
import com.enixone.enixClever.cms.was.model.BoxVO;
import com.enixone.enixClever.cms.was.model.ChangeOwnerVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.core.common.GenerateKey;
import com.enixone.enixClever.core.exceptions.EnixCleverException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ChangeOwnerService extends BaseService {

    @Autowired
    DocumentHistoryService docHistoryService;

    public String insertChangeOwner(ChangeOwnerVO vo) {
    	
    	GenerateKey genKey = GenerateKey.getInstance();
    	vo.setChangeId(genKey.getKey("58"));
    	
    	vo.setStatusCode(Constants.STATUS_REQUEST);

        // 내 요청항목이 이미 있을경우
        if (changeOwnerDao.countMyRequest(vo.getGiverId()) > 0) {
            throw new EnixCleverException("이미 소유권 이전 신청이 진행중입니다.");
        }

        changeOwnerDao.insertChangeOwner(vo);

        return vo.getChangeId();
    }

    public int countUserWorkspaceDocs(String userKey) {
        return changeOwnerDao.countUserWorkspaceDocs(userKey);
    }

    public List<ChangeOwnerVO> selectGiveOwnerList(String giverId) {
        return changeOwnerDao.selectGiveOwnerList(giverId);
    }

    public List<ChangeOwnerVO> selectTakeOwnerList(String takerId) {
        return changeOwnerDao.selectTakeOwnerList(takerId);
    }

    @Transactional
    public void takeOwner(String changeId) throws Exception {
        // 소유권 이전 정보 조회
        ChangeOwnerVO vo = changeOwnerDao.selectChangeOwnerInfo(changeId);

        // 이전 대상 문서 목록 조회
        List<DocumentVO> docList = docDao.selectUserWorkspaceDocs(vo.getGiverId());

        for (DocumentVO docInfo : docList) {
            // 소유권 변경
            docDao.changeOwner(docInfo.getDocId(), vo.getTakerId());

            // 히스토리 남김
            docHistoryService.insertDocumentHistory(getUserInfo(), docInfo.getDocId(), docInfo.getDocName(), Constants.ACTION_CHANGE_OWNER, getRequestIp(), true);
        }

        // 소유권 이전 승인 처리
        changeOwnerDao.takeChangeOwner(changeId, Constants.STATUS_APPROVE);

        logger.info("총 : " + docList.size() + " 건 소유권 이전 완료");
    }
}
