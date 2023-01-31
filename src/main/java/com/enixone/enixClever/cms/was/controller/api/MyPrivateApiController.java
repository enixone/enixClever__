package com.enixone.enixClever.cms.was.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.cms.was.model.FolderVO;
import com.enixone.enixClever.core.common.Result;
import com.enixone.enixClever.core.exceptions.EnixCleverException;

@RestController
@RequestMapping ("/private")
public class MyPrivateApiController extends BaseController {

	/** 
     * [내 문서] 내가 생성한 문서 전체 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "/myDocument", method = RequestMethod.GET)
    public Result selectMyDocumentList(@ModelAttribute PaginationVO paging,
    		@RequestParam("searchKey") String searchKey,
    		@RequestParam("keyword") String keyword,
    		final Result result) throws Exception {
        
    	
    	List<DocumentVO> docList = myPrivateService.selectMyDocumentList(paging);
    	
    	result.setPageInfo(docList);
        result.setSuccess(new Object[][] { 
                {"docList", docList}
        });
        
        return result;
    }
    
    /**
     * [내 문서] 문서함 루트 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public Result selectRootFolderList(@RequestParam("userKey") String userKey, final Result result) throws Exception {
        List<FolderVO> rootList = folderService.selectMyPrivateRootFolderList("BOX_PRIVATE", userKey);
        result.setSuccess(new Object[][] {
                {"rootList", rootList}
        });
        return result;
    }

    /**
     * [부서] 하위 폴더 목록 조회
     * @param folderId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{folderId}/groupChild", method = RequestMethod.GET)
    public Result selectGroupFolderListByParentId(@PathVariable String folderId, final Result result) throws Exception {
        List<FolderVO> folderList = folderService.selectGlobalFolderListByParentId(folderId, false, true);
        result.setSuccess(new Object[][] {
                {"folderList", folderList}
        });
        return result;
    }

    /**
     * 폴더의 문서 목록 조회
     * @param folderId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{folderId}/docs", method = RequestMethod.GET)
    public Result selectDocListByParentId(
            @PathVariable String folderId,
            @RequestParam("userKey") String userKey,
            @ModelAttribute PaginationVO paging,
            final Result result) throws Exception {
        List<DocumentVO> docList = docService.selectMyDocListByFolderId(folderId, userKey, paging);
        result.setPageInfo(docList);
        result.setSuccess(new Object[][] {
                {"docList", docList}
        });

        return result;
    }

    @RequestMapping(value = "/tempSave", method = RequestMethod.GET)
    public Result selectTempSaveList(@ModelAttribute PaginationVO paging, final Result result) throws Exception {
        List<DocumentVO> docList = myPrivateService.selectTempSaveList(paging);
        result.setPageInfo(docList);
        result.setSuccess(new Object[][]{
                {"docList", docList}
        });
        return result;
    }
    
    @RequestMapping(value = "/recent/created", method = RequestMethod.GET)
    public Result selectNewDocument(@ModelAttribute PaginationVO paging, final Result result) throws Exception {
        List<DocumentVO> docList = myPrivateService.selectNewDocList(paging);
        result.setPageInfo(docList);
        result.setSuccess(new Object[][]{
                {"docList", docList}
        });
        return result;
    }

    /**
     * 만기문서 목록 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "/expired", method = RequestMethod.GET)
    public Result selectExpireDocList(
            @ModelAttribute PaginationVO paging,
            final Result result) {
        try {
            List<DocumentVO> list = docService.selectMyExpireDocList(paging);
            result.setPageInfo(list);
            result.setSuccess(new Object[][] {
                    {"docList", list}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    
    /**
     * [내 문서] 결재 문서함 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "/{listPart}/workflow", method = RequestMethod.GET)
    public Result selectWorkflowList(
    		@PathVariable String listPart,
            @ModelAttribute PaginationVO paging, 
            final Result result) throws Exception {
        List<DocumentVO> docList = myPrivateService.selectWorkflowList(listPart, paging);
        result.setPageInfo(docList);
        result.setSuccess(new Object[][] {
                {"docList", docList}
        });
        return result;
    }
    
    /**
     * 비밀관리 기록부 문서조회
     * @param result
     * @return
     */
    @RequestMapping(value = "/securityDocList", method = RequestMethod.GET)
    public Result selectSecurityDocList(
            @ModelAttribute PaginationVO paging,
            final Result result){
        
    	    try {
				List<DocumentVO> list = myPrivateService.selectSecurityDocList(paging);
				result.setPageInfo(list);
				result.setSuccess(new Object[][] {
				        {"docList", list}
				});
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				result.setError("관리자에게 문의 바랍니다.");
			}
            
            
        return result;
    }

    
    
    /**
     * 휴지통 목록 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "/trash", method = RequestMethod.GET)
    public Result selectTrashDocList(
            @ModelAttribute PaginationVO paging,
            final Result result) {
        try {
            List<DocumentVO> list = docService.selectTrashDocList(paging);
            result.setPageInfo(list);
            result.setSuccess(new Object[][] {
                    {"docList", list}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

}
