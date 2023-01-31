package com.enixone.enixClever.cms.was.service;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.UserVO;
import com.enixone.enixClever.cms.was.utils.AesUtil;
import com.enixone.enixClever.cms.was.utils.ShaUtil;
import com.enixone.enixClever.core.common.GenerateKey;
import com.enixone.enixClever.core.exceptions.EnixCleverException;

@Service
public class UserService extends BaseService {

    public List<UserVO> selectUserList(PaginationVO paging, String statusCode) {
    	return userDao.selectUserList(paging, statusCode);
    } 

    public List<UserVO> selectUserListByUserName(String userKey, String userName) {
    	return userDao.selectUserListByUserName(userKey, userName);
    }
    
    public List<UserVO> searchUserList(String userName) {
    	return userDao.searchUserListByUserName(userName);
    }
    
    public List<UserVO> selectMainUser(PaginationVO paging,String userName) {
    	return userDao.selectMainUser (userName, paging);
    }
    
    public List<UserVO> selectgroupMember(PaginationVO paging, String groupId) {
    	return userDao.selectgroupMember(groupId, paging);
    }
    
    public List<UserVO> selectAllGroupUserList(String groupId) {
        return userDao.selectAllGroupUserList(groupId);
    }
    public List<UserVO> selectGroupUserList(String groupId, PaginationVO paging) {
        return userDao.selectGroupUserList(groupId, paging);
    }

    public List<UserVO> selectUser(String userName) {
    	return userDao.searchUserListByUserName(userName);
    }
    
    public UserVO selectUserInfo(String userKey) {
    	return userDao.selectUserInfo(userKey);
    }

    public int insertUser(UserVO vo) {
        
    	// 기존 사용자가 존재하는지 체크한다
        UserVO dbUserInfo = userDao.selectUserInfo(vo.getUserKey());

        if (dbUserInfo != null) throw new EnixCleverException("아이디가 이미 사용중입니다.");

        
        GenerateKey genKey = GenerateKey.getInstance();
    	vo.setUserId(genKey.getKey("11"));
        
        // 부서 맵핑 등록
        groupDao.insertAssignDept(vo.getUserKey(), vo.getGroupId(), "Y");

        // 사용자 SALT값을 생성하고 비밀번호를 암호화 한다
        String salt = ShaUtil.generateSalt();

        vo.setUserPass(ShaUtil.getEncrypt(vo.getUserPass(), salt));
        vo.setSalt(salt);

        return userDao.insertUser(vo);
    }

    public int updateUser(UserVO vo) {


        if (!StringUtils.isBlank(vo.getUserPass())) {
            // 사용자 비밀번호 암호화를 위해 DB 정보 조회
            UserVO dbUserInfo = userDao.selectUserInfo(vo.getUserKey());
            String userPass = ShaUtil.getEncrypt(vo.getUserPass(), dbUserInfo.getSalt());

            vo.setUserPass(userPass);
        }

        return userDao.updateUser(vo);
    }

    public int updateUserStatus(UserVO vo) {
        return userDao.updateUserStatus(vo.getStatusCode(), vo.getUserKey());
    }

    public int deleteUserList(List<String> userKeyList) {
        return userDao.deleteUserList(userKeyList);
    }

    public UserVO loginProcess(UserVO user) throws Exception {
    	
    	
    	UserVO dbUserInfo = null;

        // 구간 암호화 시 사용함
        AesUtil aesUtil = new AesUtil();
        
        dbUserInfo = userDao.selectUserInfo(user.getUserKey());
        
        if (dbUserInfo == null) {
            throw new Exception ("없는 사용자입니다");
        }
        
        // 사용자가 입력한 비밀번호 암호화
        String encryptPassword = ShaUtil.getEncrypt(user.getUserPass(), dbUserInfo.getSalt());
        
        if (!StringUtils.equals(dbUserInfo.getUserPass(), encryptPassword)) {
            throw new Exception ("비밀번호가 일치하지 않습니다");
        }
        
        //비교 검증 후 암호와 Salt값을 초기화 한다. 
        dbUserInfo.setUserPass(null);
        dbUserInfo.setSalt(null);
        

        // 히스토리 적재

        // 마지막 로그인 시간 적재

        // 기타 등등 로직

        return dbUserInfo;

    }
    
    
    public int approvalUser(UserVO vo) {
        return userDao.approvalUser(vo);
    }
    

}
