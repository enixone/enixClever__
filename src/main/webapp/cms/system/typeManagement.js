$(document).ready(function () {


    // 초기화
    fnInit();
});

var currentTypeInfo;
var typeListTable;
var typeItemListTable;
var tableOption = {
    header : [ "아이디", "명칭", "기본 여부"],
    data : [],
    displayMember : [ "typeId", "typeName", "isBaseType"],
    checkboxMember: ["isBaseType"],
    colAlign : ["aLeft", "aLeft","aCenter"],
    colGroup : ["120px","120px","60px"],
    orderKey : "TYPE_NAME",
    orderBy : "ASC",
    pageNo : 1,
    perPage : 20,
    checkBox : false,
    editBtn : false,
    clickFirstRow : true,
    isPagination : true,
    tableClass : "table-list table-line",
    paginationDiv : $("#typeListPagination"),
    noDataDiv : $("#typeManagementNoDocMessage"),
    callbackFunctions: {
        navigatePageCallback : fnSelectTypeList,
        rowClickCallback: evtTypeListRowClick
    }
}
var typeItemtableOption = {
    header : [ "항목 아이디","항목 명", "정렬 순서"],
    data : [],
    displayMember : ["itemId","itemName", "sortNo"],
    colAlign : ["aLeft", "aLeft","aLeft"],
    colGroup : ["240px","240px","240px"],
    tableClass : "table-list",
    checkBox : false,
    editBtn : false,
    noDataDiv : $("#noTypeItemMessage"),
}
var typeDetailForm;

/**
 * 초기화
 */
function fnInit() {

    // 유형 목록 테이블 초기화
    typeListTable = $("#typeListTable").enixTable(tableOption);
    
    // 속성 목록 테이블 초기화
    typeItemListTable = $("#typeItemTable").enixTable(typeItemtableOption);

    // 유형 상세 폼 초기화
    typeDetailForm = $("form[name=typeDetailForm]").enixForms();

    // 유형 목록 조회
    fnSelectTypeList();
}

/**
 * 유형 목록 조회
 */
function fnSelectTypeList() {

    var _param = typeListTable.getPagination();

    enixClever.api.type.selectTypeListPage(_param, function (res) {
        typeListTable.setData(res.data.typeList);
        typeListTable.setPagination(res.paging);
    });
}

/**
 * [리스트] 유형 선택
 */
function evtTypeListRowClick(data) {
    currentTypeInfo = data;

    // 역할 상세 조회
    fnSelectTypeDetail();
}


/**
 * [상세] 현재 선택된 유형의 상세 정보를 조회한다
 */
function fnSelectTypeDetail() {
    enixClever.api.type.selectTypeInfo(currentTypeInfo.typeId, function (res) {
        typeDetailForm.binding(res.data.typeInfo);
		
        typeItemListTable.setData(res.data.typeInfo.typeItemList);
    });
}

/**
 * [버튼] 유형 등록 팝업
 */
function evtCreateTypePopup() {
    enixClever.modal.load(
        constants.url.typeCreate,
        null,
        fnSelectTypeList
    );
}

/**
 * [버튼] 유형 수정 팝업
 */
function evtModifyTypePopup() {

    enixClever.modal.load(
        constants.url.typeModify,
        currentTypeInfo.typeId,
        fnSelectTypeList
    );	
}

/**
 * [버튼] 유형 삭제
 */
function evtDeleteTypePopup() {
    enixClever.alert.confirm("문서 유형 삭제 확인", "'{0}'을 삭제할까요?".format(currentTypeInfo.typeName), function() {
        enixClever.api.type.deleteType(currentTypeInfo.typeId, function(res) {
            enixClever.alert.success("'{0}'을 삭제했습니다".format(currentTypeInfo.typeName));
            fnSelectTypeList();
        });
    });

}
