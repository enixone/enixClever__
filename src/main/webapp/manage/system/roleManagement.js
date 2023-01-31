	$(document).ready(function () {

	
    // 초기화
    fnInit();
    
	
});

var currentRoleInfo;
var roleListTable;
var tableOption = {
    header : ["명칭", "생성자", "생성일"],
    data : [],
    displayMember : ["roleName", "creatorName", "createDate"],
    colAlign : ["aLeft", "aCenter","aCenter"],
    colGroup : ["200px","100px","*"],
    orderKey : "ROLE_NAME",
    orderBy : "ASC",
    pageNo : 1,
    perPage : 10,
    // checkBox : true,
    checkBox : false,
    nowTime : "0000-00-00 00:00:00",
    editBtn : false,
    clickFirstRow : true,
    isPagination : true,
    tableClass : "table-list",
    paginationDiv : $("#roleListPagination"),
    noDataDiv : "문서를 가져오는 중입니다.",
    noDataMessage : "문서가 없습니다.",
    callbackFunctions: {
        navigatePageCallback : fnSelectRoleList,
        rowClickCallback: evtRoleListRowClick
    }
}
var roleDetailForm;
var roleItemTable;

/**
 * 초기화
 */
function fnInit() {

    // 역할 목록 테이블 초기화
    roleListTable = $("#roleListTable").enixTable(tableOption);

    // 역할 상세 폼 초기화
    roleDetailForm = $("form[name=roleDetailForm]").enixForms();


    // 대상자 목록 플러그인 초기화
	roleItemTable = $("form[name=roleDetailForm] table[name=roleItemTable]")
	        .enixTable({
	            colGroup : ["*"],
	            colAlign : ["aCenter"],
	   });
	     
    // 역할 목록 조회
    fnSelectRoleList();
   
}

/**
 * 권한 목록 조회
 */
function fnSelectRoleList() {

    var _param = roleListTable.getPagination();

    enixClever.api.role.selectRoleListPage(_param, function (res) {
        roleListTable.setNowTime(res.now);
		roleListTable.setData(res.data.roleList);
        roleListTable.setPagination(res.paging);
    });
}

/**
 * [리스트] 권한 선택
 */
function evtRoleListRowClick(data) {
    currentRoleInfo = data;

    // 역할 상세 조회
    fnSelectRoleDetail();
}

/**
 * [상세] 현재 선택된 역할의 상세 정보를 조회한다
 */
function fnSelectRoleDetail() {
    enixClever.api.role.selectRoleInfo(currentRoleInfo.roleId, function (res) {
        roleDetailForm.binding(res.data.roleInfo);
        var arr = [res.data.roleInfo];


        roleItemTable.setRoleData(arr);
    });
}

/**
 * [버튼] 역할 등록 팝업
 */
function evtCreateRolePopup() {
	
    enixClever.modal.load(
        constants.url.roleCreate,
        null,
        null,
        "md-XXsmall"
    );
}

/**
 * [버튼] 역할 수정 팝업
 */
function evtModifyRolePopup() {
    enixClever.modal.load(
        constants.url.roleModify,
        currentRoleInfo.roleId,
        fnSelectRoleList,
        "md-XXsmall"
    );

}

/**
 * [버튼] 역할 삭제
 */
function evtDeleteRolePopup() {
    enixClever.alert.confirm("역할 삭제 확인", 
    						"'{0}'역할을 삭제할까요?".format(currentRoleInfo.roleName), 
    						function() {
        						enixClever.api.role.deleteRole(currentRoleInfo.roleId, function(res) {
								enixClever.alert.success("'{0}'역할을 삭제했습니다".format(currentRoleInfo.roleName));
           						fnSelectRoleList();
        						});
    						});

}