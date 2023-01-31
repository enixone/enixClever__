$(function() {

});

/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
function initModal() {
    var data = arguments[0];
    _groupModify.successCallback = arguments[1];

    _groupModify.modifyForm = $("form[name=groupModifyForm]").enixForms(_groupModify.validOption);
    _groupModify.modifyForm.binding(data);

}

var _groupModify = {
    modifyForm : null,
    validOption : {
        displayError : true,
        groupName : {
            required : true
        }
    },
    successCallback : null,
    /**
     * 모달 서밋
     */
    evtSubmitClick : function() {
        if (!_groupModify.modifyForm.validate()) {
            return;
        }

        let data = _groupModify.modifyForm.toJson();

        enixClever.api.group.modifyGroup(data, function (res) {
			
            enixClever.alert.success("부서 수정 완료");
            enixClever.modal.close();

            if (typeof _groupModify.successCallback == "function") {
                _groupModify.successCallback();
            }
        });

    },

    /**
     * 모달 종료
     */
    evtCancelClick : function() {
        enixClever.modal.close();
    }
}
