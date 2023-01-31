function initModal(_paramM){
	
	
	_securityCard.docId = _paramM.docId;
	_securityCard.securityCodeName = _paramM.securityCodeName;
	
	// 권한 플러그인 초기화
    _securityCard.securityCardTable = $("div[name=securityHistoryDiv] table[name=table-list-secret]")
        .enixTable({
            header : ["년 월 일(시)", "소속 및 직책", "연번(군번)", "성명", "열람목적", "인장(서명)"],
            displayMember : ["actionDate", "actorRoleName", "actorId", "actorName", "actionCode", ""],
            colGroup : ["150px","*","80px","100px","100px","100px"],
            colAlign : ["aCenter", "aLeft", "aCenter", "aCenter", "aCenter", "aCenter"],
            data : [],
            tableClass : "table-listM",
            clickFirstRow : true,
            callbackFunctions: {
                //rowClickCallback: _securityCard.evtSelectAccessorList
            } 
    });

	
	_securityCard.evtSelectSerutityHistoryList();
		
}

// 모달 스콥 정의
var _securityCard = {
	docId : null,
	securityCodeName : null,
    securityCardTable : null,
    successCallback : null,

    // 권한 접근자 목록 조회
    evtSelectSerutityHistoryList : function () {
        	
        	
        		    
        enixClever.api.history.securityCard(this.docId, function (res) {
        	
        	_securityCard.securityCardTable.setData(res.data.docHisotory);
        	
        	$("div[name='secret_card_title']").text("제목 : " + res.data.docHisotory[0].docName);
        	$("div[name='secret_card_level']").text(_securityCard.securityCodeName);
		    
		});
    },
    // 종료
    evtCancelClick : function () {
        enixClever.modal.close();
    }
}
