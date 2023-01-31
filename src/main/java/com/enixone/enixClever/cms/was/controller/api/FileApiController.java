package com.enixone.enixClever.cms.was.controller.api;

import com.enixone.enixClever.core.common.Result;
import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.model.FileVO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/files")
public class FileApiController extends BaseController {

    /**
     * 첨부파일 상세 정보 조회
     * @param fileId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{fileId}", method = RequestMethod.GET)
    public Result selectFileInfo(@PathVariable String fileId, final Result result) {
        try {
            FileVO fileInfo = fileService.selectFileInfo(fileId);
            result.setSuccess(new Object[][] {
                    {"fileInfo", fileInfo}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 첨부파일 등록
     * @param vo
     * @param result
     * @return
     */
    @RequestMapping(value = "", method = RequestMethod.POST)
    public Result insertFile(@ModelAttribute FileVO vo, final Result result) {
        try {
            fileService.insertFile(vo);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 첨부파일 수정
     * @param vo
     * @param result
     * @return
     */
    @RequestMapping(value = "/{fileId}/update", method = RequestMethod.POST)
    public Result updateFile(@ModelAttribute FileVO vo, final Result result) {
        try {
            fileService.updateFile(vo);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 첨부파일 목록 삭제
     * @param fileIdList
     * @param result
     * @return
     */
    @RequestMapping(value = "/{fileIdList}", method = RequestMethod.DELETE)
    public Result deleteFileList(@PathVariable List<String> fileIdList, final Result result) {
        try {
            fileService.deleteFileList(fileIdList);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * [테스트] 파일 복제
     * @param fileId
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/{fileId}/clone", method = RequestMethod.POST)
    public Result cloneFile(@PathVariable String fileId, final Result result) throws Exception {

        String newFileId = fileService.cloneFile(fileId);

        result.setSuccess(new Object[][] {
                {"oldFileId", fileId},
                {"newFileId", newFileId}
        });


        return result;
    }
}
