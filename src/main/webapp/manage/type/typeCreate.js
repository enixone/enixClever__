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
        },
     	typeItemTag : {
		  	itemName : {
				 required : true
			 },
		 	itemId : {
				 required : true
			 },
			sortNo : {
				 required : true,
				 numericOnly : true
			 }
		 	
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
                itemName : $(item).find("input[name=itemName]").val(),
                itemId : $(item).find("input[name=itemId]").val(),
                sortNo : $(item).find("input[name=sortNo]").val(),
 
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
        initModal();
    },
    // 종료
    evtCancelClick : function () {
        enixClever.modal.close();
    },
    typeItemTag :
        '<tr>' +
        '   <td><input name="itemName" type="text" style="width:100%; border: 1px solid #e5e5e5"></td>' +
        '   <td><input name="itemId" type="text" style="width:100%; border: 1px solid #e5e5e5"></td>' +
        '	<td style="text-align:center;"><select name="sortNo">'+
		'    		<option value="1">1</option> '+
		'    		<option value="2">2</option> '+
		'    		<option value="3">3</option> '+
		'    		<option value="4">4</option> '+
		'    		<option value="5">5</option> '+
		'    		<option value="6">6</option> '+
		'    		<option value="7">7</option> '+
		'    		<option value="8">8</option> '+
		'    		<option value="9">9</option> '+
		'		</select></td>'+
        '	<td><img src="/enixClever/manage/assets/images/icon_minus.png" onclick="_typeCreate.evtDeleteTypeItem(this)" style="cursor:hand;"></td>' +
        '</tr>'
}
