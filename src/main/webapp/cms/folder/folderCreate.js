$(function() {

});

/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
function initModal() {
    /**
     * parentFolderName
     * parentFolderId
     * boxId
     */
    var data = arguments[0];
    _folderCreate.successCallback = arguments[1];
    _folderCreate.createForm = $("form[name=folderCreateForm]").enixForms(_folderCreate.validOption);
    _folderCreate.createForm.binding(data);
}

var _folderCreate = {
    createForm : null,
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
                _folderCreate.createForm.binding({
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
        if (!_folderCreate.createForm.validate()) {
            return;
        }

        let data = this.createForm.toJson();

        enixClever.api.folder.insertFolder(data, function (res) {
            enixClever.alert.success("폴더 등록 완료");
            enixClever.modal.close();

            if (typeof _folderCreate.successCallback == "function") {
                _folderCreate.successCallback();
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


