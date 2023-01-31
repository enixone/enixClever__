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
import com.enixone.enixClever.cms.was.model.UserVO;
import com.enixone.enixClever.core.common.Result;

@RestController
@RequestMapping ("/groups")
public class GroupApiController extends BaseController {

    /**
     * 부서 루트 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public Result selectRootGroupList(@RequestParam("boxId") String boxId, final Result result) throws Exception {
        List<GroupVO> rootList = groupService.selectRootGroupList(boxId);
        result.setSuccess(new Object[][] {
                {"rootList", rootList}
        });
        return result;
    }

    /**
     * 하위 그룹 목록 조회
     * @param groupId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{groupId}/child", method = RequestMethod.GET)
    public Result selectChildGroupList(@PathVariable String groupId, final Result result) throws Exception {
        List<GroupVO> folderList = groupService.selectChildGroupList(groupId);
        result.setSuccess(new Object[][] {
                {"groupList", folderList}
        });
        return result;
    }

    /**
     * 그룹 상세 목록 조회
     * @param groupId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{groupId}", method = RequestMethod.GET)
    public Result selectGroupInfo(@PathVariable String groupId, final Result result) {
        GroupVO groupInfo = groupService.selectGroupInfo(groupId);
        List<UserVO> groupUserList = userService.selectAllGroupUserList(groupId);

        result.setSuccess(new Object[][] {
                {"groupInfo", groupInfo},
                {"groupUserList", groupUserList}
        });

        return result;
    }

    /**
     * 그룹 등록
     * @param vo
     * @param result
     * @return
     */
    @RequestMapping(value = "", method = RequestMethod.POST)
    public Result insertGroup(@RequestBody GroupVO vo, final Result result) throws Exception {
        groupService.insertGroup(vo);
        result.setSuccess();

        return result;
    }

    /**
     * 그룹 수정
     * @param vo
     * @param result
     * @return
     */
    @RequestMapping(value = "/{groupId}/update", method = RequestMethod.POST)
    public Result updateGroup(@RequestBody GroupVO vo, final Result result) throws Exception {
        groupService.updateGroup(vo);
        result.setSuccess();

        return result;
    }

    /**
     * 그룹 삭제
     * @param groupId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{groupId}", method = RequestMethod.DELETE)
    public Result deleteGroup(@PathVariable String groupId, final Result result) throws Exception {
        groupService.deleteGroup(groupId);
        result.setSuccess();

        return result;
    }

    /**
     * 그룹 사용자 조회 (페이징)
     * @param groupId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{groupId}/users", method = RequestMethod.GET)
    public Result selectAllGroupUserList(@PathVariable String groupId, final Result result) throws Exception {
        List<UserVO> userList = userService.selectAllGroupUserList(groupId);
        result.setSuccess(new Object[][] {
                {"userList", userList}
        });

        return result;
    }

    /**
     * 그룹 사용자 조회 (페이징)
     * @param groupId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{groupId}/users/paging", method = RequestMethod.GET)
    public Result selectGroupUserList(@PathVariable String groupId,
                                      @ModelAttribute PaginationVO paging,
                                      final Result result) throws Exception {
        List<UserVO> userList = userService.selectGroupUserList(groupId, paging);
        result.setPageInfo(userList);
        result.setSuccess(new Object[][] {
                {"userList", userList}
        });

        return result;
    }

    /**
     * 그룹 사용자 추가
     * @param groupId
     * @param userKeyList
     * @param result
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/{groupId}/users/{userKeyList}", method = RequestMethod.POST)
    public Result insertGroupUser(@PathVariable String groupId, @PathVariable List<String> userKeyList, final Result result) throws Exception {

        groupService.insertGroupUser(groupId, userKeyList);
        result.setSuccess();
        return result;
    }
    
    /**
     * 그룹 목록 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "/searchGroupList", method = RequestMethod.GET)
    public Result searchGroupList(@RequestParam("keyword") String keyword, final Result result) throws Exception {
    	
    	logger.debug("keyword>>>>>>>"+keyword);
    	
    	List<GroupVO> groupList = groupService.searchGroupList(keyword);
    	result.setSuccess(new Object[][] {
                {"groupList", groupList} 
        });

    	return result;
    }


}
