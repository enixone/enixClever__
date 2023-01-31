package com.enixone.enixClever.cms.was.controller.api;

import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.core.common.Result;
import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.model.FolderVO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/folders")
public class FolderApiController extends BaseController {

    /**
     * [전사, 업무] 문서함 루트 조회
     * @param boxId
     * @param result
     * @return
     */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public Result selectRootFolderList(@RequestParam("boxId") String boxId, @RequestParam("userKey") String userKey, final Result result) throws Exception {
        List<FolderVO> rootList = folderService.selectRootFolderList(boxId, userKey);
        result.setSuccess(new Object[][] {
                {"rootList", rootList}
        });
        return result;
    }
    /**
     * [부서] 내가 속한 부서 루트 목록 조회
     * @param userKey
     * @param result
     * @return
     */
    @RequestMapping(value = "/groupFolder", method = RequestMethod.GET)
    public Result selectMyGroupFolderList(@RequestParam("boxId") String boxId, @RequestParam("userKey") String userKey, final Result result) throws Exception {
        List<FolderVO> rootList = folderService.selectMyGroupFolderList(boxId, userKey);
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
     * [전사, 업무] 하위 폴더 목록 조회
     * @param folderId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{folderId}/child", method = RequestMethod.GET)
    public Result selectFolderListByParentId(@PathVariable String folderId, final Result result) throws Exception {
        List<FolderVO> folderList = folderService.selectGlobalFolderListByParentId(folderId, true, false);
        result.setSuccess(new Object[][] {
                {"folderList", folderList}
        });
        return result;
    }

    /**
     * 폴더 상세정보 조회
     * @param folderId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{folderId}", method = RequestMethod.GET)
    public Result selectFolderInfo(@PathVariable String folderId, final Result result) throws Exception {

        FolderVO folderInfo = folderService.selectFolderInfo(folderId);
        result.setSuccess(new Object[][] {
                {"folderInfo", folderInfo}
        });
        return result;
    }

    /**
     * 폴더 등록
     * @param vo
     * @param result
     * @return
     */
    @RequestMapping(value = "", method = RequestMethod.POST)
    public Result insertFolder(@RequestBody FolderVO vo, final Result result) throws Exception {
        folderService.insertFolder(vo);
        result.setSuccess();

        return result;
    }

    /**
     * 폴더 수정
     * @param vo
     * @param result
     * @return
     */
    @RequestMapping(value = "/{folderId}/update", method = RequestMethod.POST)
    public Result updateFolder(@RequestBody FolderVO vo, final Result result) throws Exception {
        folderService.updateFolder(vo);
        result.setSuccess();

        return result;
    }

    /**
     * 폴더 이름 변경
     *
     * @param vo
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/{folderId}/rename", method = RequestMethod.POST)
    public Result renameFolder(@RequestBody FolderVO vo, final Result result) throws Exception {
        folderService.updateFolderName(vo.getFolderId(), vo.getFolderName());
        result.setSuccess();

        return result;
    }

    /**
     * 폴더 삭제
     * @param folderId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{folderId}", method = RequestMethod.DELETE)
    public Result deleteFolder(@PathVariable String folderId, final Result result) throws Exception {
        folderService.deleteFolder(folderId);
        result.setSuccess();

        return result;
    }


    /**
     * 폴더의 문서 목록 조회
     * @param folderId
     * @param result
     * @return 
     */
    @RequestMapping(value = "/docs", method = RequestMethod.GET)
    public Result selectDocListByParentId(
            @RequestParam String folderId,
            @ModelAttribute PaginationVO paging,
            final Result result) throws Exception {
    	
    	List<DocumentVO> docList = docService.selectDocListByFolderId(folderId, paging);
        result.setPageInfo(docList);
        result.setSuccess(new Object[][] {
                {"docList", docList}
        });

        return result;
    }

    /**
     * 북마크 등록
     * @param folderId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{folderId}/bookmark", method = RequestMethod.POST)
    public Result insertBookmark(@PathVariable String folderId, final Result result) {
        try {
            String bookmarkId = folderService.insertBookmarkFolder(folderId);

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
     * @param folderId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{folderId}/bookmark", method = RequestMethod.DELETE)
    public Result deleteBookmark(@PathVariable String folderId, final Result result) {
        try {
            folderService.deleteBookmarkFolder(folderId);

            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * [테스트] 하위폴더 갯수 수정
     * @param folderId
     * @param childCount
     * @param result
     * @return
     */
    @RequestMapping(value = "/{folderId}/update/childCount/{childCount}", method = RequestMethod.POST)
    public Result updateChildCount(@PathVariable String folderId, @PathVariable int childCount, final Result result) throws Exception {
        folderService.updateChildCount(folderId, childCount);
        result.setSuccess();
        return result;
    }

}
