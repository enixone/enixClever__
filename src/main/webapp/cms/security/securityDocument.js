$(document).ready(function () {
    fnInit();
});


var tableOption;
var docListTable;
/**
 * 초기화
 */
function fnInit() {

	tableOption = {
		displayMember : ["docId","createDate","creatorName","docNo","securityCodeName","docName","docNo","expireDate","expireCodeName","workflowTypeName"],
		orderKey : "createDate",
        orderBy : "DESC",
		pageNo : 1,
        perPage : 20,
        isSecurityCard : true,
        paginationDiv : $("#docListPagination"),
        isPagination : true,
        callbackFunctions: {
            navigatePageCallback : fnSelectDocList,
        }
	};

	docListTable = $("#documentListTable").enixTableSecurity(tableOption);

	// 문서 목록 조회
    fnSelectDocList();
}




/**
 * 선택된 폴더의 문서를 조회한다
 */
function fnSelectDocList() {
    
    currentDocInfo = null;
    
    var _param = docListTable.getPagination();
	    _param.searchKey = tableOption.searchKey;
	    _param.keyword = tableOption.keyword;
	    
    enixClever.api.myDocument.selectSecurityDocList(_param, function(res) {
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