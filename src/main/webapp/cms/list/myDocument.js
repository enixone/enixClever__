$(document).ready(function () {

});

var docListTable;
var tableOption;
var currentDocInfo;
var listPart = "";


/**
 * 초기화
 */
function fnInit(pt) {
    // 테이블 초기화
    evtDocListMyDocument();
 	listPart = pt;
 
    // 문서 목록 조회
    fnSelectDocList();
}


//내 문서함 조회
function evtDocListMyDocument(){
	
	tableOption = {
        header : ["제목", "보안등급", "문서유형", "첨부", "등록일자"],
        data : [],
        displayMember : ["docName", "securityCodeName","docTypeIdName", "fileCount", "createDate"],
        colAlign : ["aLeft","aCenter","aCenter","aCenter","aCenter"],
        colGroup : ["30px","*","100px","120px","50px","120px"],
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

	docListTable = $("#documentListTable").enixTable(tableOption);
    $("label[for='TEXT_TITLE']").text("내가 등록한 문서");
    
}

//최신 문서함
function evtDocListLatest(){
	
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

	docListTable = $("#documentListTable").enixTable(tableOption);
    $("label[for='TEXT_TITLE']").text("최신 문서함");
    
}

//최근 조회 문서
function evtDocListRecent(){
	
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

	docListTable = $("#documentListTable").enixTable(tableOption);
    $("label[for='TEXT_TITLE']").text("최근 조회 문서");
    
}



//임시저장함
function evtTempSaveList(){
	
	tableOption = {
        header : ["제목", "보안등급", "문서유형", "첨부", "보관일자"],
        data : [],
        displayMember : ["docName", "securityCodeName","docTypeIdName", "fileCount","createDate"],
        colAlign : ["aLeft","aCenter","aCenter","aCenter","aCenter"],
        colGroup : ["30px","","120px","120px","50px","120px"],
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

	docListTable = $("#documentListTable").enixTable(tableOption);
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

	docListTable = $("#documentListTable").enixTable(tableOption);
    $("label[for='TEXT_TITLE']").text("즐겨 찾는 문서");
    
}


//결재 문서 > [상신] 진행함
function evtWorkflowDocListSendIng(){
	
	tableOption = {
        header : ["상신일자","결재구분", "승인자", "부서명","요청메세지", "문서제목","보안등급"],
        displayMember : ["creationDate", "workflowTypeName","creatorName","groupName","creatorMessage","docName","securityCodeName"],
        colAlign : ["aCenter","aCenter","aCenter","aCenter","aLeft","aLeft","aCenter"],
        colGroup : ["30px","100px","100px","120px","120px","340px","*","120px"],
        orderKey : "createDate",
        orderBy : "DESC", 
        sorting : false,
        pageNo : 1,
        perPage : 20,
        checkBox : true,
        isWithdraw : true,
        searchKey : null,
        keyword   : null,
        clickFirstRow : false,
        isPagination : true,
        tableClass : "table-list",
        paginationDiv : $("#docListPagination"),
        noDataDiv : "결재대상 문서를 가져오는 중입니다.",
        noDataMessage : "결재대상 문서가 없습니다.",
        callbackFunctions: {
            navigatePageCallback : fnSelectDocList,
            rowClickCallback: evtDocListRowClick,
            rowDoubleClickCallback:evtDocListRowDbClick,   
            orderChangedCallback : fnSelectDocList,
        }
    };

	docListTable = $("#documentListTable").enixTable(tableOption);
    $("label[for='TEXT_TITLE']").text("결재 문서 > [상신] 진행함");
    
}


//결재 문서 > [상신] 완료함
function evtWorkflowDocListSendEnd(){
	
	tableOption = {
        header : ["결제구문","결재결과","처리일자", "승인자", "부서명","결제메세지", "문서제목","보안등급"],
        displayMember : ["workflowTypeName", "workflowStatusName", "actionDate","actorName", "actorName", "actorMessage","docName", "securityCodeName"],
        colAlign : ["aCenter","aCenter","aCenter","aCenter","aCenter","aLeft","aLeft","aCenter"],
        colGroup : ["30px","100px","100px","120px","120px","120px","340px","*","120px"],
        orderKey : "createDate",
        orderBy : "DESC",
        sorting : false,
        pageNo : 1,
        perPage : 20,
        checkBox : true,
        searchKey : null,
        keyword   : null,
        isSingleCheck : true,
        clickFirstRow : false,
        isPagination : true,
        tableClass : "table-list",
        paginationDiv : $("#docListPagination"),
        noDataDiv : "결재완료 문서를 가져오는 중입니다.",
        noDataMessage : "결재완료 문서가 없습니다.",
        callbackFunctions: {
            navigatePageCallback : fnSelectDocList,
            rowClickCallback: evtDocListRowClick,
            rowDoubleClickCallback:evtDocListRowDbClick,   
            orderChangedCallback : fnSelectDocList,
        }
    };

	docListTable = $("#documentListTable").enixTable(tableOption);
    $("label[for='TEXT_TITLE']").text("결재 문서 > [상신] 완료함");
    
}

//결재 문서 > [수신] 결재 대기함
function evtWorkflowDocListReceiveIng(){
	
	tableOption = {
		
		header : ["상신일자","결재구분", "상신자", "부서명","요청메세지", "문서제목","보안등급"],
        displayMember : ["creationDate", "workflowTypeName","creatorName","groupName","creatorMessage","docName","securityCodeName"],
        colAlign : ["aCenter","aCenter","aCenter","aCenter","aLeft","aLeft","aCenter"],
        colGroup : ["30px","100px","100px","120px","120px","340px","*","120px"],
        orderKey : "createDate",
        orderBy : "DESC",
        sorting : false,
        pageNo : 1,
        perPage : 20,
        checkBox : true,
        searchKey : null,
        keyword   : null,
        clickFirstRow : false,
        isPagination : true,
        tableClass : "table-list",
        paginationDiv : $("#docListPagination"),
        noDataDiv : "결재대상 문서를 가져오는 중입니다.",
        noDataMessage : "결재대상 문서가 없습니다.",
        callbackFunctions: {
            navigatePageCallback : fnSelectDocList,
            rowClickCallback: evtDocListRowClick,
            rowDoubleClickCallback:evtDocListRowDbClick,   
            orderChangedCallback : fnSelectDocList,
        }
    };

	docListTable = $("#documentListTable").enixTable(tableOption);
    listPart = "workflowDocListReceiveIng";

    
	$("label[for='TEXT_TITLE']").text("결재 문서 > [수신] 결재 대기함");
    
}


//결재 문서 > [수신] 결재 완료함
function evtWorkflowDocListReceiveEnd(){
	
	tableOption = {
        header : ["제목","결제메세지", "보안등급", "결재종류","결재상태", "보낸사람", "상신일자", "처리일자"],
        displayMember : ["docName", "actorMessage", "securityCodeName","workflowTypeName", "workflowStatusName", "creatorName", "creationDate", "actionDate"],
        colAlign : ["aLeft","aLeft","aCenter","aCenter","aCenter","aCenter","aCenter","aCenter"],
        colGroup : ["30px","*","300px","100px","100px","100px","100px","120px","120px"],
        orderKey : "createDate",
        orderBy : "DESC",
        sorting : false,
        pageNo : 1,
        perPage : 20,
        checkBox : true,
        searchKey : null,
        keyword   : null,
        clickFirstRow : false,
        isPagination : true,
        tableClass : "table-list",
        paginationDiv : $("#docListPagination"),
        noDataDiv : "결재완료 문서를 가져오는 중입니다.",
        noDataMessage : "결재완료 문서가 없습니다.",
        callbackFunctions: {
            navigatePageCallback : fnSelectDocList,
            rowClickCallback: evtDocListRowClick,
            rowDoubleClickCallback:evtDocListRowDbClick,   
            orderChangedCallback : fnSelectDocList,
        }
    };

	docListTable = $("#documentListTable").enixTable(tableOption);
    listPart = "workflowDocListReceiveEnd";
	$("label[for='TEXT_TITLE']").text("결재 문서 > [수신] 결재 완료함");
}


//비밀소유현황
function evtMyScretDocList(){
	
	tableOption = {
        header : ["비밀등급","이월", "월","월","월","월","월","월","현보유량"],
        displayMember : ["securityCodeName", "securityCodeName", "securityCodeName","securityCodeName", "securityCodeName", "securityCodeName", "securityCodeName", "securityCodeName"],
        colAlign : ["aCenter","aCenter","aCenter","aCenter","aCenter","aCenter","aCenter","aCenter","aCenter"],
        colGroup : ["20%","10%","10%","10%","10%","10%","10%","10%","10%"],
        orderKey : "securityCodeName",
        orderBy : "DESC",
        sorting : false,
        pageNo : 1,
        perPage : 20,
        clickFirstRow : false,
        tableClass : "table-listM",
        paginationDiv : $("#docListPagination"),
        noDataDiv : "문서를 가져오는 중입니다.",
        noDataMessage : "문서가 없습니다.",
        callbackFunctions: {
            
        }
    };
	docListTable = $("#documentListTable").ecSecurityCardTable(tableOption);
	$("label[for='TEXT_TITLE']").html("비밀소유현황");
}


//만기문서함
function evtExpireDocList(){
	
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

	docListTable = $("#documentListTable").enixTable(tableOption);
    $("label[for='TEXT_TITLE']").text("만기문서함");
    
}

//파기문서함
function evtDestroyDocList(){
	
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

	docListTable = $("#documentListTable").enixTable(tableOption);
    $("label[for='TEXT_TITLE']").text("파기문서함");
    
}



/**
 * 페이지에 속한 문서를 조회한다. 
 */
var _param = null;
var initTable = null;

function fnSelectDocList() {

	currentDocInfo = null;
 
 	_param = docListTable.getPagination();
    _param.searchKey = tableOption.searchKey;
    _param.keyword = tableOption.keyword; 
    
    //내문서
    if(listPart == "docListMyDocument"){
		
		if(initTable != listPart)	evtDocListMyDocument();
		
        enixClever.api.myDocument.selectMyDocument(_param, function(res) {
	
			docListTable.setNowTime(res.now);
			docListTable.setData(res.data.docList);
	        docListTable.setPagination(res.paging);
	        $("label[for='doc-count']").text("({0})".format(getTotalCount(res)));
	        initTable = listPart; 
	    });
	
	// 최신 문서함
	}else if(listPart == "docListRecent"){
		if(initTable != listPart)	evtDocListRecent();
		enixClever.api.myDocument.selectRecentReadDocument(_param, function(res) {
		    docListTable.setNowTime(res.now);
			docListTable.setData(res.data.docList);
	        docListTable.setPagination(res.paging);
	        $("label[for='doc-count']").text("({0})".format(getTotalCount(res)));
            initTable = listPart; 
	    });
	
	// 최근 조회 문서
	}else if(listPart == "docListLatest"){
		if(initTable != listPart)	evtDocListLatest();
		enixClever.api.myDocument.selectNewDocument(_param, function(res) {
		    docListTable.setNowTime(res.now);
			docListTable.setData(res.data.docList);
	        docListTable.setPagination(res.paging);
	        $("label[for='doc-count']").text("({0})".format(getTotalCount(res)));
	        initTable = listPart; 
        });
	
	// 임시 보관함
	}else if(listPart == "tempSaveList"){
		if(initTable != listPart)	evtTempSaveList();
		
		enixClever.api.myDocument.selectTempSaveList(_param, function(res) {
		    docListTable.setNowTime(res.now);
			docListTable.setData(res.data.docList);
	        docListTable.setPagination(res.paging);
	        $("label[for='doc-count']").text("({0})".format(getTotalCount(res)));
            initTable = listPart; 
        });
	
	// 즐겨 찾는 문서
	}else if(listPart == "bookmarkDocList"){
		if(initTable != listPart)	evtBookmarkDocList();
		
		enixClever.api.bookmark.bookmarkDocList(_param, function(res) {
		    docListTable.setNowTime(res.now);
			docListTable.setData(res.data.docList);
	        docListTable.setPagination(res.paging);
	        $("label[for='doc-count']").text("({0})".format(getTotalCount(res)));
            initTable = listPart; 
        });
	
	// 비밀소유현황
	}else if(listPart == "myScretDocList"){
		evtMyScretDocList();
		enixClever.api.bookmark.bookmarkDocList(_param, function(res) {
		    docListTable.setData(res.data.docList);
        });
	
	// 결재 문서 > [상신] 진행함
	}else if(listPart == "workflowDocListSendIng"){
		if(initTable != listPart)	evtWorkflowDocListSendIng();
		
		enixClever.api.workflow.workflowDocList("SendIng",_param, function(res) {
		    docListTable.setNowTime(res.now);
			docListTable.setData(res.data.docList);
	        docListTable.setPagination(res.paging);
	        $("label[for='doc-count']").text("({0})".format(getTotalCount(res)));
            initTable = listPart; 
        });
	
	// 결재 문서 > [상신] 완료함
	}else if(listPart == "workflowDocListSendEnd"){
		if(initTable != listPart)	evtWorkflowDocListSendEnd();
		
		enixClever.api.workflow.workflowDocList("SendEnd",_param, function(res) {
		    docListTable.setNowTime(res.now);
			docListTable.setData(res.data.docList);
	        docListTable.setPagination(res.paging);
	        $("label[for='doc-count']").text("({0})".format(getTotalCount(res)));
            initTable = listPart; 
        });
	
	
	// 결재 문서 > [수신] 결재 대기함
	}else if(listPart == "workflowDocListReceiveIng"){
		if(initTable != listPart)	evtWorkflowDocListReceiveIng();
		
		enixClever.api.workflow.workflowDocList("ReceiveIng",_param, function(res) {
		    docListTable.setNowTime(res.now);
			docListTable.setData(res.data.docList);
	        docListTable.setPagination(res.paging);
	        $("label[for='doc-count']").text("({0})".format(getTotalCount(res)));
            initTable = listPart; 
        });
	
	// 결재 문서 > [수신] 결재 완료함
	}else if(listPart == "workflowDocListReceiveEnd"){
		if(initTable != listPart)	evtWorkflowDocListReceiveEnd();
		
		enixClever.api.workflow.workflowDocList("ReceiveEnd",_param, function(res) {
		    docListTable.setNowTime(res.now);
			docListTable.setData(res.data.docList);
	        docListTable.setPagination(res.paging);
	        $("label[for='doc-count']").text("({0})".format(getTotalCount(res)));
            initTable = listPart; 
        });
	
	// 만기 문서함
	}else if(listPart == "expireDocList"){
		if(initTable != listPart)	evtExpireDocList();
		
		enixClever.api.myDocument.selectExpireDocList(_param, function(res) {
		    docListTable.setNowTime(res.now);
			docListTable.setData(res.data.docList);
	        docListTable.setPagination(res.paging);
	        $("label[for='doc-count']").text("({0})".format(getTotalCount(res)));
            initTable = listPart; 
        });
	// 파기문서함
	}else if(listPart == "destroyDocList"){
		if(initTable != listPart)	evtDestroyDocList();
		
		enixClever.api.myDocument.selectTrashDocList(_param, function(res) {
		    docListTable.setNowTime(res.now);
			docListTable.setData(res.data.docList);
	        docListTable.setPagination(res.paging);
	        $("label[for='doc-count']").text("({0})".format(getTotalCount(res)));
            initTable = listPart; 
        });
	
	}else{
		enixClever.alert.info("문서함 정보가 없습니다.");
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
			return enixClever.alert.info("검색어는 두글짜 이상 입력해야 합니다.");
		}
		fnSearchDocList("docName",evtValue);	
	}
	return;
}

/**
 * 즐겨찾기 문서 목록에 선택한 문서 추가
 */
function fnSetFavoriteDocument(){

	if(docListTable.getCheckedList() < 1){
		return enixClever.alert.info("선택된 문서가 없습니다.");
	}
	
	let checkDocIdList = '';
	
	$.each(docListTable.getCheckedList(), function (idx, item) {
        checkDocIdList += item.docId+',';
    });
    
    enixClever.api.bookmark.insertBookmark(checkDocIdList, function(res) {
	    enixClever.alert.info("즐겨찾기에 등록했습니다.");
    });
	
}


/**
 * 즐겨찾기 문서 목록에 선택한 문서 삭제
 */
function fnClearFavoriteDocument(){

	if(docListTable.getCheckedList() < 1){
		return enixClever.alert.info("선택된 문서가 없습니다.");
	}
	
	let checkDocIdList = '';
	
	$.each(docListTable.getCheckedList(), function (idx, item) {
        checkDocIdList += item.docId+',';
    });
    
    enixClever.api.bookmark.deleteBookmark(checkDocIdList, function(res) {
	    enixClever.alert.info("즐겨찾기에 해제했습니다.");
    });
	
}


function evtSecurityCard(docId, securityCodeName){
	
	let _paramM = {
        docId : docId,
        securityCodeName : securityCodeName
	}
	
	
	enixClever.modal.load(
        constants.url.securityCard,
        _paramM,
        null,
        "md-securityCard"
    );
}

//문서 해당 Row를 더블클릭시 이벤트
function evtDocListRowDbClick(docInfo) {
	showDetail(docInfo.docId);
}


//POST는 FORM 통해서 던져야하기 때문에 스크립트로 FORM 생성 후 전달
function showDetail(docId) {
	detailWin = window.open(constants.url.documentDetail+"?docId="+docId, "documentDetail" + Math.random(), "location=no,toolbar=no,resizable=no,top=100,left=600,width=800px,height=940px,,scrollbars=yes");
	setTimeout("detailWin.close()",500000);
}


/**
 * 결재 모달 출력
 */

function evtWorkflowStep(docId, workflowId, workflowStatus) {
		
		var currentDocInfo = {
				docId : docId,
				workflowId : workflowId,
			    workflowStatus : workflowStatus
    	}

		enixClever.modal.load(
            constants.url.workflowStep,
            currentDocInfo,
            updateWF,
			"md-small",
			"height:300px"
        );
    }

function updateWF(res){
	
	//정상처리된 경우 결제 버튼 disable
	if(res.status == "SUCCESS"){
		
		$('#btnApproval').attr('style', "display:none;");  		//승인
		$('#btnRejection').attr('style', "display:none;");  	//반려
		$('#btnWithDraw').attr('style', "display:none;");  		//회수
		
		$('#btnGroup-pop').attr('style', "background:#215280;");  	//결제대상이 없는 경우
	}
	
	alert(res.message);
	
	enixClever.modal.close();
	
}
    
    