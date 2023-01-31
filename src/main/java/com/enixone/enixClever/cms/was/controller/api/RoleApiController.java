package com.enixone.enixClever.cms.was.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.GroupVO;
import com.enixone.enixClever.cms.was.model.RoleVO;
import com.enixone.enixClever.core.common.Result;

@RestController
@RequestMapping ("/roles")
public class RoleApiController extends BaseController {

    /**
     * 역할 목록 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public Result selectRoleList(final Result result) {
        try {

            List<RoleVO> roleList = roleService.selectRoleList();

            result.setSuccess(new Object[][] {
                    {"roleList", roleList}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 역할 목록 조회 (페이징)
     * @param result
     * @return
     */
    @RequestMapping(value = "/paging", method = RequestMethod.GET)
    public Result selectRoleListPage(@ModelAttribute PaginationVO paging, final Result result) {
        try {

            List<RoleVO> roleList = roleService.selectRoleListPage(paging);
            result.setPageInfo(roleList);
            result.setSuccess(new Object[][] {
                    {"roleList", roleList}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 역할 정보 조회
     * @param roleId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{roleId}", method = RequestMethod.GET)
    public Result selectRoleInfo(@PathVariable String roleId, final Result result) {
        try {
            RoleVO roleInfo = roleService.selectRoleInfo(roleId);
            result.setSuccess(new Object[][] {
                    {"roleInfo", roleInfo}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 역할 등록
     * @param vo
     * @param result
     * @return
     */
    @RequestMapping(value = "", method = RequestMethod.POST)
    public Result insertRole(@RequestBody RoleVO vo, final Result result) {
        try {
            roleService.insertRole(vo);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 역할 수정
     * @param vo
     * @param result
     * @return
     */
    @RequestMapping(value = "/{roleId}/update", method = RequestMethod.POST)
    public Result updateRole(@RequestBody RoleVO vo, final Result result) {
        try {
            roleService.updateRole(vo);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 역할 삭제
     * @param roleId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{roleId}", method = RequestMethod.DELETE)
    public Result deletePermission(@PathVariable String roleId, final Result result) {
        try {
            roleService.deleteRole(roleId);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 역할(직책) 목록 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "/searchRoleList", method = RequestMethod.GET)
    public Result searchRoleList(@RequestParam("keyword") String keyword, final Result result) throws Exception {
    	
    	logger.debug("keyword>>>>>>>"+keyword);
    	
    	List<RoleVO> roleList = roleService.searchRoleList(keyword);
    	result.setSuccess(new Object[][] {
                {"roleList", roleList} 
        });

    	return result;
    }
}
