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
    // 속성 항목 추가
    evtAddTypeItem : function () {
        _typeModify.form.find("table[name=typeItemListTable] tbody").append(_typeModify.fnGetTypeItemTag('', '', '1'));
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
                itemName : $(item).find("input[name=itemName]").val(),
                itemId : $(item).find("input[name=itemId]").val(),
                sortNo : $(item).find("select[name=sortNo]").val()
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

			let tempSelKey = "";

            $.each(_info.typeItemList, function (idx, item) {
                
                let tempVal = "";
                
                _typeModify.form
                    .find("table[name=typeItemListTable] tbody")
                    .append(_typeModify.fnGetTypeItemTag(item.itemName, item.itemId, item.sortNo));
                  
            });
        });
    },
    //sortNo 조회
    fnSortNo : function () {
		$(document).val("{{}}");
	},
    // 확인
    evtSubmitClick : function () {
        if (!_typeModify.form.validate()) {
            return;
        }

        var _typeData = _typeModify.form.toJson();
        _typeData.oldTypeId = this.typeId;
        _typeData.typeItemList = _typeModify.fnGetItemList(_typeData.typeId);

        enixClever.api.type.modifyType(_typeData, function (res) {
            
            if (typeof _typeModify.successCallback == "function") {
                _typeModify.successCallback();
            }
        	enixClever.alert.success("문서유형이 수정되었습니다.");
            enixClever.modal.close();
        });
     
    },
    // 종료
    evtCancelClick : function () {
        enixClever.modal.close();
    },
    
    
    // Type List를 얻는다
    fnGetTypeItemTag : function (itemName,itemId,sortNo) {
           
        let tempVal = "";
      	let tempSelKey = "";
      				          	
		for(i=1; i <= 10 ; i++) {
			tempSelKey = sortNo == i ?  "selected": "";
			tempVal = tempVal +	"<option value="+i+" "+tempSelKey+">"+i+"</option>";
		}
		
		let rtnValTypeItem = (
							'<tr>' +
					        '   <td><input name="itemName" type="text" style="width:100%; border: 1px solid #e5e5e5" value="{0}"></td>' +
					        '   <td><input name="itemId" type="text" style="width:100%; border: 1px solid #e5e5e5" value="{1}"></td>' +
					        '	<td style="text-align:center;"><select name="sortNo">{2}</select></td>'+
					        '	<td><img src="/enixClever/manage/assets/images/icon_minus.png" onclick="_typeModify.evtDeleteTypeItem(this)" style="cursor:hand;"></td>' +
					        '</tr>'
					        )  
					        .format(itemName, itemId, tempVal);
		

        return rtnValTypeItem;
       
    }, 
        
}