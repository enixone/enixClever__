$(document).ready(function () {


    /*
        BOX_PRIVATE
        BOX_GROUP
        BOX_GLOBAL_GROUP
        BOX_SHARE
     */
    currentBoxId = "BOX_GROUP";
    currentFolderInfo = null;
    treeObj = null;
    currentNode = null;
    currentDocInfo = null;

    fnInit();
});

var currentBoxId;
var treeObj;
var currentNode;
var currentFolderInfo;
var contextNode;

/**
 * 초기화
// */
function fnInit() {
	// 루트 폴더 목록 조회
    fnSelectRootFolderList();
}

/**
 * 루트 폴더 목록 조회
 */
function fnSelectRootFolderList() {
    var param = {
        boxId : currentBoxId,
        userKey : enixClever.user.userInfo.userKey
    };

	// 루트 폴더 조회
    enixClever.api.folder.selectRootFolderList(param, function (res) {
        var nodeList = enixTree.getFolderNodeListFromJson(res.data.rootList);

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
        selectMode: 3,
        source: nodeList,
        checkbox: false,
        autoSize: false,
        fitToView: false,
        minHeight: 300,
        maxHeight: 300,

        lazyLoad: function(event, data) {
			
			var parentNodeInfo = data.node.data;
            var _childParam = {
                boxId : currentBoxId,
                parentFolderId : parentNodeInfo.folderId,
                userKey : enixClever.user.userInfo.userKey
            }
            
            enixClever.api.folder.selectChildFolderList(_childParam, function (res) {
                data.result = enixTree.getFolderNodeListFromJson(res.data.folderList);

            }, true);
        },
        activate: function(event, data) {
	
			currentFolderInfo = data.node.data;
            currentFolderInfo.fullPath = data.node.getPath();
			
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
	        currentFolderInfo = data.node.data;
            currentFolderInfo.fullPath = data.node.getPath();
        }
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
        fnSelectRootFolderList();
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

    if (contextNode != undefined) {
        contextNode.resetLazy();
        contextNode.setExpanded();
    }
}



/**
 * 확인시 선택한 폴더를 가져온다.
 */
function evtSubmitClick() {
    
    document.forms[0].folderName.value = currentFolderInfo.fullPath;
    document.forms[0].folderId.value = currentFolderInfo.folderId;
    
    enixClever.modal.close();
}


/**
 * 모들 닫기
 */
function evtCancelClick() {
    enixClever.modal.close();
}



