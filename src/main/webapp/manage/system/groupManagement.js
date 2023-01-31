$(document).ready(function () {


    /*
        BOX_PRIVATE
        BOX_GROUP
        BOX_GLOBAL_GROUP
        BOX_SHARE
     */
    currentGroupId = "BOX_GROUP";
    currentgroupInfo = null;
    treeObj = null;
    currentNode = null;
    currentDocInfo = null;

    fnInit();
});


var currentGroupId;
var treeObj;
var currentNode;
var currentgroupInfo;
var contextNode;

var userListTable;
var statusCode;
var userListTableOption = {
    header : ["이름","아이디","직급","역할","전화번호","등록일","상태"],
    data : [],
    displayMember : ["userName", "userKey","positionName","roleName", "telNo", "createDate", "statusName"],
    colAlign : ["aLeft","aCenter","aCenter","aCenter","aLeft","aCenter", "aCenter"],
    colGroup : ["100px","140px","100px","160px","140px","140px","*"],
    orderKey : "EU.CREATE_DATE",
    orderBy : "DESC",
    statusCode : null,
    pageNo : 1,
    perPage : 10,
    checkBox : false,
    scrolling : false,
    nowTime : "0000-00-00 00:00:00",
    scrollingHeightPad : 247,
    isPagination : true,
    tableClass : "table-listR",
    paginationDiv : $("#userListPagination"),
    noDataDiv : $("#userManagementNoUserMessage"),
    callbackFunctions: {
        navigatePageCallback : fnSelectActive,
		rowDoubleClickCallback : evtUserListRowClick
		

       	
    }
};


/**
 * 초기화
 */
function fnInit() {
     userListTable = $("#userListTable").enixTable(userListTableOption);
    
    // 루트 폴더 목록 조회
    fnSelectRootGroupList();
}


var _param = null;
function fnSelectActive(ActiveId) {

	ActiveId = currentgroupInfo.groupId;
	_param = userListTable.getPagination();
	_param.statusCode = currentgroupInfo.groupId;

	// 선택된 사용자 목록
    enixClever.api.user.selectgroupMember(ActiveId, _param, function (res) {
   
        userListTable.setData(res.data.userList);
   		userListTable.setNowTime(res.now);
        userListTable.setPagination(res.paging);
    });
    
}

/**
 * 루트 폴더 목록 조회
 */
function fnSelectRootGroupList() {
  
    var param = {
        boxId : currentGroupId,
        groupId : currentGroupId,
        userKey : enixClever.user.userInfo.userKey
    };
    
	// 최상위 부서 조회
	enixClever.api.group.selectRootGroupList(param, function (res) {
        var nodeList = enixTree.getGroupNodeListFromJson(res.data.rootList);

		if (nodeList.length > 0) {

            // 데이터 없음 숨김
            $("#emptyTreeMessage").removeClass("hidden");

            // 트리 표시
            $("#groupBoxTree").removeClass("hidden");
        
            fnInitTree(nodeList);
            
        } else {
            // 데이터 없음 표시
            $("#emptyTreeMessage").removeClass("hidden");

            // 트리 표시 숨김
            $("#groupBoxTree").addClass("hidden");

        }
    });
    
}

function fnInitTree(nodeList) {

    if (treeObj != undefined) {
        $(treeObj).fancytree("getTree").reload(nodeList);
        return;
    }

    treeObj = $("#groupBoxTree").fancytree({
        extensions: ["contextMenu"],
        selectMode: 3,
        source: nodeList,
        checkbox: false,
        autoSize: true,
        fitToView: false,
        minHeight: 600,
        maxHeight: 2048,
        
        lazyLoad: function(event, data) {
			var parentNodeInfo = data.node.data;
            var _childParam = {
               	groupId : currentGroupId,
                parentGroupId : parentNodeInfo.groupId,
                userKey : enixClever.user.userInfo.userKey
            }
            
            enixClever.api.group.selectChildGroupList(parentNodeInfo.groupId, function (res) {
                data.result = enixTree.getGroupNodeListFromJson(res.data.groupList);

            }, true);
            
        },
        activate: function(event, data) {
            
            currentgroupInfo = data.node.data;
            currentgroupInfo.fullPath = data.node.getPath();
			
			fnSelectGroupList(currentgroupInfo.groupId);
			fnSelectActive(currentgroupInfo.groupId);
				
			
        },
        loadChildren : function (event, data) {
            // 최상위 노드일경우
            if (data.node.parent == undefined) {
                var node = data.node.children[0];

                // 자식노드가 있을 경우
                if (node.data.childCount > 0) {
                    // 자식 노드 조회
                    data.node.children[0].setExpanded(true);

                    // 현재 노드 선택
                    data.node.children[0].setActive(true);
                } else {
                    // 현재 노드 선택
                    data.node.children[0].setSelected(true);
                }
            }

        },
        select: function(event, data) {
			
            currentgroupInfo = data.node.data;
            currentgroupInfo.fullPath = data.node.getPath();
            
	        // 문서 조회회
            fnSelectGroupList();
        },
        contextMenu: {
            menu : function(node) {
                var _groupInfo = node.data;
                var _permission = node.data.permissionInfo;
                
                if (!node.group) {
                    return {
                        'create' : { 'name' : '생성', 'icon' : 'add'},
                        'update' : { 'name' : '수정', 'icon' : 'edit'},
                        'delete' : { 'name' : '삭제', 'icon' : 'delete'}
                    };
                } else {
                    return {
                        create : {name: "생성", icon: "add", disabled : !_permission.create},
                        update: {name: "수정", icon: "edit", disabled: (_groupInfo.isSystem == "Y" || !_permission.update)},
                        delete: {name: "삭제", icon: "delete", disabled : (_groupInfo.isSystem == "Y" || !_permission.delete)},
                    }
                }
            },
            actions: function(node, action, options) {
                contextNode = node;

                switch (action) {
                    case "create" :
                        evtCreateChildGroupPopup(node.data);
                        break;
                    case "update" :
                        evtModifyGroupPopup(node.data);
                        break;
                    case "delete" :
                        evtDeleteGroupPopup(node.data);
                        break;
                    case "read" :
                        // evtCreateChildGroupPopup(node.data);
                        break;
                    case "bookmark" :
                        fnInsertBookmarkGroup(node.data);
                        break;
                }
            }
        }
    });
}

