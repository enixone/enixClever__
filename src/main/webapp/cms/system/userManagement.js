$(document).ready(function () {
    currentUserinfo = null;
    // 초기화
    fnInit();
    evtActBtn();
    fnSelectUserList('PASSIVE');
});

var treeObj;
var currentUserinfo;
var currentBoxId;
var userListTable;
var userListTableOption = {
    header : ["아이디", "사용자명", "직책(역할)", "소속부서명", "이메일", "수정일시", "등록일시", "상태"],
    data : [],
    displayMember : ["userKey", "userName", "roleName", "groupName", "email", "updateDate", "createDate", "statusName"],
    colAlign : ["aCenter", "aCenter","aLeft","aLeft","aLeft","aCenter","aCenter","aCenter","aCenter"],
    colGroup : ["50px","200px","220px","300px","*", "200px" ,"200px","200px","120px"],
    orderKey : "EU.CREATE_DATE",
    orderBy : "ASC",
    pageNo : 1,
    perPage : 20,
    checkBox : true,
    scrolling : false,
    scrollingHeightPad : 247,
    isPagination : true,
    tableClass : "table-list",
    paginationDiv : $("#userListPagination"),
    noDataDiv : "",
    noDataMessage : "해당 사용자가 없습니다.",
    callbackFunctions: {
        navigatePageCallback : fnSelectUserList,
        rowClickCallback: evtUserListRowClick
	}
};






/**
 * 초기화
 */
function fnInit() {
	// 테이블 초기화
    userListTable = $("#userListTable").enixTable(userListTableOption);
}


/**
 * 부서 사용자 목록 조회
 * @param groupId
 */
function fnSelectUserList(statusCode) {


    var _param = userListTable.getPagination();
    	_param.statusCode = statusCode;

	// 선택된 사용자 목록
    enixClever.api.user.selectUserList(statusCode, _param, function (res) {
        userListTable.setData(res.data.userList);
        userListTable.setPagination(res.paging);
    });
}

/**
 * 유저 목록 클릭
 * @param userInfo
 */
function evtUserListRowClick(userInfo) {
	currentUserinfo = userInfo;
}


/**
 * [팝업] 사용자 등록
 */
function evtCreateUserPopup() {
	
	enixClever.modal.load(
        constants.url.userCreate,
        null,
        null
    )
}

/**
 * [팝업] 사용자 수정
 */
function evtModifyUserPopup() {
    
    var list = userListTable.getCheckedList();
	
	if (list.length == 0) {
        enixClever.alert.warn("확인바랍니다.","선택 된 사용자가 없습니다");
        return;
    }
   
    enixClever.modal.load(
	
        constants.url.userModify,
        currentUserinfo.userKey,
        fnSelectUserList
        
        
    )
}

/**
 * [팝업] 사용자 삭제
 */
function evtDeleteUserPopup() {

	var list = userListTable.getCheckedList();
	
	if (list.length == 0) {
        enixClever.alert.warn("확인바랍니다.","선택 된 사용자가 없습니다");
        return;
    }
    
   	enixClever.api.user.deleteUser(list[0].userKey, function(res) {
        enixClever.alert.success("'{0}'사용자를 삭제했습니다".format(list[0].userName));
        fnSelectUserList();
        
        
        
    });
}


/* 복원 */
function restore() {
	
	var list = userListTable.getCheckedList();
	
	if (list.length == 0) {
        enixClever.alert.warn("확인바랍니다.","선택 된 사용자가 없습니다");
        return;  
    }
   
    
    
   	enixClever.api.user.restoreUser(currentUserinfo, function(res) {
            enixClever.alert.success("'{0}'사용자를 복원했습니다".format(currentUserinfo.userName));
            
            fnSelectUserList();
	});

}
/* 복원 삭제 승인 버튼 */
function evtActBtn() {
	$("#btn_Delete").show();{
		$("#btn_Recognition").hide();
		$("#btn_Restore").hide();
	}
	
}
function evtPasBtn() {
	$("#btn_Recognition").show();{
		$("#btn_Delete").show();
		$("#btn_Restore").hide();
	}
}function evtDelBtn() {
	$("#btn_Restore").show();{
		$("#btn_Delete").hide();
		$("#btn_Recognition").hide();
	}
}