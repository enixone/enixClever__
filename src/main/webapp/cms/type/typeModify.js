$(function() {

});

/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
function initModal() {
    // 파라메터 저장 (문서 유형 아이디)
    _typeModify.typeId = arguments[0];

    // 콜백 지정
    _typeModify.successCallback = arguments[1];

    // 폼 플러그인 초기화
    _typeModify.form = $("form[name=typeModifyForm]").enixForms(_typeModify.validOption);

    // 문서 유형 정보 조회
    _typeModify.fnSelectTypeInfo();
}

// 모달 스콥 정의
var _typeModify = {
    typeId : "",
    form : null,
    itemTable : null,
    successCallback : null,
    validOption : {
        displayError : true,
        typeId : {
            required : true
        },
        typeName : {
            required : true
        }
    },
    // 속성 항목 추가
    evtAddTypeItem : function () {
        _typeModify.form.find("table[name=typeItemListTable] tbody").append(_typeModify.typeItemTag.format('', '', ''));

    },
    // 속성 항목 삭제
    evtDeleteTypeItem : function (obj, evt) {
        $(obj).closest("tr").remove();
    },
    // 속성 항목 목록 조회
    fnGetItemList : function (typeId) {
        var arr = [];

        $.each(_typeModify.form.find("table[name=typeItemListTable] tbody tr"), function (idx, item) {
            var typeItem = {
                typeId : typeId,
                itemId : $(item).find("input[name=itemId]").val(),
                itemName : $(item).find("input[name=itemName]").val(),
                sortNo : $(item).find("input[name=sortNo]").val()
            };
            arr.push(typeItem);
        });

        return arr;
    },
    // 속성 상세 정보 조회
    fnSelectTypeInfo : function () {
        enixClever.api.type.selectTypeInfo(this.typeId, function (res) {
            var _info = res.data.typeInfo;
            _typeModify.form.binding(_info);

            $.each(_info.typeItemList, function (idx, item) {
                _typeModify.form
                    .find("table[name=typeItemListTable] tbody")
                    .append(_typeModify.typeItemTag.format(item.itemId, item.itemName, item.sortNo));
            });
        });
    },
    // 확인
    evtSubmitClick : function () {
        if (!_typeCreate.form.validate()) {
            return;
        }

        var _typeData = _typeModify.form.toJson();
        _typeData.oldTypeId = this.typeId;
        _typeData.typeItemList = _typeModify.fnGetItemList(_typeData.typeId);

        enixClever.api.type.modifyType(_typeData, function (res) {
            enixClever.alert.success("문서 유형 등록 완료");
            enixClever.modal.close();

            if (typeof _typeModify.successCallback == "function") {
                _typeModify.successCallback();
            }
        });
    },
    // 종료
    evtCancelClick : function () {
        enixClever.modal.close();
    },
    typeItemTag :
        '<tr>' +
        // '   <td><input name="no" type="text" class="form-control"></td>' +
        '   <td><input name="itemId" type="text" class="form-control" value="{0}"></td>' +
        '   <td><input name="itemName" type="text" class="form-control" value="{1}"></td>' +
        '   <td><input name="sortNo" type="text" class="form-control" value="{2}"></td>' +
        '   <td><button type="button" onclick="_typeModify.evtDeleteTypeItem(this)" class="mb-2 mr-2 btn-transition btn btn-outline-Danger">삭제</button></td>' +
        '</tr>'
}