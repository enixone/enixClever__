$(document).ready(function () {

    currentUserinfo = null;

    // 초기화
    fnInit();
    
    
});

var treeObj;
var currentUserinfo;
var currentBoxId;
var userListTable;
var statusCode;
var userListTableOption = {
    header : ["이름","아이디","직급","역할","소속부서명","전화번호","등록일","상태"],
    data : [],
    displayMember : ["userName", "userKey","positionName","roleName", "groupName", "telNo", "createDate", "statusName"],
    colAlign : ["aLeft","aCenter","aCenter","aCenter","aCenter","aLeft","aCenter", "aCenter"],
    colGroup : ["100px","140px","100px","150px", "120px" ,"160px","100px","*"],
    orderKey : "EU.CREATE_DATE",
    orderBy : "DESC",
    statusCode : null,
    pageNo : 1,
    perPage : 10,
    keyword : null,
    searchKey : null,
    checkBox : false,
    scrolling : false,
    nowTime : "0000-00-00 00:00:00",
    scrollingHeightPad : 247,
    isPagination : true,
    tableClass : "table-list",
    paginationDiv : $("#userListPagination"),
    noDataDiv : $("#userManagementNoUserMessage"),
    callbackFunctions: {
        navigatePageCallback : fnSelectActive,fnSelectPassive,fnSelectDelete,
		rowDoubleClickCallback : evtUserListRowClick,
		orderChangedCallback : fnSelectActive,fnSelectPassive,fnSelectDelete
       	
    }
};



/**
 * 초기화
 */
function fnInit() {
	// 테이블 초기화
    userListTable = $("#userListTable").enixTable(userListTableOption);
    
    fnSelectActive();
  
}


/**
 * 부서 사용자 목록 조회
 * @param groupId
 */
var _param = null;
function fnSelectActive() {
	
	_param = userListTable.getPagination();
    _param.statusCode = "ACTIVE";
    _param.keyword = userListTableOption.keyword;
    _param.searchKey = userListTableOption.searchKey;
    
	// 선택된 사용자 목록
    enixClever.api.user.selectUserList(_param.statusCode, _param, function (res) {
   
        userListTable.setNowTime(res.now);
        userListTable.setData(res.data.userList);
        userListTable.setPagination(res.paging);
    });
    
}

function fnSelectPassive() {
	 userListTable = $("#userListTable").enixTable(userListTableOption);
	_param = userListTable.getPagination();
    _param.statusCode = "PASSIVE";
 	_param.keyword = userListTableOption.keyword;
    _param.searchKey = userListTableOption.searchKey;
    
	// 선택된 사용자 목록
    enixClever.api.user.selectUserList(_param.statusCode, _param, function (res) {
     
        userListTable.setNowTime(res.now);
        userListTable.setData(res.data.userList);
        userListTable.setPagination(res.paging);
    });
    
    $('input[name=statusCode]').val(statusCode);
}

function fnSelectDelete() {
	 userListTable = $("#userListTable").enixTable(userListTableOption);
	_param = userListTable.getPagination();
    _param.statusCode = "DELETED";
    _param.keyword = userListTableOption.keyword;
    _param.searchKey = userListTableOption.searchKey;

	// 선택된 사용자 목록
    enixClever.api.user.selectUserList(_param.statusCode, _param, function (res) {
        
        userListTable.setNowTime(res.now);
        userListTable.setData(res.data.userList);
        userListTable.setPagination(res.paging);
    });
    
    $('input[name=statusCode]').val(statusCode);
}


function fnSearchUserList(searchKey, keyword) {
	console.log(keyword);
	
	userListTableOption.searchkey = searchKey;
	userListTableOption.keyword = keyword;
	userListTableOption.pageNo = 1;
	
	fnSelectActive();
}

function evtSearchList(keyCode, evtValue) {
console.log(evtValue);
	if (keyCode == 13) {
		if(evtValue.length < 2){
			return alert("검색어는 두글자 이상 입력해야 합니다.");
		}
	
		fnSearchUserList("userName", evtValue);
	} 
	return;
}
	


/**
 * 유저 목록 클릭
 * @param userInfo
 */
function evtUserListRowClick(userInfo) {
	currentUserinfo = userInfo;
	
	
	enixClever.modal.load(
	    constants.url.userDetail,
	    currentUserinfo.userKey,
	    null,
	    "md-small"
    )
   
}

/**
 * [팝업] 사용자 등록
 */
function evtCreateUserPopup() {
	
	enixClever.modal.load(
        constants.url.userCreate,
        null,
        null,
        "md-midium"
    )
}


//이름 클릭시 팝업
function evtUserNameClick(userKey) {
	
	enixClever.modal.load(
		constants.url.userDetail,
		userKey,
		null,
		"md-small"
	)
	
}


