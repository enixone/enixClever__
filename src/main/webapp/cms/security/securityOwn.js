$(document).ready(function () {

    currentDocInfo = null;

    tableOption = {
        header : ["제목", "상태", "버전", "첨부", "등록자", "등록 일자"],
        data : [],
        displayMember : ["docName", "statusCode", "version", "fileCount", "creatorName", "createDate", "createDate", "createDate"],
        colAlign : ["aCenter","aCenter","aCenter","aCenter","aCenter","aCenter","aCenter"],
        colGroup : ["*","10%","10%","10%","10%","10%","10%","10%"],
        orderKey : "ED.CREATE_DATE",
        orderBy : "DESC",
        sorting : true,
        pageNo : 1,
        perPage : 20,
        checkBox : false,
        clickFirstRow : true,
        isPagination : true,
        tableClass : "table-listT",
        paginationDiv : $("#docListPagination"),
        noDataDiv : $("#groupPlaceNoDocMessage"),
        callbackFunctions: {
            navigatePageCallback : fnSelectDocList,
            rowClickCallback: evtDocListRowClick,
            orderChangedCallback : fnSelectDocList,
        }
    };

	// 문서 상세 폼 로드
    $("div[name=docDetail]").load(constants.url.documentDetail + "?ranToken=" + Math.random(), function() {
        loadScript(function() {
            initDetail();
        });
    });
    
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
    fnSelectDocList();
}

/**Z
 * 선택된 폴더의 문서를 조회한다
 */
function fnSelectDocList() {
    currentDocInfo = null;
    var _param = docListTable.getPagination();
	    _param.userKey = enixClever.user.userInfo.userKey;
	    _param.createDate = "2020-01-01";
	    _param.createDate = "2020-01-01";

    enixClever.api.myDocument.selectMyDocument(_param, function(res) {
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
    //currentDocInfo = docInfo;
    //_docDetail.selectDocInfo(docInfo.docId);
}