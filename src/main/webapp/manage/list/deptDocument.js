$(document).ready(function () {

    currentDocInfo = null;

    tableOption = {
        header : ["제목", "상태", "보안등급", "문서유형", "버전", "첨부", "등록자", "등록 일자"],
        data : [],
        displayMember : ["docName", "statusCodeName","securityCodeName","docTypeIdName", "version", "fileCount", "creatorName", "createDate"],
        colAlign : ["aLeft", "aCenter","aCenter","aCenter","aCenter","aCenter","aCenter","aCenter"],
        colGroup : ["50px","*","120px","120px","120px","120px","120px","120px","120px"],
        orderKey : "ED.CREATE_DATE",
        orderBy : "DESC",
        sorting : true,
        pageNo : 1,
        perPage : 20,
        checkBox : true,
        clickFirstRow : true,
        isPagination : true,
        tableClass : "table-list",
        paginationDiv : $("#docListPagination"),
        noDataDiv : "문서를 가져오는 중입니다.",
        noDataMessage : "문서가 없습니다.",
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
    viewDivide();
  
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

