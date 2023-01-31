package com.enixone.enixClever.cms.was.controller.api;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.FolderVO;
import com.enixone.enixClever.cms.was.model.PermissionVO;
import com.enixone.enixClever.cms.was.model.UserVO;
import com.enixone.enixClever.core.common.Result;

@RestController
@RequestMapping ("/users")
public class UserApiController extends BaseController {
	
	/**
     * 사용자 목록 조회
     * @param result
     * @return
     */
	   @RequestMapping(value = "/status/{statusCode}", method = RequestMethod.GET)
	    public Result selectUserList(@PathVariable String statusCode,@ModelAttribute PaginationVO paging, final Result result,Model model) {
	        try {
	        	
	        	
	        	logger.debug("log test -  ------------------------------------------------------------");
	        	
	        	System.out.println(logger.getName());
	        	
	        	List<UserVO> userList = userService.selectUserList(paging, statusCode);
	        
	            result.setPageInfo(userList);
	            result.setSuccess(new Object[][] {
	                    {"userList", userList} 
	            });
	            
	           

	        } catch (Exception e) {
	            result.setError(e.getMessage());
	        }
	        

	        
	        return result;
	    }
    
    /**
     * 사용자 목록 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "/searchUserList", method = RequestMethod.GET)
    public Result searchUserList(@RequestParam("userName") String userName, final Result result) {
        try {
        	
        	logger.debug("keyword>>>>>>>"+userName);
        	
        	List<UserVO> userList = userService.searchUserList(userName);
        	result.setSuccess(new Object[][] {
                    {"userList", userList} 
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        
        return result;
    }
	
    /* 그룹 구성원 조회 */
    @RequestMapping(value = "/{groupId}/member", method = RequestMethod.GET)
    public Result selectgroupMember(@PathVariable String groupId,@ModelAttribute PaginationVO paging, final Result result) throws Exception {
    	
    	try {
  
    		List<UserVO> userList = userService.selectgroupMember(paging, groupId);
        
            result.setPageInfo(userList);
            result.setSuccess(new Object[][] {
                    {"userList", userList} 
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        

        return result;
    }
    
    /* 유저 테이블 메인 검색 */
    @RequestMapping(value = "/main", method = RequestMethod.POST)
    public Result selectMainUser(@RequestBody final UserVO vo, @ModelAttribute PaginationVO paging, final Result result) throws Exception {
    	
    	
    	try {
  
    		List<UserVO> userList = userService.selectMainUser(paging, vo.getUserName());
        
            result.setPageInfo(userList);
            result.setSuccess(new Object[][] {
                    {"userList", userList} 
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        
        return result;
    }
    
    @RequestMapping(value = "/selectUser", method = RequestMethod.POST)
    public Result selectUser(@RequestBody final UserVO vo, final Result result) {
    	try {
    		
    		List<UserVO> userList = userService.selectUser(vo.getUserName());
    		result.setSuccess(new Object[][] {
    			{"userList", userList} 
    		});
    		
    	} catch (Exception e) {
    		result.setError(e.getMessage());
    	}
    	
    	return result;
    }
    

    /**
     * 사용자 정보 조회
     * @param userKey
     * @param result
     * @return
     */
    @RequestMapping(value = "/{userKey}", method = RequestMethod.GET)
    public Result selectUserInfo(@PathVariable String userKey, final Result result) {
    	
    	
    	try {
            UserVO userInfo = userService.selectUserInfo(userKey);
           
            result.setSuccess(new Object[][] {
                    {"userInfo", userInfo}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 사용자 등록
     * @param vo
     * @param result
     * @return
     */
    @RequestMapping(value = "", method = RequestMethod.POST)
    public Result insertUser(@RequestBody UserVO vo, final Result result) {
        try {
            userService.insertUser(vo);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 사용자 수정
     * @param vo
     * @param result
     * @return
     */
    @RequestMapping(value = "/{userKey}/update", method = RequestMethod.POST)
    public Result updateUser(@RequestBody UserVO vo, final Result result) {
        try {
            userService.updateUser(vo);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 사용자 상태 수정
     * @param vo
     * @param result
     * @return
     */
    @RequestMapping(value = "/{userKey}/status/{statusCode}", method = RequestMethod.PUT)
    public Result updateUserStatus(@RequestBody UserVO vo, final Result result) {
        try {
            userService.updateUserStatus(vo);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 사용자 목록 삭제
     * @param userKeyList
     * @param result
     * @return
     */
    @RequestMapping(value = "/{userKeyList}", method = RequestMethod.DELETE)
    public Result deleteUserList(@PathVariable List<String> userKeyList, final Result result) {
        try {
            userService.deleteUserList(userKeyList);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 사용자 로그인
     * @param userVO
     * @param request
     * @param result
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Result login(@RequestBody UserVO userVO, HttpServletRequest request, final Result result) {
        try {
        	
        	// 로그인 처리 후 사용자 정보를 반환받는다
            UserVO dbUserInfo = userService.loginProcess(userVO);

            // 세션에 저장한다
            request.getSession().setAttribute("loggedUser", dbUserInfo);

            // API 성공 처리 한다
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 사용자 로그아웃
     * @param request
     * @param result
     * @return
     */
    @RequestMapping (value = "/logout", method = RequestMethod.POST)
    public Result logout(final WebRequest request, final Result result) {

        try {
            request.removeAttribute("loggedUser", WebRequest.SCOPE_SESSION);
            result.setSuccess();
        } catch (Exception e) {
            result.setError(e.getMessage());
        }

        return result;
    }

    /**
     * 세션 로그인 사용자 정보 조회
     * @param result
     * @param request
     * @return
     */
    @RequestMapping (value = "/session", method = RequestMethod.GET)
    public Result selectSessionUser(final Result result, final HttpServletRequest request) {
        try {
            UserVO user = (UserVO) request.getSession().getAttribute("loggedUser");
            
            if(user == null)
            	logger.info("> Session value invalid.");
            else
            	logger.info("> Session User ID : " + user.getUserKey() + "");
            
            result.setSuccess(new Object[][] {
                    {"user", user}
            });
        } catch (Exception e) {
            result.setError(e.getMessage());
        }

        return result;
    }

    /**
     * 북마크 폴더 목록 조회
     * @param userKey
     * @param result
     * @return
     */
    @RequestMapping(value = "/{userKey}/bookmark/folders", method = RequestMethod.GET)
    public Result selectBookmarkFolderList(@PathVariable String userKey, final Result result) {
        try {
            List<FolderVO> bookmarkFolderList = folderService.selectBookmarkFolderByUserKey(userKey);
            result.setSuccess(new Object[][] {
                    {"bookmarkFolderList", bookmarkFolderList}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 사용가능한 권한 목록 조회
     * @param userKey
     * @param result
     * @return
     */
    @RequestMapping(value = "/{userKey}/availablePermission", method = RequestMethod.GET)
    public Result selectAvailablePermission(@PathVariable String userKey, final Result result) {
        try {
            List<PermissionVO> permissionList = permissionService.selectAvailablePermission(userKey);
            result.setSuccess(new Object[][] {
                    {"permissionList", permissionList}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }
    
    @RequestMapping(value = "/{userKey}/approval", method = RequestMethod.POST)
    public Result approvalUser(@RequestBody UserVO vo, final Result result) {
        try {
            userService.approvalUser(vo);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

}
