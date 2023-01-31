$(document).ready(function () {
	//최초 로드시에는 최신 문서함을 조회한다. 
	evtDocListMyDocument();
});

var docListTable;
var tableOption;
var currentDocInfo;
var listPart = "docListMyDocument";

//내 문서함 조회
function evtDocListMyDocument(){
	
	tableOption = {
        header : ["제목", "상태", "보안등급", "문서유형", "첨부", "등록일자"],
        data : [],
        displayMember : ["docName", "statusCodeName","securityCodeName","docTypeIdName", "fileCount", "createDate"],
        colAlign : ["aLeft", "aCenter","aCenter","aCenter","aCenter","aCenter"],
        colGroup : ["30px","*","120px","120px","120px","50px","120px"],
        //colGroup : ["1%","59%","5%","5%","5%","5%","5%","5%"],
        orderKey : "createDate",
        orderBy : "DESC",
        sorting : true,
        pageNo : 1,
        perPage : 20,
        checkBox : true,
        searchKey : null,
        keyword   : null,
        clickFirstRow : false,
        isPagination : true,
        tableClass : "table-list",
        paginationDiv : $("#docListPagination"),
        noDataDiv : "문서를 가져오는 중입니다.",
        noDataMessage : "문서가 없습니다.",
        callbackFunctions: {
            navigatePageCallback : fnSelectDocList,
            rowClickCallback: evtDocListRowClick,
            rowDoubleClickCallback:evtDocListRowDbClick,   
            orderChangedCallback : fnSelectDocList,
        }
    };

	listPart = "docListMyDocument";
	$("label[for='TEXT_TITLE']").text("내 문서함");
    fnInit();
}

//최근 조회 문서
function evtDocListRecent(){
	
	tableOption = {
        header : ["제목", "보안등급", "문서유형", "첨부", "등록자", "등록일시"],
        data : [],
        displayMember : ["docName", "securityCodeName","docTypeIdName", "fileCount", "creatorName", "createDate"],
        colAlign : ["aLeft","aCenter","aCenter","aCenter","aCenter","aCenter"],
        colGroup : ["30px","","120px","120px","50px","120px","120px"],
        orderKey : "createDate",
        orderBy : "DESC",
        sorting : true,
        pageNo : 1,
        perPage : 20,
        checkBox : true,
        searchKey : null,
        keyword   : null,
        clickFirstRow : false,
        isPagination : true,
        tableClass : "table-list",
        paginationDiv : $("#docListPagination"),
        noDataDiv : "문서를 가져오는 중입니다.",
        noDataMessage : "문서가 없습니다.",
        callbackFunctions: {
            navigatePageCallback : fnSelectDocList,
            rowClickCallback: evtDocListRowClick,
            rowDoubleClickCallback:evtDocListRowDbClick,   
            orderChangedCallback : fnSelectDocList,
        }
    };

	listPart = "docListRecent";
    fnInit();
    
	$("label[for='TEXT_TITLE']").text("최근 조회 문서");
    
}


//최신 문서함
function evtDocListLatest(){
	
	tableOption = {
        header : ["제목", "보안등급", "문서유형", "첨부", "등록자", "등록일시"],
        data : [],
        displayMember : ["docName", "securityCodeName","docTypeIdName", "fileCount", "creatorName", "createDate"],
        colAlign : ["aLeft","aCenter","aCenter","aCenter","aCenter","aCenter"],
        colGroup : ["30px","","120px","120px","50px","120px","120px"],
        orderKey : "createDate",
        orderBy : "DESC",
        sorting : true,
        pageNo : 1,
        perPage : 20,
        checkBox : true,
        searchKey : null,
        keyword   : null,
        clickFirstRow : false,
        isPagination : true,
        tableClass : "table-list",
        paginationDiv : $("#docListPagination"),
        noDataDiv : "문서를 가져오는 중입니다.",
        noDataMessage : "문서가 없습니다.",
        callbackFunctions: {
            navigatePageCallback : fnSelectDocList,
            rowClickCallback: evtDocListRowClick,
            rowDoubleClickCallback:evtDocListRowDbClick,   
            orderChangedCallback : fnSelectDocList,
        }
    };

	listPart = "docListLatest";
    fnInit();
    
	$("label[for='TEXT_TITLE']").text("최신 문서함");
    
}


//임시저장함
function evtTempSaveList(){
	
	tableOption = {
        header : ["제목", "보안등급", "문서유형", "첨부", "등록자", "임시저장일시"],
        data : [],
        displayMember : ["docName", "securityCodeName","docTypeIdName", "fileCount", "creatorName", "createDate"],
        colAlign : ["aLeft","aCenter","aCenter","aCenter","aCenter","aCenter"],
        colGroup : ["30px","","120px","120px","50px","120px","120px"],
        orderKey : "createDate",
        orderBy : "DESC",
        sorting : true,
        pageNo : 1,
        perPage : 20,
        checkBox : true,
        searchKey : null,
        keyword   : null,
        clickFirstRow : false,
        isPagination : true,
        tableClass : "table-list",
        paginationDiv : $("#docListPagination"),
        noDataDiv : "문서를 가져오는 중입니다.",
        noDataMessage : "문서가 없습니다.",
        callbackFunctions: {
            navigatePageCallback : fnSelectDocList,
            rowClickCallback: evtDocListRowClick,
            rowDoubleClickCallback:evtDocListRowDbClick,   
            orderChangedCallback : fnSelectDocList,
        }
    };

	listPart = "tempSaveList";
    fnInit();
    
	$("label[for='TEXT_TITLE']").text("임시 보관함");
    
}

