$(document).ready(function () {


    // 초기화
    fnInit();
    
});

var currentPermissionInfo;
var permissionTable;
var permissionListTable;
var tableOption = {
    header : ["명칭", "소유자", "시스템 권한" ],
    data : [],
    displayMember : ["permissionName", "ownerName", "isSystem"],
    colAlign : ["aLeft", "aCenter","aCenter"],
    colGroup : ["120px","50px","5px"],
    checkboxMember: ["isSystem"],
    orderKey : "PERMISSION_NAME",
    orderBy : "ASC",
    pageNo : 1,
    perPage : 10,
    // checkBox : true,
    checkBox : false,
    editBtn : false,
    clickFirstRow : true,
    isPagination : true,
    tableClass : "table-list",
    paginationDiv : $("#permissionListPagination"),
    noDataDiv : $("#permissionManagementNoDocMessage"),
    callbackFunctions: {
        navigatePageCallback : fnSelectPermissionList,
        rowClickCallback: evtPermissionListRowClick
    }
}
var permissionDetailForm;
var accessorTable;
var accessorTableOption = {
	displayMember : ["targetName","listView", "read","update", "delete","download", "edit", "print"],
    colGroup : ["20px", "*", "20px", "20px", "20px", "20px", "20px", "20px","20px"],
    colAlign : ["aLeft","aCenter","aCenter","aCenter","aCenter","aCenter","aCenter","aCenter"],
    noDataDiv : "form[name=permissionDetailForm] div[name=noDataMessage]",
    readonly : true
}
	

/**
 * 초기화
 */
function fnInit() {

    // 권한 목록 테이블 초기화
    permissionTable = $("#permissionListTable").enixTable(tableOption);

    // 권한 상세 폼 초기화
    permissionDetailForm = $("form[name=permissionDetailForm]").enixForms();

    // 권한 할당자 목록 테이블 초기화
   accessorTable = $("form[name=permissionDetailForm] table[name=accessorListTable]").enixAccessorList(accessorTableOption)
	


   
    // 권한 목록 조회
    fnSelectPermissionList();
    
}

/**
 * 권한 목록 조회
 */
function fnSelectPermissionList() {
    var _param = permissionTable.getPagination();

    enixClever.api.permission.selectPermissionList(_param, function (res) {
        permissionTable.setData(res.data.permissionList);
        permissionTable.setPagination(res.paging);
        

        
    });
}


/**
 * [리스트] 권한 선택
 */
function evtPermissionListRowClick(data) {
    currentPermissionInfo = data;

    // 권한 상세 조회
    fnSelectPermissionDetail();
}

/**
 * [상세] 현재 선택된 권한의 상세 정보를 조회한다
 */
function fnSelectPermissionDetail() {
    enixClever.api.permission.selectPermissionInfo(currentPermissionInfo.permissionId, function (res) {
        
        
        permissionDetailForm.binding(res.data.permissionInfo);
        
        
        accessorTable.setData(res.data.permissionInfo.accessorList);
        
  
    });
}

/**
 * [버튼] 권한 등록 팝업
 */
function evtCreatePermissionPopup() {
    enixClever.modal.load(
        constants.url.permissionCreate,
        null,
        null,
        "md-HLarge"
    );
}

/**
 * [버튼] 권한 수정 팝업
 */
function evtModifyPermissionPopup() {
    enixClever.modal.load(
        constants.url.permissionModify,
        currentPermissionInfo.permissionId,
        null,
        "md-HLarge"
    );
}

/**
 * [버튼] 권한 삭제
 */
function evtDeletePermissionPopup() {
    enixClever.alert.confirm("권한 삭제 확인", "'{0}'권한을 삭제할까요?".format(currentPermissionInfo.permissionName), function() {
        enixClever.api.permission.deletePermission(currentPermissionInfo.permissionId, function(res) {
            enixClever.alert.success("'{0}'권한을 삭제했습니다".format(currentPermissionInfo.permissionName));
            fnSelectPermissionList();
        });
    });
}

function testAccessorPopup() {
    enixClever.modal.load(
        constants.url.selectAccessor,
        null,
        testAccessorRecieve,
        true
    );
}

function testAccessorRecieve(list) {

}

function testGroupPopup() {
    enixClever.modal.load(
        constants.url.selectGroup,
        null,
        testGroupRecieve
    );
}

function testGroupRecieve(info) {
}


function testFolderPopup() {
    // boxId : BOX_PRIVATE, BOX_GROUP, BOX_GLOBAL_GROUP, BOX_COWORK

    enixClever.modal.load(
        constants.url.selectFolder,
        {
            boxId : "BOX_GROUP"
        },
        testGroupRecieve
    );
}

function testFolderRecieve(info) {
}

function testPermissionPopup() {
    enixClever.modal.load(
        constants.url.selectPermission,
        null,
        function (permissionInfo) {
        }
    );
}