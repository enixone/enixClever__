function initModal(){
	

	$("#userName").focus();

	_searchUser.dataForm = $("form[name=userForm]").enixForms();
	_searchUser.dataTable = $("div[name=selectDataDiv] table[name=dataListTable]")
        .enixTable({
			header : ["성명", "소속부서", "직책"],
            colGroup : ["120px","150px","*"],
            colAlign : ["aCenter", "aLeft","aLeft"],
            tableClass : "table-listM",
            data : [],
            displayMember : ["permissionName", "ownerName", "creatorName"],
            callbackFunctions: {
	            rowClickCallback: evtUserListRowClick,	      
	            rowDoubleClickCallback:evtRowDoubleClick,   
	        }
    });	
    
    _searchUser.successCallback = arguments[1];
	
}
var _searchUser = {
    dataTable : null,
    dataForm : null,
    successCallback : null,
    
    selectUserList : function(searhText){
        
        let data = _searchUser.dataForm.toJson();
	    
	    
	    initDataDivision();
		
	    enixClever.api.user.searchUserList(data, function (res) {
	        _searchUser.dataTable.setUserListData(res.data.userList);
		    setDataDivision(res.data.userList);
		    
	    });
    }
}

/**
 * 엔터키 입력시 검색을 수행한다. 
 */
function evtKeyUp(keyCode, evtValue) {
	if(keyCode == 13) {
		
		if(evtValue.length < 2){
			return enixClever.alert.info("검색어는 두글짜 이상 입력해야 합니다.");
		}
		_searchUser.selectUserList(evtValue);	
		
	}
	return;
}


/**
 * 엔터키 입력시 검색을 수행한다. 
 */
function evtSeachUser() {

	evtValue = $("input[name=userName]").val();
	
	if(evtValue.length < 2){
		return enixClever.alert.info("검색어는 두글짜 이상 입력해야 합니다.");
	}
	_searchUser.selectUserList(evtValue);	
	
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
    
    if(currentuserInfo ==null){
		enixClever.alert.info("선택한 사용자가 없습니다.");
		return false;
	}
	
	
	_searchUser.successCallback(currentuserInfo);
	
    enixClever.modal.close();

}


/**
 * 본인을 선택한다. 
 */
function evtChoiceMe() {
    
    
	let myInfo = {
        userKey : enixClever.user.userInfo.userKey,
        userName : enixClever.user.userInfo.userName
    };
	
	currentuserInfo = myInfo;
	
	evtSubmitClick();

}




	


/**
 * 선택된 폴더를 가져온다.
 */
function evtCancelClick() {
    enixClever.modal.close();
}

