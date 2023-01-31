package com.enixone.enixClever.cms.was.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.enixone.enixClever.cms.was.model.ChangeOwnerVO;

@Repository
public interface ChangeOwnerDao {
    /**
     * 소유권 변경 등록
     * @param vo
     * @return
     */
    int insertChangeOwner(ChangeOwnerVO vo);

    /**
     * 유저의 부서 문서 갯수 조회
     * @param userKey
     * @return
     */
    int countUserWorkspaceDocs(String userKey);

    /**
     * 내 소유권 이전 요청 중 처리중인 건수 조회
     * @param userKey
     * @return
     */
    int countMyRequest(String userKey);

    /**
     * 소유권 인계 목록 조회
     * @param giverId
     * @return
     */
    List<ChangeOwnerVO> selectGiveOwnerList(String giverId);

    /**
     * 소유권 인수 목록 조회
     * @param takerId
     * @return
     */
    List<ChangeOwnerVO> selectTakeOwnerList(String takerId);

    /**
     * 소유권 이전 정보 조회
     * @param changId
     * @return
     */
    ChangeOwnerVO selectChangeOwnerInfo(String changId);

    /**
     * 소유권 이전 상태 설정
     * @param changeId
     * @param statusCode
     * @return
     */
    int updateChangeOwnerStatus(
            @Param("changeId") String changeId,
            @Param("statusCode") String statusCode
    );

    /**
     * 소유권 이전 수락
     * @param changeId
     * @param statusCode
     * @return
     */
    int takeChangeOwner(
            @Param("changeId") String changeId,
            @Param("statusCode") String statusCode
    );
}