//즐겨찾는 문서
function evtBookmarkDocList(){
	
	tableOption = {
        header : ["제목", "보안등급", "문서유형", "첨부", "등록자", "등록일자"],
        data : [],
        displayMember : ["docName", "securityCodeName","docTypeIdName", "fileCount", "creatorName", "createDate"],
        colAlign : ["aLeft","aCenter","aCenter","aCenter","aCenter","aCenter"],
        colGroup : ["30px","","120px","120px","50px","120px","120px"],
        orderKey : "createDate",
        orderBy : "DESC",
        sorting : true,
        pageNo : 1,
        perPage : 20,
        checkBox : true,
        searchKey : null,
        keyword   : null,
        clickFirstRow : false,
        isPagination : true,
        tableClass : "table-list",
        paginationDiv : $("#docListPagination"),
        noDataDiv : "문서를 가져오는 중입니다.",
        noDataMessage : "문서가 없습니다.",
        callbackFunctions: {
            navigatePageCallback : fnSelectDocList,
            rowClickCallback: evtDocListRowClick,
            rowDoubleClickCallback:evtDocListRowDbClick,   
            orderChangedCallback : fnSelectDocList,
        }
    };

	listPart = "bookmarkDocList";
    fnInit();
    
	$("label[for='TEXT_TITLE']").text("즐겨 찾는 문서");
    
}



/**
 * 초기화
 */
function fnInit() {
    // 테이블 초기화
    docListTable = $("#documentListTable").enixTable(tableOption);
    // 문서 목록 조회
    fnSelectDocList(listPart);
}


//문서 해당 Row를 더블클릭시 이벤트
function evtDocListRowDbClick(docInfo) {
	showDetail(docInfo.docId);
}


//POST는 FORM 통해서 던져야하기 때문에 스크립트로 FORM 생성 후 전달
function showDetail(docId) {
	window.open(constants.url.documentDetail+"?docId="+docId, "documentDetail" + Math.random(), "location=no,toolbar=no,resizable=no,top=100,left=600,width=800px,height=1120px,,scrollbars=yes");
}


/**
 * 페이지에 속한 문서를 조회한다. 
 */
var _param = null;
function fnSelectDocList() {

    currentDocInfo = null;
 
    _param = docListTable.getPagination();
    _param.searchKey = tableOption.searchKey;
    _param.keyword = tableOption.keyword; 
    
   	if(listPart == "docListMyDocument"){
	
        enixClever.api.myDocument.selectMyDocument(_param, function(res) {
		    docListTable.setData(res.data.docList);
	        docListTable.setPagination(res.paging);
	    });
	
	}else if(listPart == "docListRecent"){
	
		enixClever.api.myDocument.selectRecentReadDocument(_param, function(res) {
		    docListTable.setData(res.data.docList);
	        docListTable.setPagination(res.paging);
        });
	
	}else if(listPart == "docListLatest"){
	
		enixClever.api.myDocument.selectNewDocument(_param, function(res) {
		    docListTable.setData(res.data.docList);
	        docListTable.setPagination(res.paging);
        });
	
	}else if(listPart == "tempSaveList"){
	
		enixClever.api.myDocument.selectTempSaveList(_param, function(res) {
		    docListTable.setData(res.data.docList);
	        docListTable.setPagination(res.paging);
        });
	
	}else if(listPart == "bookmarkDocList"){
	
		enixClever.api.doc.bookmarkDocList(_param, function(res) {
		    docListTable.setData(res.data.docList);
	        docListTable.setPagination(res.paging);
        });
	
	}
	
	
	
	
}

/**
 * 문서 클릭
 * @param docInfo
 */

function evtDocListRowClick(docInfo) {
	currentDocInfo = docInfo;
}


/**
 * 테이블이 있는 경우 검색 
 */
function fnSearchDocList(searchKey, keyword) {
	
	tableOption.searchKey = searchKey;
	tableOption.keyword = keyword;
	tableOption.pageNo = 1;
	
    fnSelectDocList();
}


/**
 * 엔터키 입력시 검색을 수행한다. 
 */
function fnSearchDocListEnter(keyCode, evtValue) {
	
	if(keyCode == 13) {
		if(evtValue.length < 2 && evtValue.length > 0){
			return alert("검색어는 두글짜 이상 입력해야 합니다.");
		}
		fnSearchDocList("docName",evtValue);	
	}
	return;
}




function fnSetFavoriteDocument(){

	let checkDocIdList = '';
	
	$.each(docListTable.getCheckedList(), function (idx, item) {
        checkDocIdList += item.docId+',';
    });
    
    enixClever.api.doc.insertBookmark(checkDocIdList, function(res) {
	    alert("호출 완료");
    });
	
}

function evtSecurityCard(docId){
	
		enixClever.modal.load(
            constants.url.securityCard,
            docId,
            null,
            "md-securityCard"
        );
}

