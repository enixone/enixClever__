$(function() {
	

	$("#userName").focus();

	_permDetail.dataForm = $("form[name=permissionCreateForm]").enixForms();
	_permDetail.dataTable = $("div[name=selectDataDiv] table[name=dataListTable]")
        .enixTable({
			header : ["성명", "부서","직책",""],
            colGroup : ["140px","160px","170px","*"],
            colAlign : ["aCenter", "aCenter","aCenter","aCenter"],
            tableClass : "table-list",
            data : [],
            hover : false,
           	displayMember : ["userName", "GroupName","roleName"],
            callbackFunctions: {
	            rowClickCallback: evtUserListRowClick,	      
	            rowDoubleClickCallback:evtRowDoubleClick,
	        }
    });	
      
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
    _permCreate.itemTable = $("div[class=accessorBox] table[name=accessorListTable]")
        .enixAccessorList({
            displayMember : ["targetName","listView", "read", "update" ,"delete", "download", "edit", "print"],
            colGroup : ["*", "40px","40px","40px","40px","40px","40px","40px"],
            noDataDiv : "form[name=permissionCreateForm] div[name=noDataMessage]",
            readonly : false,
            hover : false
        });

    // 소유자 변경 이벤트 수신
    $("form[name=permissionCreateForm] input[type=radio]").on("change", _permCreate.evtOwnerChange);

    // 폼 플러그인 초기화
    _permCreate.form = $("form[name=permissionCreateForm]").enixForms(_permCreate.validOption);
    _permCreate.form.binding(data);
    
}

var _permDetail = {
    dataTable : null,
    dataForm : null,
    selectUserList : function(searchText){
        
        let data = _permDetail.dataForm.toJson();
	   
	   
	 
	    initDataDivision();
		
	    enixClever.api.user.searchUserList(data, function (res) {
	       
	        _permDetail.dataTable.setsearchList(res.data.userList);
		    setDataDivision(res.data.userList);
		
		    
	    });
	    
	    //enixClever.api.user.userInfo()
    }
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
        },
        ownerName : {
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
            _permCreate.fnSetOwner,
            "md-midium"
        )
    },
    fnSetOwner : function (groupInfo) {
        var _f = _permCreate.form;
        _f.find("label[name=ownerName]").html(groupInfo.groupName);
        _f.binding({ownerId : groupInfo.groupId});

    },
    // 대상 추가
//    evtAddAccessor : function () {
//        enixClever.modal.load(
//            constants.url.selectSearchList,
//            null,
//            function (permissionInfo) {
//                _permCreate.createForm.binding({
//                    permissionId : permissionInfo.permissionId,
//                    permissionName : permissionInfo.permissionName
//                });
//            },"md-Wlarge"
//        )
//    },
    
    evtSelectUser : function() {

        enixClever.modal.load(
            constants.url.selectUserList,
            null,
            function (permissionInfo) {
                _permCreate.createForm.binding({
                    permissionId : permissionInfo.permissionId,
                    permissionName : permissionInfo.permissionName
                });
            },"md-Xsmall"
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
            fnSelectPermissionList()
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

/**
 * 엔터키 입력시 검색을 수행한다. 
 */
function evtKey(keyCode, selectValue) {
	if(keyCode == 13) {
		
		if(selectValue.length < 2){
			return alert("검색어는 두글자 이상 입력해야 합니다.");
		}
		_permDetail.selectUserList(selectValue);	
		
	}
	return;
}


/**
 * 엔터키 입력시 검색을 수행한다. 
 */
function evtSearchUser() {

	listValue = $("input[name=userName]").val();
	
	if(listValue.length < 2){
		return alert("검색어는 두글자 이상 입력해야 합니다.");
	}
	_permDetail.selectUserList(listValue);	
	
	return;
}

var currentuserInfo = null;
function evtUserListRowClick(userInfo) {
	currentuserInfo = userInfo;
	_permCreate.itemTable.addData([{targetName : userInfo.userName, targetId : userInfo.userKey, targetType : "USER"}], true);
}

function evtRowDoubleClick(userInfo) {
	//evtUserListRowClick(userInfo);
}

