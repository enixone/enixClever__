package com.enixone.enixClever.cms.was.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.PermissionVO;
import com.enixone.enixClever.core.common.Result;

@RestController
@RequestMapping ("/permissions")
public class PermissionApiController extends BaseController {

    /**
     * 권한 목록 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public Result selectPermissionList(final Result result) {
        try {

            List<PermissionVO> permissionList = permissionService.selectPermissionList();

            result.setSuccess(new Object[][] {
                    {"permissionList", permissionList}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 권한 목록 조회 (페이지)
     * @param result
     * @return
     */
    @RequestMapping(value = "/paging", method = RequestMethod.GET)
    public Result selectPermissionListPage(@ModelAttribute PaginationVO paging, final Result result) {
        try {

            List<PermissionVO> permissionList = permissionService.selectPermissionListPage(paging);

            result.setPageInfo(permissionList);
            result.setSuccess(new Object[][] {
                    {"permissionList", permissionList}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 권한 정보 조회
     * @param permissionId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{permissionId}", method = RequestMethod.GET)
    public Result selectPermissionInfo(@PathVariable String permissionId, final Result result) {
        try {
            PermissionVO permissionInfo = permissionService.selectPermissionInfo(permissionId);
            result.setSuccess(new Object[][] {
                    {"permissionInfo", permissionInfo}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 권한 등록
     * @param vo
     * @param result
     * @return
     */
    @RequestMapping(value = "", method = RequestMethod.POST)
    public Result insertPermission(@RequestBody PermissionVO vo, final Result result) {
        try {
            permissionService.insertPermission(vo);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 권한 수정
     * @param vo
     * @param result
     * @return
     */
    @RequestMapping(value = "/{permissionId}/update", method = RequestMethod.POST)
    public Result updatePermission(@RequestBody PermissionVO vo, final Result result) {
        try {
            permissionService.updatePermission(vo);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 권한 삭제
     * @param permissionId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{permissionId}", method = RequestMethod.DELETE)
    public Result deletePermission(@PathVariable String permissionId, final Result result) {
        try {
            permissionService.deletePermission(permissionId);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }


}
