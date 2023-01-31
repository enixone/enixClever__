function initModal(){
	

	$("#userName").focus();
	
	tableOption = {
		parentObject : "selectUserData",
        header : ["성명", "소속부서", "직책"],
        colGroup : ["120px","150px","*"],
        colAlign : ["aCenter", "aLeft","aLeft"],
        tableClass : "table-listM",
        displayMember : ["permissionName", "ownerName", "creatorName"],
        callbackFunctions: {
            rowClickCallback: evtUserListRowClick,	      
            rowDoubleClickCallback:evtRowDoubleClick,   
        }
    };
	
	_SelectUser.dataForm = $("form[name=userForm]").enixForms();
	_SelectUser.dataTable = $("div[name=selectUserData] table[name=selectUserTable]").enixTable(tableOption);	
	
}

function evtDocListMyDocument(){
	
	

	docListTable = $("#documentListTable").enixTable(tableOption);
    $("label[for='TEXT_TITLE']").text("내가 등록한 문서");
    
}

var tableOption;

var _SelectUser = {
    dataTable : null,
    dataForm : null,
    selectUserList : function(searhText){
        
        _SelectUser.dataTable.start();
        
        let data = _SelectUser.dataForm.toJson();
	    enixClever.api.user.selectUser(data, function (res) {
	        _SelectUser.dataTable.setUserDataList(res.data.userList);
	    });
    }
}

/**
 * 엔터키 입력시 검색을 수행한다. 
 */
function evtKeyUp(keyCode, evtList) {
	if(keyCode == 13) {
		if(evtList.length < 2){
			return alert("검색어는 두글자 이상 입력해야 합니다.");
		}
		_SelectUser.selectUserList(evtList);	
		
	}
	return;
}


/**
 * 엔터키 입력시 검색을 수행한다. 
 */
function evtSelectUser() {

	evtValue = $("form[name=userForm] input[name=userName]").val();
	
	if(evtValue.length < 2){
		return alert("검색어는 두글자 이상 입력해야 합니다.");
	}
	_SelectUser.selectUserList(evtValue);	
	
	return;
}



var currentuserInfo = null;
function evtUserListRowClick(userInfo) {
	currentuserInfo = userInfo;
}

function evtRowDoubleClick(userInfo) {
	currentuserInfo = userInfo;
	evtSubmitClick();
}

/**
 * 확인시 선택한 사용자를 가져온다.
 */
function evtSubmitClick() {
    
    if(currentuserInfo == null){
		alert("선택한 사용자가 없습니다.");
		return false;
	}
	
	var formName = document.forms[1].name;
	
	if (formName == 'permissionCreateForm') {
    document.permissionCreateForm.ownerId.value = currentuserInfo.userKey;
    document.permissionCreateForm.ownerName.value = currentuserInfo.userName + "(/"+currentuserInfo.positionName+")";
   	
   	} else {
	document.permissionModifyForm.ownerId.value = currentuserInfo.userKey;
	console.log(currentuserInfo.userKey);
    document.permissionModifyForm.ownerName.value = currentuserInfo.userName + "(/"+currentuserInfo.positionName+")";
   		
	}
    
    enixClever.modal.close();

}

/**
 * 선택된 폴더를 가져온다.
 */
function evtCancelClick() {
    enixClever.modal.close();
}

