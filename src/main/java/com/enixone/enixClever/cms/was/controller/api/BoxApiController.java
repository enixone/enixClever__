package com.enixone.enixClever.cms.was.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.model.BoxVO;
import com.enixone.enixClever.core.common.Result;

@RestController
@RequestMapping ("/box")
public class BoxApiController extends BaseController {
    /**
     * 문서의 첨부파일 목록 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public Result selectBoxList(final Result result) {
        try {
            List<BoxVO> boxList = boxService.selectBoxList();

            result.setSuccess(new Object[][] {
                    {"boxList", boxList}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

}
