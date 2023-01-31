$(function() {

});

/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
 

 
function initModal() {
    var data = arguments[0];
	
	groupNameAutocomplete();
	roleNameAutocomplete();
	
    _userCreate.successCallback = arguments[1];
    _userCreate.createForm = $("form[name=userCreateForm]").enixForms(_userCreate.validOption);
    _userCreate.createForm.binding(data);
    
}

var _userCreate = {
    createForm : null,
    validOption : {
        displayError : true,
        userKey : {
            required : true,
            numericOnly : true,
            length : {
                maxLength : 20
            }
        },
        userName : {
            required : true
        },
        userName : {
            required : true
        },
        email : {
            required : true
        },
        userPassConfirm : {
            required : true,
            compare : {
                targetName : "userPass"
            },
            length : {
                minLength : 2,
                maxLength : 20
            }
        }
    },
    successCallback : null,

    /**
     * 모달 서밋
     */
    evtSubmitClick : function () {
        
      // ID 유효성 검증
    if (!_userCreate.createForm.validate()) {
		return;
	} 
	
        let data = this.createForm.toJson();

        enixClever.api.user.insertUser(data, function (res) {
            enixClever.alert.success("유저 등록 완료");
            enixClever.modal.close();

            if (typeof _userCreate.successCallback == "function") {
                _userCreate.successCallback();
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

function validation() {
	
	//ID 유효성 검사
	if(!checkUserKey(userCreateForm.userKey.value)){
		
		return false;
		
	}else {
		// 선택된 사용자 목록
	    enixClever.api.user.selectUserInfo(userCreateForm.userKey.value, function (res) {
	       if(res.userInfo.userKey != null)	 {
				
				enixClever.alert.info("중복 된 아이디입니다.");	
				
				return false;
			}
			
        });
		
		//validationCheck();
	}
	
	return true;

}

/* return false시 함수가 끝나야 정상인데 계속 발동되어 안쪽으로 처리 */
function validationCheck() {
	
	
	
	//성명 유효성 검사
	if (checkExistData(userCreateForm.userName.value, "성명을")) {
		if (userCreateForm.userName.value.length < 2) return false;
	}
	
	
	
	
		

		else if (checkExistData(userCreateForm.groupName.value, "부서를")) {
			if (userCreateForm.groupName == null) return false;

			else if (checkExistData(userCreateForm.roleName.value, "직책을")) {
				if (userCreateForm.roleName == null) return false;

				else if (checkExistData(userCreateForm.email.value, "이메일을")) {
					if (userCreateForm.email == null) return false;

					else if (!checkUserPass(userCreateForm.userPass.value)) {
						return false;
					}
				}
			}
		}
	
	
}

var userPass = document.getElementById("userPass");
var userPassConfirm = document.getElementById("userPassConfirm");

function validatePassword() {
	if(userPass.value != userPassConfirm.value) {
		
		userPassConfirm.setCustomValidity("비밀번호가 일치하지 않습니다.");
	
	}else {
		
		userPassConfirm.setCustomValidity("");
	}
}

function checkExistData(value, dataName) {  
   
	if (value == "") {
			alert(dataName + " 입력해주세요!");
		return false;
	}
	return true;
}

function checkUserKey(id) {        
	//Id가 입력되었는지 확인하기        
	if (!checkExistData(id, "아이디를"))
		
		return false;
		
	var idRegExp = /^[a-zA-z0-9]{1,12}$/; //아이디 유효성 검사        
	
	if (!idRegExp.test(id)) {
		enixClever.alert.info("아이디는 영문 대소문자와 숫자 4~12자리로 입력해야합니다.");
		userCreateForm.userKey.value = "";
		userCreateForm.userKey.focus();
		
		return false;
	}
	return true; //확인이 완료되었을 때    
}

function checkUserPass(userPass) {
	//비밀번호 입력되었는지 확인
	if(!checkExistData(userPass, "비밀번호를"))
	
		return false;
	
	var passRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;	
	
	if(!passRegExp.test(userPass)) {
		enixClever.alert.info("비밀번호는 최소 8자, 최소 하나의 문자 및 하나의 숫자를 입력해야합니다.");
		userCreateForm.userPass.value = "";
		userCreateForm.userPass.focus();
		
		return false;
	}
	return false;

}
