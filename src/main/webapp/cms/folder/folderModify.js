$(function() {

});

/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
function initModal() {
	
    var folderId = arguments[0];
    _folderModify.successCallback = arguments[1];
    _folderModify.modifyForm = $("form[name=folderModifyForm]").enixForms(_folderModify.validOption);

    enixClever.api.folder.selectFolderInfo(folderId, function (res) {
        _folderModify.modifyForm.binding(res.data.folderInfo);
    });

}

var _folderModify = {
    modifyForm : null,
    validOption : {
        displayError : true,
        folderName : {
            required : true
        }
    },
    successCallback : null,
    /**
     * 권한 선택
     */
    evtSelectPermission : function () {
        enixClever.modal.load(
            constants.url.selectPermission,
            null,
            function (permissionInfo) {
                _folderModify.modifyForm.binding({
                    permissionId : permissionInfo.permissionId,
                    permissionName : permissionInfo.permissionName
                });
            }
        );
    },
    /**
     * 모달 서밋
     */
    evtSubmitClick : function () {
        if (!_folderModify.modifyForm.validate()) {
            return;
        }

        let data = _folderModify.modifyForm.toJson();

		


        enixClever.api.folder.modifyFolder(data, function (res) {
            enixClever.alert.success("폴더 수정 완료");
            enixClever.modal.close();

            if (typeof _folderModify.successCallback == "function") {
                _folderModify.successCallback();
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


