$(function() {
	

	$("#userName").focus();

	_permDetail.dataForm = $("form[name=permissionModifyForm]").enixForms();

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
            displayMember : ["targetName","listView", "read", "update" ,"delete", "download", "edit", "print"],
            colGroup : ["20px", "*","20px","20px","20px","20px","20px","20px","20px","16px"],
            readonly : false,
            hover : false
    });

    // 소유자 변경 이벤트 수신
    $("form[name=permissionModifyForm] input[type=radio]").on("change", _permModify.evtOwnerChange);

    // 권한 상세 정보 조회
    _permModify.fnSelectPermissionInfo();
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

var _permModify = {
    form : null,
    permissionId : "",
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
            _permModify.fnSetOwner,
            "md-midium"
        )
    },
    fnSetOwner : function (groupInfo) {
        var _f = _permCreate.form;
        _f.find("label[name=ownerName]").html(groupInfo.groupName);
        _f.binding({ownerId : groupInfo.groupId});

    },

    // 권한 상세 정보 조회
    fnSelectPermissionInfo : function() {
        enixClever.api.permission.selectPermissionInfo(this.permissionId, function (res) {
            var _info = res.data.permissionInfo;
            _permModify.form = $("form[name=permissionModifyForm]").enixForms(_permModify.validOption);
            _permModify.form.binding(_info);
            

            _permModify.itemTable.setData(_info.accessorList, true);
        });
    },
    
    evtSelectUser : function() {

        enixClever.modal.load(
            constants.url.selectUserList,
            null,
            function (permissionInfo) {
                _permModify.form.binding({
                    permissionId : permissionInfo.permissionId,
                    permissionName : permissionInfo.permissionName
                });
            },"md-Xsmall"
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
          console.log("param>>>>>>>>>>>>>>>>>>",param);
            enixClever.alert.success("권한 수정 완료");
            fnSelectPermissionList();
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
	
	_permModify.itemTable.addData([{targetName : userInfo.userName, targetId : userInfo.userKey, targetType : "USER"}], true);
}

function evtGroupDoubleClick(groupInfo) {

	_permModify.itemTable.addData([{targetName : groupInfo.groupName, targetId : groupInfo.groupId, targetType : "GROUP"}], true);
}

function evtRoleDoubleClick(roleInfo) {
		
	_permModify.itemTable.addData([{targetName : roleInfo.roleName, targetId : roleInfo.roleId, targetType : "ROLE"}], true);
}

