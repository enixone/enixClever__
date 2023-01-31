$(function() {


});

/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
function initModal() {
    var userKey = arguments[0];
    
    _userModify.successCallback = arguments[1];
    _userModify.form = $("form[name=userModifyForm]").enixForms(_userModify.validOption);
    
    enixClever.api.user.selectUserInfo(userKey, function(res) {
		_userModify.form.binding(res.data.userInfo);
		
		enixClever.api.code.selectPosition(function (res1) {
			selectHandller.appendOptionList("form[name=userModifyForm] select[name=positionId]",res1.data.selectPosition,"codeName", "code", null, res.data.userInfo.positionId, "직급을");  
			  	
	    });
	    enixClever.api.role.selectRoleList(function (res2) {
	        selectHandller.appendOptionList("form[name=userModifyForm] select[name=roleId]",res2.data.roleList,"roleName", "roleId", null, res.data.userInfo.roleId, "역할을");  	
	   		
		});	

   	});
	
}


var _userModify = {
    form : null,
    validOption : {
    	displayError : true,
    	userKey : { 
        	length : {
				minLength : 4,
            	maxLength : 20
        	}	
        
    	},
	    userName : {
	        length : {
				minLength : 2,
	            maxLength : 8
	        }
	    },
	    groupName : {
			required : true
		},
		roleName : {
			required : true
		},
	    email : {
			emailaddr : true
		},
	    userPass : {
	     	userPasson : true
	    },
	    userPassConfirm : {
	        required : true,
	        compare : {
	            targetName : "userPass"
	        },
	        length : {
	            //minLength : 3,
	            maxLength : 20
	        }
	    }
	},
    successCallback : null,
    /**
     * 모달 서밋
     */
     
    evtSubmitClick : function () {
        if (!_userModify.form.validate()) {
            return;
        }

        let data = this.form.toJson();

        enixClever.api.user.updateUser(data, function(res) {
 			
            enixClever.alert.success("유저 수정 완료");
            fnSelectActive();
            enixClever.modal.close();
            enixClever.modal.close();
            

            if (typeof _userModify.successCallback == "function") {
                _userModify.successCallback();
            }
        });

    },
    /**
     * 모달 종료
     */
    evtCancelClick : function () {
        enixClever.modal.close();
    }
    

}

