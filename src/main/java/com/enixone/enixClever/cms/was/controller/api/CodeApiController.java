package com.enixone.enixClever.cms.was.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.model.CodeVO;
import com.enixone.enixClever.core.common.Result;

@RestController
@RequestMapping ("/codes")
public class CodeApiController extends BaseController {

	@RequestMapping(value = "/position", method = RequestMethod.GET)
    public Result selectPosition(final Result result) {
        try {

            List<CodeVO> selectPosition = codeService.selectPosition();

            result.setSuccess(new Object[][] {
                    {"selectPosition", selectPosition}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }
   
}
