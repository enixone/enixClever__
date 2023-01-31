$(function() {

});

/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
function initModal() {
    // 파라메터 저장 (퍼미션 아이디)
    _roleModify.roleId = arguments[0];

    // 콜백 지정
    _roleModify.successCallback = arguments[1];

    // 대상자 플러그인 설정
    _roleModify.itemTable = $("form[name=roleModifyForm] table[name=accessorListTable]")
        .enixAccessorList({
            header : ["폴더적용", "문서적용", "목록", "상세", "생성", "수정", "삭제", "권한", "관리자"],
            displayMember : ["applyFolders", "applyDocs", "listView", "read", "create", "update", "delete", "permission", "admin"],
            noDataDiv : "form[name=roleModifyForm] div[name=noDataMessage]",
            data : [{}],
            isRoleItem : true
        });

    // 폼 플러그인 초기화
    _roleModify.form = $("form[name=roleModifyForm]").enixForms(_roleModify.validOption);

    // 역할 정보 조회
    _roleModify.fnSelectRoleInfo();
}

// 모달 스콥 정의
var _roleModify = {
    form : null,
    roleId : "",
    itemTable : null,
    successCallback : null,
    validOption : {
        displayError : true,
        roleName : {
            required : true
        }
    },
    // 역할 정보 조회
    fnSelectRoleInfo : function () {
        enixClever.api.role.selectRoleInfo(this.roleId, function (res) {
            var _info = res.data.roleInfo;
            var _tempForm = $("form[name=roleModifyForm]").enixForms();
            _tempForm.binding(_info);

            var _tempRoleItemList = [_info];
            _roleModify.itemTable.setData(_tempRoleItemList);

        });
    },
    // 확인
    evtSubmitClick : function () {
        if (!_roleModify.form.validate()) {
            return;
        }

        var _param = _roleModify.itemTable.getAccessorList()[0];
        _param.roleId = $("form[name=roleModifyForm] input[name=roleId]").val()
        _param.roleName = $("form[name=roleModifyForm] input[name=roleName]").val()

        enixClever.api.role.modifyRole(_param, function (res) {
            enixClever.alert.success("역할 수정 완료");
            enixClever.modal.close();

            if (typeof _roleModify.successCallback == "function") {
                _roleModify.successCallback();
            }
        });
    },
    // 종료
    evtCancelClick : function () {
        enixClever.modal.close();
    }
}