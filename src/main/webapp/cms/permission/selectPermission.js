$(function() {

});

/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
function initModal() {

    // 콜백 지정
    _selectPermission.successCallback = arguments[1];

    // 권한 플러그인 초기화
    _selectPermission.permissionTable = $("div[name=selectPermissionDiv] table[name=permissionListTable]")
        .enixTable({
            header : ["권한 명", "소유자", "생성자", "기본권한"],
            colGroup : ["80px","100px","100px","120px"],
            data : [],
            displayMember : ["permissionName", "ownerName", "creatorName", "isSystem"],
            clickFirstRow : true,
            callbackFunctions: {
                rowClickCallback: _selectPermission.evtSelectAccessorList
            }
    });

    // 대상자 목록 플러그인 초기화
    _selectPermission.accessorTable = $("div[name=selectPermissionDiv] table[name=accessorListTable]")
        .enixAccessorList({
            readonly : true
        });

    // 사용 가능한 권한 목록 조회
    _selectPermission.fnSelectAvailablePermissionList();
}

// 모달 스콥 정의
var _selectPermission = {
    currentPermission : null,
    permissionTable : null,
    accessorTable : null,
    successCallback : null,
    // 사용 가능한 권한 목록 조회
    fnSelectAvailablePermissionList : function () {
	
        enixClever.api.permission.selectAvailablePermissionList(enixClever.user.getSessionUserKey(), function (res) {
            _selectPermission.permissionTable.setData(res.data.permissionList);
        });
    },
    
    // 권한 접근자 목록 조회
    evtSelectAccessorList : function (data) {
        _selectPermission.currentPermission = data;

        enixClever.api.permission.selectPermissionInfo(data.permissionId, function (res) {

            _selectPermission.accessorTable.setData(res.data.permissionInfo.accessorList);
        });
    },
    // 확인
    evtSubmitClick : function () {

        if (this.currentPermission == undefined) {
            enixClever.alert.warn("권한 선택 오류", "선택한 권한이 없습니다.");
            return;
        }

        enixClever.modal.close();

        if (typeof this.successCallback == "function") {
            this.successCallback(this.currentPermission);
        }
    },
    // 종료
    evtCancelClick : function () {
        enixClever.modal.close();
    }
}