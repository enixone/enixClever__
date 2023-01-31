$(function() {


});

/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */

function initModal() {
    var userKey = arguments[0];
    _userDetail.successCallback = arguments[1];
	_userDetail.form = $("form[name=userDetailForm]").enixForms(_userDetail.form);
	  
	enixClever.api.user.selectUserInfo(userKey, function(res2) {
    	_userDetail.form.binding(res2.data.userInfo);
      	document.userDetailForm.userName.value = res2.data.userInfo.userName +" "+ res2.data.userInfo.positionName;
            
	typeCode(res2.data.userInfo.statusCode);
	})
	
}

var _userDetail = {
    form : null,
    successCallback : null,
    /**
     * 모달 서밋
     */
     
    evtSubmitClick : function () {
		enixClever.modal.close();

    },
    /**
     * 모달 종료
     */
    evtCancelClick : function () {
        enixClever.modal.close();
    }
}

/**
 * [팝업] 사용자 정보 수정
 */
 
function evtModifyUserPopup() {
	
	var targetId = document.getElementById("userKey");
	
	enixClever.modal.load(
	   	constants.url.userModify,
	    targetId.innerText,
	    null,
	    "md-midium"  
	)
}

/**
 * [팝업] 사용자 삭제
 */
function evtDeleteUserPopup() {

	var targetId = document.getElementById("userKey");
	
	enixClever.api.user.deleteUser(targetId.innerText, function(res) {
		//fnSelectUserList();
	});		
	
	enixClever.alert.success("사용자를 삭제하였습니다.");
}

/* 복원, 승인 */ 
function approval() {

	var targetId = document.getElementById("userKey");
	var isonId = { userKey : targetId.innerText}
	
	enixClever.api.user.approvalUser(isonId, function(res) {
		
	});
		
	enixClever.alert.success("사용자를 정상 등록하였습니다.");
}

/* 코드 변경 */
function typeCode(statusCode) {

	
	if (statusCode == 'ACTIVE') {
		$('.btn_Modify').css('display','inline-block');
		$('.btn_Delete').css('display','inline-block');
			
	}else if (statusCode == 'PASSIVE') {
		$('.btn_approval').css('display','inline-block');
		$('.btn_Delete').css('display','inline-block');
	}else {
		$('.btn_Restore').css('display','inline-block');
		$('.btn_Modify').css('display','inline-block');
	}
}