package com.enixone.enixClever.cms.was.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.model.FolderVO;
import com.enixone.enixClever.cms.was.model.GroupVO;
import com.enixone.enixClever.cms.was.model.PermissionVO;
import com.enixone.enixClever.cms.was.model.RoleVO;
import com.enixone.enixClever.cms.was.model.UserVO;
import com.google.gson.Gson;

@RestController
@RequestMapping("/autocomplete")
public class AutocompleteApiController extends BaseController {

    /**
	 * 폴더목록 가져오기
	 * @param userKey 사용자 ID
	 * @param boxId 폴더 구분
	 * @param value 폴더명칭
	 * @param rtvValue
	 * @return
	 */
	@RequestMapping(value = "/folder", method = RequestMethod.GET ,produces="application/text;charset=utf8")
    public String selectFolderListByBoxId(@RequestParam String userKey,@RequestParam String boxId, @RequestParam String value, final String rtvValue) {

    	// value에 폴더명이 넘어옴
    	List<FolderVO> folderList = folderService.selectFolderListByBoxId(userKey, boxId, value);
		
    	Gson gson = new Gson();
       	return gson.toJson(folderList);
       	
    }
    
	/**
	 * 사용자명 검색
	 * @param userKey
	 * @param value
	 * @param rtvValue
	 * @return
	 */
	@RequestMapping(value = "/user", method = RequestMethod.GET ,produces="application/text;charset=utf8")
    public String selectUserListByUserName(@RequestParam String userKey,@RequestParam String value, final String rtvValue) {

    	// value에 사용자명이 넘어옴
    	List<UserVO> userList = userService.selectUserListByUserName(userKey, value);
		
    	Gson gson = new Gson();
       	return gson.toJson(userList);
       	
    }
	
	
	@RequestMapping(value = "/group", method = RequestMethod.GET ,produces="application/text;charset=utf8")
    public String selectGroupListByGroupName(@RequestParam String userKey,@RequestParam String value, final String rtvValue) {

    	// value에 사용자명이 넘어옴
    	List<GroupVO> groupList = groupService.selectGroupListByGroupName(value);
		
    	Gson gson = new Gson();
       	return gson.toJson(groupList);
       	
    }
	
	@RequestMapping(value = "/role", method = RequestMethod.GET ,produces="application/text;charset=utf8")
    public String selectRoleListByGroupName(@RequestParam String userKey,@RequestParam String value, final String rtvValue) {

    	// value에 사용자명이 넘어옴
    	List<RoleVO> roleList = roleService.selectRoleListByGroupName(value);
		
    	Gson gson = new Gson();
       	return gson.toJson(roleList);
       	
    }
	
	/**
     * ACL 가져오기
     * @param result
     * @return
     */
    @RequestMapping(value = "/permission", method = RequestMethod.GET ,produces="application/text;charset=utf8")
    public String selectPermissionListByUserKey(@RequestParam String userKey, final String rtvValue) {
    	
    		List<PermissionVO> permissionList = permissionService.selectPermissionList();
   	
    		Gson gson = new Gson();

    		return gson.toJson(permissionList);
    }
    
}
