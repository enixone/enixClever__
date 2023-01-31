$(function() {

});

/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
 

 
function initModal() {
    var data = arguments[0];
 	_userCreate.createForm =  $("form[name=userCreateForm]").enixForms(_userCreate.validOption);
	
	groupNameAutocomplete();
	roleNameAutocomplete();
	
	enixClever.api.role.selectRoleList(function (res) {
        selectHandller.appendOptionList("form[name=userCreateForm] select[name=roleId]",res.data.roleList,"roleName", "roleId",  null, null,"역할을");  
    });
	 enixClever.api.code.selectPosition(function (res) {
        selectHandller.appendOptionList("form[name=userCreateForm] select[name=positionId]",res.data.selectPosition,"codeName", "code", null, null,"직급을");  
    });
    
}

var _userCreate = {
    createForm : null,
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
                maxLength : 7
            }
        },
        groupName : {
			required : true
		},
		positionId : {
			required : true
		},
		roleId : {
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
    evtSubmitClick : function() {
      
		 if (!_userCreate.createForm.validate()) {
		
            return;
        } 
		
        let data = this.createForm.toJson();
        
        enixClever.api.user.insertUser(
			data, 
			function(res) {
	            enixClever.alert.success("유저 등록 완료");
	            fnSelectActive();
	            enixClever.modal.close();
	
	            if (typeof _userCreate.successCallback == "function") {
	                _userCreate.successCallback();
	            }
			}
        );

    },
    /**
     * 모달 종료
     */
     
    evtCancelClick : function () {
        enixClever.modal.close();
    }
	
}

//ID 유효성 검사
function Idvalidation() {
	// 선택된 사용자 목록
	let result = true;
    enixClever.api.user.selectUserInfo(userCreateForm.userKey.value, function (res) {
		if(res.data.userInfo !== null)	 {
			alert("중복 된 아이디입니다.");
			result = false;
		}
    });
    
    return result;
}


var userPass = document.getElementById("userPass");
var userPassConfirm = document.getElementById("userPassConfirm");

