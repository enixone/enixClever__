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

    tableOption = {
        header : ["문서 제목", "상태", "버전", "첨부", "등록자", "등록 일자"],
        data : [],
        displayMember : ["docName", "statusCodeName", "version", "fileCount", "creatorName", "createDate"],
        // orderKeyConv : ["docName", "statusCodeName", "version", "fileCount", "creatorName", "createDate"],
        orderKey : "seq",
        orderBy : "ASC",
        pageNo : 1,
        perPage : 10,
        sorting : false,
        checkBox : true,
        editBtn : false,
        // isPagination : true,
        // paginationDiv : $("#dataListPagination"),
        // headerTable : "#headerTable",
        scrolling : false,
        scrollingHeightPad : 247,
        callbackFunctions: {
            // orderChangedCallback : fnSearchDataList,
            // editBtnCallback : fnModifyUser
            // navigatePageCallback : fnSearchDataList
            rowClickCallback: evtDocListRowClick
        }
    };

    // 초기화
    fnInit();
});

var currentBoxId;
var treeObj;
var docListTable;
var tableOption;
var currentNode;
var currentFolderInfo;
var currentDocInfo;

/**
 * 초기화
 */
function fnInit() {

    // 루트 폴더 목록 조회
    fnSelectRootFolderList();

    // 테이블 초기화
    docListTable = $("#documentListTable").enixTable(tableOption);

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
    // enixClever.api.folder.selectRootFolderList(currentBoxId, function (res) {
    enixClever.api.folder.selectMyGroupFolderList(param, function (res) {
        console.info(res.data.rootList);
        var nodeList = enixTree.getFolderNodeListFromJson(res.data.rootList);

        if (nodeList.length > 0) {

            // 데이터 없음 숨김
            $("#emptyTreeMessage").addClass("hidden");

            // 트리 표시
            $("#groupBoxTree").removeClass("hidden");

            // 테스트 버튼 영역 보임 처리
            $("#treeTestDiv").removeClass("hidden");

            fnInitTree(nodeList);
        } else {
            // 데이터 없음 표시
            $("#emptyTreeMessage").removeClass("hidden");

            // 트리 표시 숨김
            $("#groupBoxTree").addClass("hidden");

            // 테스트 버튼 영역 보임 처리
            $("#treeTestDiv").addClass("hidden");

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
        // checkbox: true,
        selectMode: 3,
        // source: [{title : 'test1'}],
        source: nodeList,
        // source: {
        //     url:"https://cdn.rawgit.com/mar10/fancytree/72e03685/demo/ajax-tree-products.json"
        // },
        lazyLoad: function(event, data) {
            var parentNodeInfo = data.node.data;
            var _childParam = {
                parentFolderId : parentNodeInfo.folderId,
                userKey : enixClever.user.userInfo.userKey
            }
            // data.result = {url: "https://cdn.rawgit.com/mar10/fancytree/72e03685/demo/ajax-sub2.json"};
            enixClever.api.folder.selectChildFolderList(_childParam, function (res) {
                data.result = enixTree.getFolderNodeListFromJson(res.data.folderList);

            }, true);
        },
        activate: function(event, data) {
            currentFolderInfo = data.node.data;
            currentFolderInfo.fullPath = data.node.getPath();

            // Get a list of all selected nodes, and convert to a key array:
            var selKeys =
                $.map(data.tree.getSelectedNodes(), function(node) {
                    if(node.key != 0){
                        return node.key;
                    }
                });

            var rootstructures =
                $.map(selKeys, function(item){
                    var tempnode = data.tree.getNodeByKey(item);
                    var tempstructure = [];
                    tempstructure.push(data.tree.getNodeByKey(item).title);
                    while(tempnode.getParent().getParent()){
                        tempstructure.push(tempnode.getParent().title);
                        tempnode = tempnode.getParent();
                    }
                    tempstructure.reverse();
                    return tempstructure.join('/');
                });


            fnSelectFolderDocList();
        },
        select: function(event, data) {
            currentFolderInfo = data.node.data;
            currentFolderInfo.fullPath = data.node.getPath();

            fnSelectFolderDocList();
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
        contextMenu: {
            menu : function(node) {
                if (!node.folder) {
                    return {
                        'create' : { 'name' : 'folder option', 'icon' : 'paste'}
                    };
                } else {
                    return {
                        create : {name: "생성", icon: "edit", disabled : false},
                        update: {name: "수정", icon: "cut", disabled: false},
                        delete: {name: "삭제", icon: "delete", disabled : false}
                    }
                }
            },
            actions: function(node, action, options) {
            }
        }
    });
}

/**
 * [트리] 현재 선택된 노드레벨을 다시 로드한다
 */
function fnReloadParentTreeNode() {
    var parentNode = $("#groupBoxTree").fancytree("getActiveNode").parent;

    // 최상위 노드일경우
    if (parentNode.parent == undefined) {
        // 트리를 다시 조회 한다
        fnSelectRootFolderList();
    } else {
        // 변경된 노드의
        parentNode.resetLazy();
        parentNode.setExpanded();
    }
}

/**
 * [트리] 현재 선택된 노드레벨을 다시 로드한다
 */
function fnReloadChildTreeNode() {
    var parentNode = $("#groupBoxTree").fancytree("getActiveNode");
    parentNode.resetLazy();
    parentNode.setExpanded();
}

function fnSelectFolderDocList() {
    var _param = {
        folderId : currentFolderInfo.folderId,
        userKey : enixClever.user.userInfo.userKey
    };

    enixClever.api.doc.selectDocList(_param, function(res) {
        docListTable.setData(res.data.docList);
    });
}
/**
 * [테스트] 트리 루트 노드 추가 (고정값)
 */
function evtAddTreeNode() {
    var obj = [
        { title: "r1", lazy : true},
        { title: "r2", folder : true, lazy : true},
        { title: "FolderNode 3", folder : true, children : []}
    ];
    // groupBoxTree.getRootNode().addChildren(obj);
    $.ui.fancytree.getTree("#groupBoxTree").getRootNode().addChildren(obj);
    // $("#groupBoxTree").fancytree().getRootNode().addChildren(obj);

}

/**
 * [팝업] 루트 풀더 등록
 */
function evtCreateRootFolderPopup() {
    enixClever.modal.load(
        constants.url.folderCreate,
        {boxId : currentBoxId},
        null
    );
}

/**
 * [팝업] 자식 풀더 등록
 */
function evtCreateChildFolderPopup() {

    if (currentFolderInfo == undefined) {
        enixClever.alert.error("선택된 폴더가 없습니다");
        return;
    }

    enixClever.modal.load(
        constants.url.folderCreate,
        {
            boxId : currentBoxId,
            parentFolderId : currentFolderInfo.folderId,
            parentFolderName : currentFolderInfo.folderName,
            permissionId : currentFolderInfo.permissionId,
            permissionName : currentFolderInfo.permissionName
        },
        fnReloadChildTreeNode
    );
}

/**
 * [팝업] 폴더 수정
 */
function evtModifyFolderPopup() {

    if (currentFolderInfo == undefined) {
        enixClever.alert.error("선택된 폴더가 없습니다");
        return;
    }

    enixClever.modal.load(
        constants.url.folderModify,
        currentFolderInfo.folderId,
        fnReloadParentTreeNode
    );
}


/**
 * [팝업] 풀더 리네임
 */
function evtRenameFolderPopup() {
    enixClever.modal.load(
        constants.url.folderRename,
        currentFolderInfo,
        fnReloadParentTreeNode
    );
}

/**
 * [팝업] 폴더 삭제
 */
function evtDeleteFolderPopup() {
    enixClever.alert.confirm("폴더 삭제 확인", "'{0}'폴더를 삭제할까요?".format(currentFolderInfo.folderName), function() {
        enixClever.api.folder.deleteFolder(currentFolderInfo.folderId, function(res) {
            enixClever.alert.success("'{0}'폴더를 삭제했습니다".format(currentFolderInfo.folderName));
            fnReloadParentTreeNode();
        });
    });
}

/////////////////////////////////////////////////// 문서

function evtDocListRowClick(docInfo) {
    currentDocInfo = docInfo;
}

/**
 * [팝업] 문서 등록
 */
function evtCreateDocumentPopup() {
    enixClever.modal.load(
        constants.url.documentCreate,
        {
            folderId : currentFolderInfo.folderId,
            fullPath : currentFolderInfo.fullPath,
            permissionId : currentFolderInfo.permissionId,
            permissionName : currentFolderInfo.permissionName
        }, // 현재 선택된 폴더 정보를 넘긴다
        fnSelectFolderDocList
    );
}

/**
 * [팝업] 문서 수정
 */
function evtModifyDocumentPopup() {
    enixClever.modal.load(
        constants.url.documentModify,
        {
            docId : currentDocInfo.docId
        }, // 현재 선택된 폴더 정보를 넘긴다
        fnSelectFolderDocList
    );
}

