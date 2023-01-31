$(document).ready(function () {
    currentDocInfo = null;

    tableOption = {
        header : ["문서 제목", "상태", "버전", "첨부", "등록자", "등록 일자"],
        data : [],
        displayMember : ["docName", "statusCodeName", "version", "fileCount", "creatorName", "createDate"],
        colAlign : ["aLeft", "aLeft","aLeft","aCenter","aLeft","aCenter"],
    	colGroup : ["50px","200px","220px","300px","*", "200px"],
        orderKey : "ED.CREATE_DATE",
        orderBy : "DESC",
        pageNo : 1,
        perPage : 10,
        checkBox : true,
        isPagination : true,
        tableClass : "table-list",
        paginationDiv : $("#docListPagination"),
        noDataDiv : $("#groupPlaceNoDocMessage"),
        callbackFunctions: {
            navigatePageCallback : fnSelectExpiredDocList,
            rowClickCallback: evtDocListRowClick,
        }
    };

    // 초기화
    fnInit();
});

var docListTable;
var tableOption;
var currentDocInfo;

/**
 * 초기화
 */
function fnInit() {

    // 테이블 초기화
    docListTable = $("#documentListTable").enixTable(tableOption);

    // 문서 목록 조회
    fnSelectExpiredDocList();
}

/**
 * 만료 문서를 조회한다
 */
function fnSelectExpiredDocList() {
    currentDocInfo = null;

    var _param = docListTable.getPagination();

    enixClever.api.doc.selectExpiredDocList(_param, function(res) {
        docListTable.setData(res.data.docList);
        docListTable.setPagination(res.paging);
    });
}

/////////////////////////////////////////////////// 문서

/**
 * 문서 클릭
 * @param docInfo
 */
function evtDocListRowClick(docInfo) {
    currentDocInfo = docInfo;
}

/**
 * 문서 복원
 */
function evtRestoreDocument() {
    var list = docListTable.getCheckedList();
    if (list.length == 0) {
        enixClever.alert.warn("선택된 문서가 없습니다");
        return;
    }

    var docIdList = [];

    $.each(list, function(idx, item){
        docIdList.push(item["docId"]);
    });

    enixClever.alert.confirm("문서 복원 확인", "'{0}'건의 문서를 복원 할까요?".format(list.length), function() {
        enixClever.api.doc.restoreExpiredDocList(docIdList, function(res) {
            enixClever.alert.info("문서를 복원했습니다.");
            fnSelectExpiredDocList();
        });
    });
}

/**
 * 문서 삭제
 */
function evtDeleteDocument() {
    var list = docListTable.getCheckedList();
    if (list.length == 0) {
        enixClever.alert.warn("선택된 문서가 없습니다");
        return;
    }

    var docIdList = [];

    $.each(list, function(idx, item){
        docIdList.push(item["docId"]);
    });

    enixClever.alert.confirm("문서 삭제 확인", "'{0}'건의 문서를 삭제 할까요?".format(list.length), function() {
        enixClever.api.doc.deleteExpiredDocList(docIdList, function(res) {
            enixClever.alert.info("문서를 삭제했습니다.");
            fnSelectExpiredDocList();
        });
    });
}