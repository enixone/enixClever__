$(function() {

// a 태그 클릭 이벤트

});

/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
function initModal() {
	
    // 콜백 지정
    _roleCreate.successCallback = arguments[1];

    // 대상자 설정
    _roleCreate.itemTable = $("form[name=roleCreateForm] table[name=accessorListTable]")
        .enixAccessorList({
       		header : ["폴더", "문서", "목록", "상세", "수정", "삭제", "생성", "권한", "관리자"],
            displayMember : ["applyFolders", "applyDocs", "listView", "read", "create","update", "delete",  "permission","admin"],
            noDataDiv : "form[name=roleCreateForm] div[name=noDataMessage]",
            data : [{}],
            tableClass : "table-list",
            isRoleItem : true,
       
	        });

    // 폼 플러그인 초기화
    _roleCreate.form = $("form[name=roleCreateForm]").enixForms(_roleCreate.validOption);
		
}

// 모달 스콥 정의
var currentInfo = null;
var _roleCreate = {
    form : null,
    itemTable : null,
    successCallback : null,
    validOption : {
        displayError : true,
        roleName : {
            required : true,
            length : {
				minLength : 2,
                maxLength : 15
            }
        }
    },
    
    
    // 확인
    evtSubmitClick : function () {
        if (!_roleCreate.form.validate()) {
            return;
        }
		
        var _param = _roleCreate.itemTable.getAccessorList()[0];
		_param.roleName = $("form[name=roleCreateForm] input[name=roleName]").val();
	
        enixClever.api.role.insertRole(_param, function (res) {
            
            enixClever.alert.success("역할 등록 완료");
            enixClever.modal.close();

            if (typeof _roleCreate.successCallback == "function") {
                _roleCreate.successCallback();
            }
        });
    },
    // 종료
    evtCancelClick : function () {
        enixClever.modal.close();
    }
}

