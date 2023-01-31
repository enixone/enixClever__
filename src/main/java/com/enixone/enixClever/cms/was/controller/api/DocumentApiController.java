package com.enixone.enixClever.cms.was.controller.api;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.cms.was.model.FileVO;
import com.enixone.enixClever.core.common.Result;

@RestController
@RequestMapping ("/docs")
public class DocumentApiController extends BaseController {

	//private static Logger logger = LogManager.getLogger(DocumentApiController.class);
	
    /**
     * 문서 상세 정보 조회
     * @param docId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{docId}", method = RequestMethod.GET)
    public Result selectDocumentInfo(@PathVariable String docId, final Result result) throws Exception {

        DocumentVO vo = docService.selectDocInfo(docId, true);
        List<DocumentVO> allVersions = docService.selectAllVersionDocInfo(docId);
        result.setSuccess(new Object[][] {
                {"docInfo", vo},
                {"allVersions", allVersions}
        });
        
        return result;
    }
    
    /** 
     * 문서 등록
     * @param vo
     * @param result 
     * @return
     */
    @RequestMapping(value = "", method = RequestMethod.POST)
    public Result insertDocument(@RequestBody final DocumentVO vo, final Result result) throws Exception {

    	String docId = docService.insertDocument(vo);
    	
    	result.setSuccess(new Object[][] {
    		{"docInfo", docService.selectDocInfo(docId, false)}
        });
    	result.setMessage("문서가 등록되었습니다.");
    	
    	return result;
    }

    /**
     * 문서 등록을 위한 코드 목록 조회
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/codeForInsert", method = RequestMethod.GET)
    public Result selectCodeListForInsert(final Result result) throws Exception {

//        List<TypeVO> typeList = typeService.selectTypeList();
//        List<CodeVO> expireCodeList = codeS
        return result;
    }

    /**
     * 문서 수정
     * @param vo
     * @param result
     * @return
     */
    @RequestMapping(value = "/{docId}/update", method = RequestMethod.POST)
    public Result updateDocument(@RequestBody final DocumentVO vo, final Result result) throws Exception {

        String docId = docService.updateDocument(vo);

        result.setSuccess(new Object[][] {
                {"docId", docId}
        });
        return result;
    }

    /**
     * 문서 삭제
     * @param docId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{docId}", method = RequestMethod.DELETE)
    public Result trashDocument(@PathVariable String docId, final Result result) throws Exception {

        docService.trashDoc(docId);
        result.setSuccess();
        return result;
    }

    /**
     * 문서의 첨부파일 목록 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "/{docId}/files", method = RequestMethod.GET)
    public Result selectFileListByDocId(@PathVariable String docId, final Result result) {
        try {
            List<FileVO> fileList = fileService.selectFileListByDocId(docId);

            result.setSuccess(new Object[][] {
                    {"fileList", fileList}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 문서의 첨부파일 일괄 삭제
     * @param result
     * @return
     */
    @RequestMapping(value = "/{docId}/files", method = RequestMethod.DELETE)
    public Result deleteFileListByDocId(@PathVariable String docId, final Result result) {
        try {
            fileService.deleteFileListByDocId(docId);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * (테스트) 문서의 첨부파일 맵핑 등록
     * @param result
     * @return
     */
    @RequestMapping(value = "/{docId}/files/{fileId}", method = RequestMethod.POST)
    public Result insertDocFileMapping(@PathVariable String docId, @PathVariable String fileId, final Result result) {
        try {
            fileService.insertDocFileMapping(docId, fileId);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * (테스트) 문서의 첨부파일 맵핑 삭제
     * @param result
     * @return
     */
    @RequestMapping(value = "/{docId}/files/{fileId}", method = RequestMethod.DELETE)
    public Result deleteDocFileMapping(@PathVariable String docId, @PathVariable String fileId, final Result result) {
        try {
            fileService.deleteDocFileMapping(docId, fileId);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * (테스트) 문서의 첨부파일 맵핑 일괄 삭제
     * @param result
     * @return
     */
    @RequestMapping(value = "/{docId}/files/mapping", method = RequestMethod.DELETE)
    public Result deleteDocFileMapping(@PathVariable String docId, final Result result) {
        try {
            fileService.deleteDocFileMappingByDocId(docId);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }


    /**
     * 만기문서 목록 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "/system/expired", method = RequestMethod.GET)
    public Result selectExpireDocList(
            @ModelAttribute PaginationVO paging,
            final Result result) {
        try {
            List<DocumentVO> list = docService.selectExpiredDocList(paging);
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
     * 만기문서 삭제
     * @param result
     * @return
     */
    @RequestMapping(value = "/system/expired/delete/{docIdList}", method = RequestMethod.DELETE)
    public Result deleteExpireDocList(
            @PathVariable List<String> docIdList,
            final Result result) {
        try {

            // 문서 삭제처리
            docService.trashDoc(docIdList);

            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 만기문서 복원
     * @param result
     * @return
     */
    @RequestMapping(value = "/system/expired/restore/{docIdList}", method = RequestMethod.POST)
    public Result restoreExpireDocList(
            @PathVariable List<String> docIdList,
            final Result result) {
        try {

            // 문서 복원처리
            docService.restoreExpiredDoc(docIdList);

            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 휴지통 목록 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "/system/trash", method = RequestMethod.GET)
    public Result selectTrashDocList(
            @ModelAttribute PaginationVO paging,
            final Result result) {
        try {
            List<DocumentVO> list = docService.selectTerminatedDocList(paging);
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
     * 휴지통 문서 복원
     * @param result
     * @return
     */
    @RequestMapping(value = "/system/trash/restore/{docIdList}", method = RequestMethod.POST)
    public Result restoreDocList(
            @PathVariable List<String> docIdList,
            final Result result) {
        try {
            docService.restoreTrashDoc(docIdList);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 휴지통 문서 완전 삭제
     * @param result
     * @return
     */
    @RequestMapping(value = "/system/trash/terminate/{docIdList}", method = RequestMethod.DELETE)
    public Result terminateDocList(
            @PathVariable List<String> docIdList,
            final Result result) {
        try {
            docService.terminateDoc(docIdList);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

	/** 
	 * 문서 재분류
	 * @param vo
	 * @param result 
	 * @return
	 */
	@RequestMapping(value = "documentReClassfication", method = RequestMethod.GET)
	public Result documentReClassfication(@RequestParam final Map<String, String> mapVo, final Result result) throws Exception {
	
		try {
            docService.documentReClassfication(mapVo);
            result.setSuccess("재분류 요청되었습니다.");
            
        } catch (Exception e) {
            result.setError(e.getMessage());
        }
		
		return result;
	}

}
