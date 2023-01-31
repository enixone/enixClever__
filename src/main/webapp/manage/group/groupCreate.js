$(function() {

});

/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
function initModal() {
    var data = arguments[0];
    _groupCreate.successCallback = arguments[1];

    _groupCreate.createForm = $("form[name=groupCreateForm]").enixForms(_groupCreate.validOption);
    
    _groupCreate.createForm.binding(data);
}

var _groupCreate = {
    createForm : null,
    successCallback : null,
    validOption : {
        displayError : true,
       parentGroupName : {
		   required: true
	   },
        groupName : {
            required : true
        }
    },
    /**
     * 모달 서밋
     */
    evtSubmitClick : function () {
        if (!_groupCreate.createForm.validate()) {
            return;
        }

        let data = _groupCreate.createForm.toJson();

        enixClever.api.group.insertGroup(data, function (res) {
            enixClever.alert.success("부서 등록 완료");
            enixClever.modal.close();

            if (typeof _groupCreate.successCallback == "function") {
                _groupCreate.successCallback();
            }
        });

    },
    /**
     * 모달 종료
     */
    evtCancelClick : function () {
        enixClever.modal.close();
    }
}