$(function() {

});

/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
function initModal() {
    var data = {
        ownerId : enixClever.user.userInfo.userKey
    };

    // 콜백 지정
    _permCreate.successCallback = arguments[1];

    // 대상자 설정
    _permCreate.itemTable = $("form[name=permissionCreateForm] table[name=accessorListTable]")
        .enixAccessorList({
            noDataDiv : "form[name=permissionCreateForm] div[name=noDataMessage]"
        });

    // 소유자 변경 이벤트 수신
    $("form[name=permissionCreateForm] input[type=radio]").on("change", _permCreate.evtOwnerChange);

    // 폼 플러그인 초기화
    _permCreate.form = $("form[name=permissionCreateForm]").enixForms(_permCreate.validOption);
    _permCreate.form.binding(data);
}

// 모달 스콥 정의
var _permCreate = {
    form : null,
    itemTable : null,
    successCallback : null,
    validOption : {
        displayError : true,
        permissionName : {
            required : true
        }
    },
    evtOwnerChange : function (item) {
        var _f = _permCreate.form;

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
            _permCreate.fnSetOwner
        )
    },
    fnSetOwner : function (groupInfo) {
        var _f = _permCreate.form;
        _f.find("label[name=ownerName]").html(groupInfo.groupName);
        _f.binding({ownerId : groupInfo.groupId});

    },
    // 대상 추가
    evtAddAccessor : function () {
        enixClever.modal.load(
            constants.url.selectAccessor,
            null,
            function (targetList) {
                _permCreate.itemTable.addData(targetList);
            },
            true
        );
    },
    // 확인
    evtSubmitClick : function () {
        if (!_permCreate.form.validate()) {
            return;
        }

        var formData = _permCreate.form.toJson();

        var param = {
            permissionName : formData.permissionName,
            isSystem : formData.isSystem,
            ownerId : formData.ownerId,
            ownerType : formData.ownerType,
            accessorList : _permCreate.itemTable.getAccessorList()
        }

        // return;
        enixClever.api.permission.insertPermission(param, function (res) {
            enixClever.alert.success("권한 등록 완료");
            enixClever.modal.close();

            if (typeof _permCreate.successCallback == "function") {
                _permCreate.successCallback();
            }
        });
    },
    // 종료
    evtCancelClick : function () {
        enixClever.modal.close();
    }
}