package com.enixone.enixClever.cms.was.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentBookmarkVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.core.common.Result;

@RestController
@RequestMapping ("/bookmark")
public class DocumentBookmarkApiController extends BaseController {

	/**
     * 북마크 등록
     * @param docId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{docIdList}", method = RequestMethod.POST)
    public Result insertBookmark(@PathVariable String docIdList, final Result result) {
        try {
            String bookmarkId = docBookmarkService.insertBookmarkDoc(docIdList);

            result.setSuccess(new Object[][] {
                    {"bookmarkId", bookmarkId}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 북마크 삭제
     * @param bookmarkId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{docIdList}", method = RequestMethod.DELETE)
    public Result deleteBookmark(@PathVariable String docIdList, final Result result) {
        try {
        	docBookmarkService.deleteBookmarkDoc(docIdList);

            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    
    /**
     * 북마크 문서 목록 조회
     * @param userKey
     * @param result
     * @return
     */
    @RequestMapping(value = "/docs", method = RequestMethod.GET)
    public Result selectBookmarkDocList(@ModelAttribute PaginationVO paging, final Result result)  throws Exception {
    	List<DocumentVO> docList = docBookmarkService.selectBookmarkDocByUserKey(paging);
        result.setPageInfo(docList);
        result.setSuccess(new Object[][] {
                {"docList", docList}
        });
    
        return result;
    }
    
    
    /**
     * 문서 아이디를 이용하여 북마크 여부 조회한다. 
     * @param docId
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/{docId}/isBookmark", method = RequestMethod.GET)
    public Result selectIsBookmark(@PathVariable String docId, final Result result) throws Exception {
    	
    	DocumentBookmarkVO documentBookmarkVO = docBookmarkService.selectIsBookmark(docId);
    	
    	if(documentBookmarkVO != null) {
    		result.setObjectId(documentBookmarkVO.getBookmarkId());
    	}
    	
    	result.setSuccess();
    
        return result;
    }
    
    
}
