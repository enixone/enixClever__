$(document).ready(function () {
	//최초 로드시에는 최신 문서함을 조회한다. 
	fnSelectFolderDocList(listPart);
	fnSelectDocList();
});

var docListTable;
var tableOption;
var currentDocInfo;


/**
 * 초기화
 */
function fnInit() {
    // 테이블 초기화
    // 문서 목록 조회
}


/**
 * 선택된 폴더의 문서를 조회한다
 */
function fnSelectFolderDocList(){
	
	tableOption = {
        header : ["제목", "상태", "보안등급", "문서유형", "첨부", "생산일자"],
        data : [],
        displayMember : ["docName", "statusCodeName","securityCodeName","docTypeIdName", "fileCount", "createDate"],
        colAlign : ["aLeft", "aCenter","aCenter","aCenter","aCenter","aCenter"],
        colGroup : ["30px","*","120px","120px","120px","50px","120px"],
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
        isSecurityCard : true,
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
    listPart = "docListMyDocument";
	$("label[for='TEXT_TITLE']").text("부서 문서함");
    fnInit();
}

/**
 * 페이지에 속한 문서를 조회한다. 
 */
var _param = null;
function fnSelectDocList(folId) {

    currentDocInfo = null;
 
    _param = docListTable.getPagination();
    _param.searchKey = tableOption.searchKey;
    _param.keyword = tableOption.keyword;
    _param.folderId = folId;
 
   	enixClever.api.doc.selectDocList(_param, function(res) {
	
	    docListTable.setData(res.data.docList);
        docListTable.setPagination(res.paging);
        
        var cntItem = 0;
        
        if(res.paging != null)	cntItem = res.paging.totalCount;
        
        $("label[for='doc-count']").text("({0})".format(cntItem));
        $("label[for='folder-path']").text("/{0}".format(currentFolderInfo.fullPath));
        
    });
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
	window.open(constants.url.documentDetail+"?docId="+docId, "documentDetail" + Math.random(), "location=no,toolbar=no,resizable=no,top=100,left=600,width=800px,height=1120px,,scrollbars=yes");
}