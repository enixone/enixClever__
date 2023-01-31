$(document).ready(function () {

    currentDocInfo = null;

    tableOption = {
        header : ["제목", "상태", "보안등급", "문서유형", "첨부", "등록자", "등록 일자"],
        data : [],
        displayMember : ["docName", "statusCodeName","securityCodeName","docTypeIdName", "fileCount", "creatorName", "createDate"],
        colAlign : ["aLeft", "aCenter","aCenter","aCenter","aCenter","aCenter","aCenter"],
        colGroup : ["50px","","120px","120px","120px","50px","120px","120px"],
        orderKey : "ACTION_DATE",
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


//문서 해당 Row를 더블클릭시 이벤트
function evtDocListRowDbClick(docInfo) {
	showDetail(docInfo.docId);
}


//POST는 FORM 통해서 던져야하기 때문에 스크립트로 FORM 생성 후 전달
function showDetail(docId) {
	window.open(constants.url.documentDetail+"?docId="+docId, "documentDetail" + Math.random(), "location=no,toolbar=no,resizable=no,top=100,left=600,width=800px,height=1120px,,scrollbars=yes");
}


/**
 * 선택된 폴더의 문서를 조회한다
 */
var _param ;
function fnSelectDocList() {
    currentDocInfo = null;
    _param = docListTable.getPagination();
    	
    enixClever.api.myDocument.selectRecentReadDocument(_param, function(res) {
	    docListTable.setData(res.data.docList);
        docListTable.setPagination(res.paging);
    });
}


function viewDivide() {
	$('.view01_icon').click(function(){
		$('.tmpLeft').css("width","100%");
		$('.tmpLeft table').css("border-right","0px solid #999")
		$('.tmpRight').css("width","0%");
		
	});
	$('.view02_icon').click(function(){
		$('.tmpLeft').css("width","60%");
		$('.tmpRight').css("width","40%");
		$('.tmpLeft table').css("border-right","1px solid #999")
	});
}

/////////////////////////////////////////////////// 문서

/**
 * 문서 클릭
 * @param docInfo
 */

function evtDocListRowClick(docInfo) {
	
	currentDocInfo = docInfo;
    //_docDetail.selectDocInfo(docInfo.docId);
}


/**
 * 테이블이 있는 경우 검색 
 */
function fnSearchDocList(searchKey, keyword) {
	
	_param.createDate = searchKey;
	_param.keyword = keyword;
	_param.pageNo = 1;
	 
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


