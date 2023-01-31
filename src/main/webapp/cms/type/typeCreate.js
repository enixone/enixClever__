$(function() {

});

/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
function initModal() {
    // 콜백 지정
    _typeCreate.successCallback = arguments[1];

    // 폼 플러그인 초기화
    _typeCreate.form = $("form[name=typeCreateForm]").enixForms(_typeCreate.validOption);
}

// 모달 스콥 정의
var _typeCreate = {
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
    evtAddTypeItem : function () {
        _typeCreate.form.find("table[name=typeItemListTable] tbody").append(_typeCreate.typeItemTag);
    },
    evtDeleteTypeItem : function (obj, evt) {
        $(obj).closest("tr").remove();
    },
    fnGetItemList : function (typeId) {
        var arr = [];

        $.each(_typeCreate.form.find("table[name=typeItemListTable] tbody tr"), function (idx, item) {
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
    // 확인
    evtSubmitClick : function () {
        if (!_typeCreate.form.validate()) {
            return;
        }

        var _typeData = _typeCreate.form.toJson();
        _typeData.typeItemList = _typeCreate.fnGetItemList(_typeData.typeId);

        enixClever.api.type.insertType(_typeData, function (res) {
            enixClever.alert.success("문서 유형 등록 완료");
            enixClever.modal.close();

            if (typeof _typeCreate.successCallback == "function") {
                _typeCreate.successCallback();
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
        '   <td><input name="itemId" type="text" class="form-control"></td>' +
        '   <td><input name="itemName" type="text" class="form-control"></td>' +
        '   <td><input name="sortNo" type="text" class="form-control"></td>' +
        '   <td><button type="button" onclick="_typeCreate.evtDeleteTypeItem(this)" class="mb-2 mr-2 btn-transition btn btn-outline-Danger">삭제</button></td>' +
        '</tr>'
}