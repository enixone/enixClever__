$(function() {
	

	$("#userName").focus();

	_permDetail.dataForm = $("form[name=permissionCreateForm]").enixForms();  
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
            colGroup : ["20px", "*","20px","20px","20px","20px","20px","20px","20px","16px"],
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
    selectUserList : function(){
        
	    let data = _permDetail.dataForm.toJson();
	   	
	   	initDataDivision();	

		enixClever.api.user.searchUserList(data, function (res) {
			_permDetail.dataTable.setsearchList(res.data.userList);
		    setDataDivision(res.data.userList);
		});
    },
    selectGroupList : function(){
        
	    let data = _permDetail.dataForm.toJson();
	   	initDataDivision();
		
	    enixClever.api.group.searchGroupList(data, function (res) {
	        _permDetail.dataTable.setGroupListData(res.data.groupList);
		    setDataDivision(res.data.groupList);
		});
    },
    selectRoleList : function(){
        
	    let data = _permDetail.dataForm.toJson();
	   	initDataDivision();
		
	    enixClever.api.role.searchRoleList(data, function (res) {
	
	        _permDetail.dataTable.setRoleListData(res.data.roleList);
		    setDataDivision(res.data.roleList);
		});
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
		
		evtSearchList();
		
	}
	return;
}

function evtSearchList() {

	listValue = $("input[name=keyword]").val();
	
	var searchPart = $("input[name=searchPart]:checked").val();
	
	if(listValue.length < 2){
		return alert("검색어는 두글자 이상 입력해야 합니다.");
	}
	
	if(searchPart == "ptUser"){
		
		initTableOption("ptUser");
		_permDetail.selectUserList();
		
	}else if(searchPart == "ptGroup"){
		
		initTableOption("ptGroup");
		_permDetail.selectGroupList();
		
	}else if(searchPart == "ptRole"){
		
		initTableOption("ptRole");
		_permDetail.selectRoleList();
		
	}
	return;
}



function initTableOption(searchPart){
	
	
	if(searchPart == "ptUser"){
		
		_permDetail.dataTable = $("div[name=selectDataDiv] table[name=dataListTable]")
	        .enixTable({
			header : ["성명", "직책","부서",""],
			colGroup : ["150px","200px","*","10px"],
	        colAlign : ["aCenter", "aCenter","aLeft","aCenter"],
	        displayMember : ["userName", "roleName","GroupName"],
	        tableClass : "table-listR",
	        callbackFunctions: {
	            rowDoubleClickCallback: evtUserDoubleClick,
	        }
	    });	
		
	}else if(searchPart == "ptGroup"){
		
		_permDetail.dataTable = $("div[name=selectDataDiv] table[name=dataListTable]")
	        .enixTable({
			header : ["부서명", "상위부서",""],
	        colGroup : ["200px","*","10px"],
	        colAlign : ["aCenter","aLeft","aCenter"],
	        displayMember : ["groupName", "parentGroupName"],
	        tableClass : "table-listR",
	        callbackFunctions: {
	            rowDoubleClickCallback: evtGroupDoubleClick,
	        }
	    });
		
	}else if(searchPart == "ptRole"){
		_permDetail.dataTable = $("div[name=selectDataDiv] table[name=dataListTable]")
	        .enixTable({
			header : ["직책명",""],
	        colGroup : ["*","10px"],
	        colAlign : ["aLeft","aCenter"],
	        displayMember : ["roleName"],
	        tableClass : "table-listR",
	        callbackFunctions: {      
	            rowDoubleClickCallback: evtRoleDoubleClick,
	        }
	    });
	}
	
    
}


function evtUserListRowClick(userInfo) {
	return;
}

function evtUserDoubleClick(userInfo) {
	
	_permCreate.itemTable.addData([{targetName : userInfo.userName, targetId : userInfo.userKey, targetType : "USER"}], true);
}

function evtGroupDoubleClick(groupInfo) {

	_permCreate.itemTable.addData([{targetName : groupInfo.groupName, targetId : groupInfo.groupId, targetType : "GROUP"}], true);
}

function evtRoleDoubleClick(roleInfo) {
		
	_permCreate.itemTable.addData([{targetName : roleInfo.roleName, targetId : roleInfo.roleId, targetType : "ROLE"}], true);
}

