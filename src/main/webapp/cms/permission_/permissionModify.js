$(function() {

});

/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
function initModal() {
    // 파라메터 저장 (퍼미션 아이디)
    _permModify.permissionId = arguments[0];

    // 콜백 지정
    _permModify.successCallback = arguments[1];

    // 대상자 리스트 플러그인 초기화
    _permModify.itemTable = $("form[name=permissionModifyForm] table[name=accessorListTable]")
        .enixAccessorList({
            noDataDiv : "form[name=permissionModifyForm] div[name=noDataMessage]"
    });

    // 소유자 변경 이벤트 수신
    $("form[name=permissionModifyForm] input[type=radio]").on("change", _permModify.evtOwnerChange);

    // 권한 상세 정보 조회
    _permModify.fnSelectPermissionInfo();
}

// 모달 스콥 정의
var _permModify = {
    form : null,
    permissionId : "",
    itemTable : null,
    successCallback : null,
    validOption : {
        displayError : true,
        permissionName : {
            required : true
        }
    },
    // 소유자타입 변경시
    evtOwnerChange : function (item) {
        var _f = _permModify.form;

        var isUser = item.currentTarget.value == "USER";

        if (isUser) {
            // 소유자 아이디를 현재 로그인 사용자 아이디로 변경
            _f.binding({ownerId : enixClever.user.userInfo.userKey});

            // 그룹 선택 로우를 숨김
            _f.find("div[name=groupSelectDiv]").addClass("hidden");

        } else {
            // 그룹 선택 로우를 보임
            _f.find("div[name=groupSelectDiv]").removeClass("hidden");

        }
    },
    // 소유부서 선택
    evtSelectOwner : function () {
        enixClever.modal.load(
            constants.url.selectGroup,
            null,
            _permModify.fnSetOwner
        )
    },
    // 소유부서 설정
    fnSetOwner : function (groupInfo) {
        var _f = _permModify.form;
        _f.find("label[name=ownerName]").html(groupInfo.groupName);
        _f.binding({ownerId : groupInfo.groupId});

    },
    // 권한 상세 정보 조회
    fnSelectPermissionInfo : function() {
        enixClever.api.permission.selectPermissionInfo(this.permissionId, function (res) {
            var _info = res.data.permissionInfo;
            _permModify.form = $("form[name=permissionModifyForm]").enixForms(_permModify.validOption);
            _permModify.form.binding(_info);

            _permModify.itemTable.setData(_info.accessorList);
        });
    },
    // 대상 추가
    evtAddAccessor : function () {
        enixClever.modal.load(
            constants.url.selectAccessor,
            null,
            function (targetList) {
                _permModify.itemTable.addData(targetList);
            },
            true
        );
    },
    // 확인
    evtSubmitClick : function () {
        var formData = _permModify.form.toJson();
        var param = {
            permissionId : formData.permissionId,
            permissionName : formData.permissionName,
            isSystem : formData.isSystem,
            ownerId : formData.ownerId,
            ownerType : formData.ownerType,
            accessorList : _permModify.itemTable.getAccessorList()
        }

        enixClever.api.permission.modifyPermission(param, function (res) {
            enixClever.alert.success("권한 수정 완료");
            enixClever.modal.close();

            if (typeof _permModify.successCallback == "function") {
                _permModify.successCallback();
            }
        });
    },
    // 종료
    evtCancelClick : function () {
        enixClever.modal.close();
    }
}