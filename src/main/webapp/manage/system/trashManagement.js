$(document).ready(function () {
    currentDocInfo = null;

    trashTableOption = {
        header : ["문서 제목", "상태", "버전", "첨부", "등록자", "등록 일자"],
        data : [],
        displayMember : ["docName", "statusCodeName", "version", "fileCount", "creatorName", "createDate"],
        colAlign : ["aCenter", "aCenter","aLeft","aLeft","aLeft","aCenter","aCenter"],
    	colGroup : ["50px","200px","220px","300px","*", "200px" ,"200px"],
        orderKey : "ED.CREATE_DATE",
        orderBy : "DESC",
        pageNo : 1,
        perPage : 10,
        checkBox : true,
        isPagination : true,
        tableClass : "table-list",
        paginationDiv : $("#trashListPagination"),
        noDataDiv : $("#trashNoDocMessage"),
        callbackFunctions: {
            navigatePageCallback : fnSelectTrashDocList,
            rowClickCallback: evtDocListRowClick,
        }
    };

    // 초기화
    fnInit();
});

var trashDocListTable;
var trashTableOption;
var currentDocInfo;

/**
 * 초기화
 */
function fnInit() {

    // 테이블 초기화
    trashDocListTable = $("#trashListTable").enixTable(trashTableOption);
	
    // 문서 목록 조회
    fnSelectTrashDocList();
}

/**
 * 휴지통 문서를 조회한다
 */
function fnSelectTrashDocList() {
    currentDocInfo = null;

    var _param = trashDocListTable.getPagination();
    enixClever.api.doc.selectTrashDocList(_param, function(res) {
        trashDocListTable.setData(res.data.docList);
        trashDocListTable.setPagination(res.paging);
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
 * 문서 삭제
 */
function evtRestoreDocument() {
    var list = trashDocListTable.getCheckedList();
    if (list.length == 0) {
        enixClever.alert.warn("선택된 문서가 없습니다");
        return;
    }

    var docIdList = [];

    $.each(list, function(idx, item){
        docIdList.push(item["docId"]);
    });

    enixClever.alert.confirm("문서 복원 확인", "'{0}'건의 문서를 복원 할까요?".format(list.length), function() {
        enixClever.api.doc.restoreTrashDocList(docIdList, function(res) {
            enixClever.alert.info("문서를 복원했습니다.");
            fnSelectTrashDocList();
        });
    });
}

/**
 * 문서 완전 삭제
 */
function evtTerminateDocument() {
    var list = trashDocListTable.getCheckedList();
    if (list.length == 0) {
        enixClever.alert.warn("선택된 문서가 없습니다");
        return;
    }

    var docIdList = [];

    $.each(list, function(idx, item){
        docIdList.push(item["docId"]);
    });

    enixClever.alert.confirm("문서 삭제 확인", "'{0}'건의 문서를 완전 삭제 할까요?".format(list.length), function() {
        enixClever.api.doc.deleteTrashDocList(docIdList, function(res) {
            enixClever.alert.info("문서를 완전삭제했습니다.");
            fnSelectTrashDocList();
        });
    });
}