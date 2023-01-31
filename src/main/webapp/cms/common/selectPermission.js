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
    _selectPermission.permissionTable = $("div[name=selectPermissionDiv] table[name=permissionListTableM]")
        .enixTable({
            header : ["권한명칭", "생성자", "마지막 적용일"],
            displayMember : ["permissionName", "ownerName", "lastAssignDate"],
            colGroup : ["*","120px","120px"],
            colAlign : ["aLeft", "aCenter", "aCenter"],
            orderKey : "createDate",
        	orderBy : "DESC",
            tableClass : "table-listM",
            clickFirstRow : true,
            callbackFunctions: {
                rowClickCallback: _selectPermission.evtSelectAccessorList
            } 
    });

    // 대상자 목록 플러그인 초기화
	_selectPermission.accessorTable = $("div[name=selectPermissionDiv] table[name=accessorListTable]")
	        .enixTable({
	            colGroup : ["30px","*","280px"],
	            colAlign : ["aCenter", "aLeft","aCenter"],
	    });

    // 사용 가능한 권한 목록 조회
    _selectPermission.fnSelectAvailablePermissionList();
}


// 모달 스콥 정의
var _selectPermission = {
    currentPermission : null,
    currentAccessorList : null,
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

		initDataDivision();
		    
        enixClever.api.permission.selectPermissionInfo(data.permissionId, function (res) {
        	
        	_selectPermission.currentAccessorList = res.data.permissionInfo.accessorList;
        	
        	_selectPermission.accessorTable.setPermissionData(_selectPermission.currentAccessorList);
		    setDataDivision(_selectPermission.currentAccessorList);
		    
		});
    },
    
    
    // 새로만들기 - 권한을 새로 만든다. 
    evtCreatePermissionPopup : function () {
      
    	enixClever.modal.load(
	        constants.url.permissionCreate,
	        null,
	        null,
	        "md-large"
   	 	);
    },
    
    // 확인
    evtSubmitClick : function () {

        if (_selectPermission.currentPermission == undefined) {
            enixClever.alert.warn("권한 선택 오류", "선택한 권한이 없습니다.");
            return;
        }

        enixClever.modal.close();


        if (typeof this.successCallback == "function") {
            this.successCallback(this.currentPermission, this.currentAccessorList);
        }
    },
    // 종료
    evtCancelClick : function () {
        enixClever.modal.close();
    }
}