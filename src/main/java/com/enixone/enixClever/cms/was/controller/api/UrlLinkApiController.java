package com.enixone.enixClever.cms.was.controller.api;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.cms.was.model.UrlLinkVO;
import com.enixone.enixClever.core.common.Result;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/url")
public class UrlLinkApiController extends BaseController {

    /**
     * Url Link 목록 조회
     * @param paging
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public Result selectLinkList(@ModelAttribute PaginationVO paging, final Result result) throws Exception {

        List<UrlLinkVO> linkList = urlLinkService.selectLinkList(paging);

        result.setPageInfo(linkList);
        result.setSuccess(new Object[][]{
                {"urlLinkList", linkList}
        });

        return result;
    }

    /**
     * Url Link 상세 정보 조회
     * @param urlLinkId
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/{urlLinkId}", method = RequestMethod.GET)
    public Result selectLinkInfo(@PathVariable String urlLinkId, final Result result) throws Exception {

        UrlLinkVO info = urlLinkService.selectLinkInfo(urlLinkId);
        result.setSuccess(new Object[][]{
                {"urlLinkInfo", info}
        });
        return result;
    }

    /**
     * Url 문서 상세 정보 조회
     * @param urlLinkId
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/{urlLinkId}/doc", method = RequestMethod.GET)
    public Result selectLinkDocInfo(@PathVariable String urlLinkId, final Result result) throws Exception {

        DocumentVO info = urlLinkService.selectLinkDoc(urlLinkId);
        result.setSuccess(new Object[][]{
                {"docInfo", info}
        });
        return result;
    }

    /**
     * Url Link 등록
     * @param vo
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "", method = RequestMethod.POST)
    public Result selectBoxList(@RequestBody UrlLinkVO vo, final Result result) throws Exception {
        logger.info("linkName : " + vo.getLinkName());
        logger.info("expireDate : " + vo.getExpireDate());
        logger.info("readLimit : " + vo.getReadLimit());
        logger.info("docId : " + vo.getDocId());
        logger.info("creator Id : " + vo.getCreatorId());

        String linkId = urlLinkService.createUrlLink(vo);
        result.setSuccess(new Object[][]{
                {"linkId", linkId}
        });

        return result;
    }

    /**
     * UrlLink 조회 수 리셋
     * @param linkId
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/{linkId}/resetCount", method = RequestMethod.POST)
    public Result resetReadCount(@PathVariable String linkId, final Result result) throws Exception {
        logger.info("linkId : " + linkId);

        urlLinkService.resetCount(linkId);
        result.setSuccess();
        return result;
    }

    /**
     * Url Link 만료일자 연장
     * @param linkId
     * @param vo
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/{linkId}/expandExpired", method = RequestMethod.POST)
    public Result expandExpired(@PathVariable String linkId, @RequestBody UrlLinkVO vo, final Result result) throws Exception {
        logger.info("linkId : " + linkId);
        logger.info("expireCode : " + vo.getExpireCode());

        urlLinkService.expandExpired(linkId, vo.getExpireCode());
        result.setSuccess();
        return result;
    }

}