/**
 * [트리] 폴더 북마크 추가
 * @param groupInfo
 */
function fnInsertBookmarkGroup(groupInfo) {

    enixClever.alert.confirm("폴더 관심 추가알림", "'{0}'폴더를 관심폴더로 추가할까요?".format(groupInfo.groupName), function() {
        enixClever.api.group.insertBookmark(groupInfo.groupId, function(res) {
            enixClever.alert.success("'{0}'폴더를 관심폴더로 추가했습니다".format(groupInfo.groupName));
        });
    });
}


/**
 * [트리] 현재 선택된 노드레벨을 다시 로드한다
 */
function fnReloadParentTreeNode() {
    var _parent = contextNode.parent;

    // 최상위 노드일경우
    if (_parent.parent == undefined) {
        // 트리를 다시 조회 한다
        fnSelectRootGroupList();
    } else {
        // 변경된 노드의
        _parent.resetLazy();
        _parent.setExpanded();
    }
}

/**
 * [트리] 현재 선택된 노드레벨을 다시 로드한다
 */
function fnReloadChildTreeNode() {
    // var parentNode = $("#groupBoxTree").fancytree("getActiveNode");
    // parentNode.resetLazy();
    // parentNode.setExpanded();

    if (contextNode != undefined) {
        contextNode.resetLazy();
        contextNode.setExpanded();
    }
}

/**
 * [팝업] 자식 풀더 등록
 */
function evtCreateChildGroupPopup(groupInfo) {
	
	if(groupInfo){
		groupInfo = currentgroupInfo;
	}
	
    enixClever.modal.load(
        constants.url.groupCreate,
        {
            groupId : currentGroupId,
            parentGroupId : groupInfo.groupId,
            parentGroupName : groupInfo.groupName,
            //permissionId : groupInfo.permissionId,
            //permissionName : groupInfo.permissionName
        },
        fnReloadChildTreeNode,
        "md-XXSsmall"
    );
}

/**
 * [팝업] 폴더 수정
 */
function evtModifyGroupPopup(groupInfo) {
   
   if(groupInfo) {
	   groupInfo = currentgroupInfo;
   }
   
    enixClever.modal.load(
        constants.url.groupModify,
        {
			groupId: groupInfo.groupId,
			groupName : groupInfo.groupName,
			parentGroupId : groupInfo.parentGroupId,
            parentGroupName : groupInfo.parentGroupName,
		},
        fnReloadParentTreeNode,
        "md-XXSsmall"
    );
}


/**
 * [팝업] 풀더 리네임
 */
function evtRenameGroupPopup(groupInfo) {
    enixClever.modal.load(
        constants.url.groupRename,
        groupInfo,
        fnReloadParentTreeNode
    );
}

/**
 * [팝업] 폴더 삭제
 */
function evtDeleteGroupPopup(groupInfo) {
	
 	if(groupInfo) {
	   groupInfo = currentgroupInfo;
   }
	
    enixClever.alert.confirm("부서 삭제 확인", "'{0}'부서를 삭제할까요?".format(groupInfo.groupName), function() {
        enixClever.api.group.deleteGroup(groupInfo.groupId, function(res) {
            enixClever.alert.success("'{0}'부서를 삭제했습니다".format(groupInfo.groupName));
            fnReloadParentTreeNode();
        });
    });
}


function fnSelectGroupList(){
	$('#groupName').text(currentgroupInfo.groupName);
	$('#groupId').text(currentgroupInfo.groupId);
	$('#fullPath').text(currentgroupInfo.fullPath);
	$('#statusCodeName').text(currentgroupInfo.statusCodeName);
	$('#createDate').text(currentgroupInfo.createDate);
	$('#updateDate').text(currentgroupInfo.updateDate);
}

