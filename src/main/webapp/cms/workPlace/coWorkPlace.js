$(document).ready(function () {


    /*
        BOX_PRIVATE
        BOX_GROUP
        BOX_GLOBAL_GROUP
        BOX_SHARE
     */
    currentBoxId = "BOX_SHARE";
    currentFolderInfo = null;
    treeObj = null;
    currentNode = null;
    currentDocInfo = null;

    tableOption = {
        header : ["문서 제목", "상태", "버전", "첨부", "등록자", "등록 일자"],
        data : [],
        displayMember : ["docName", "statusCodeName", "version", "fileCount", "creatorName", "createDate"],
        orderKey : "ED.CREATE_DATE",
        orderBy : "DESC",
        pageNo : 1,
        perPage : 10,
        checkBox : true,
        clickFirstRow : true,
        isPagination : true,
        paginationDiv : $("#docListPagination"),
        noDataDiv : $("#groupPlaceNoDocMessage"),
        callbackFunctions: {
            // orderChangedCallback : fnSearchDataList,
            // editBtnCallback : fnModifyUser
            // navigatePageCallback : fnSearchDataList
            rowClickCallback: evtDocListRowClick
        }
    };

    // 문서 상세 폼 로드
    $("div[name=docDetail]").load(constants.url.documentDetail + "?ranToken=" + Math.random(), function() {
        loadScript(function() {
            initDetail();
        });

        // 초기화
        fnInit();
    });
});

var currentBoxId;
var treeObj;
var docListTable;
var tableOption;
var currentNode;
var currentFolderInfo;
var currentDocInfo;
var contextNode;

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
    enixClever.api.folder.selectRootFolderList(param, function (res) {
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
        selectMode: 3,
        source: nodeList,
        lazyLoad: function(event, data) {
            var parentNodeInfo = data.node.data;
            var _childParam = {
                boxId : currentBoxId,
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


            // 문서 조회회
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
        select: function(event, data) {
            currentFolderInfo = data.node.data;
            currentFolderInfo.fullPath = data.node.getPath();


            // 문서 조회회
            fnSelectFolderDocList();
        },
        contextMenu: {
            menu : function(node) {
                var _folderInfo = node.data;
                var _permission = node.data.permissionInfo;

                if (!node.folder) {
                    return {
                        'create' : { 'name' : 'folder option', 'icon' : 'paste'}
                    };
                } else {
                    return {
                        create : {name: "생성", icon: "add", disabled : !_permission.create},
                        update: {name: "수정", icon: "edit", disabled: (_folderInfo.isSystem == "Y" || !_permission.update)},
                        delete: {name: "삭제", icon: "delete", disabled : (_folderInfo.isSystem == "Y" || !_permission.delete)},
                        bookmark: {name: "북마크", icon: "paste", disabled : (_folderInfo.isSystem == "Y" || !_permission.read)},
                        // read: {name: "속성보기", icon: "paste", disabled : !_permission.read}
                    }
                }
            },
            actions: function(node, action, options) {
                contextNode = node;

                switch (action) {
                    case "create" :
                        evtCreateChildFolderPopup(node.data);
                        break;
                    case "update" :
                        evtModifyFolderPopup(node.data);
                        break;
                    case "delete" :
                        evtDeleteFolderPopup(node.data);
                        break;
                    case "read" :
                        // evtCreateChildFolderPopup(node.data);
                        break;
                    case "bookmark" :
                        fnInsertBookmarkFolder(node.data);
                        break;
                }
            }
        }
    });
}

/**
 * [트리] 폴더 북마크 추가
 * @param folderInfo
 */
function fnInsertBookmarkFolder(folderInfo) {

    enixClever.alert.confirm("폴더 관심 추가알림", "'{0}'폴더를 관심폴더로 추가할까요?".format(folderInfo.folderName), function() {
        enixClever.api.folder.insertBookmark(folderInfo.folderId, function(res) {
            enixClever.alert.success("'{0}'폴더를 관심폴더로 추가했습니다".format(folderInfo.folderName));
        });
    });
}

/**
 * [트리] 현재 선택된 노드레벨을 다시 로드한다
 */
function fnReloadParentTreeNode() {
    // var parentNode = $("#groupBoxTree").fancytree("getActiveNode").parent;
    //
    // // 최상위 노드일경우
    // if (parentNode.parent == undefined) {
    //     // 트리를 다시 조회 한다
    //     fnSelectRootFolderList();
    // } else {
    //     // 변경된 노드의
    //     parentNode.resetLazy();
    //     parentNode.setExpanded();
    // }
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
    // var parentNode = $("#groupBoxTree").fancytree("getActiveNode");
    // parentNode.resetLazy();
    // parentNode.setExpanded();

    if (contextNode != undefined) {
        contextNode.resetLazy();
        contextNode.setExpanded();
    }
}

/**
 * 선택된 폴더의 문서를 조회한다
 */
function fnSelectFolderDocList() {
    currentDocInfo = null;

    var _param = docListTable.getPagination();
    _param.folderId = currentFolderInfo.folderId;
    _param.userKey = enixClever.user.userInfo.userKey;

    enixClever.api.doc.selectDocList(_param, function(res) {
        docListTable.setData(res.data.docList);
        docListTable.setPagination(res.paging);
    });
}

/**
 * [팝업] 자식 풀더 등록
 */
function evtCreateChildFolderPopup(folderInfo) {

    enixClever.modal.load(
        constants.url.folderCreate,
        {
            boxId : currentBoxId,
            parentFolderId : folderInfo.folderId,
            parentFolderName : folderInfo.folderName,
            permissionId : folderInfo.permissionId,
            permissionName : folderInfo.permissionName
        },
        fnReloadChildTreeNode
    );
}

/**
 * [팝업] 폴더 수정
 */
function evtModifyFolderPopup(folderInfo) {

    enixClever.modal.load(
        constants.url.folderModify,
        folderInfo.folderId,
        fnReloadParentTreeNode
    );
}


/**
 * [팝업] 풀더 리네임
 */
function evtRenameFolderPopup(folderInfo) {
    enixClever.modal.load(
        constants.url.folderRename,
        folderInfo,
        fnReloadParentTreeNode
    );
}

/**
 * [팝업] 폴더 삭제
 */
function evtDeleteFolderPopup(folderInfo) {
    enixClever.alert.confirm("폴더 삭제 확인", "'{0}'폴더를 삭제할까요?".format(folderInfo.folderName), function() {
        enixClever.api.folder.deleteFolder(folderInfo.folderId, function(res) {
            enixClever.alert.success("'{0}'폴더를 삭제했습니다".format(folderInfo.folderName));
            fnReloadParentTreeNode();
        });
    });
}

/////////////////////////////////////////////////// 문서

/**
 * 문서 클릭
 * @param docInfo
 */
function evtDocListRowClick(docInfo) {
    currentDocInfo = docInfo;

    _docDetail.selectDocInfo(docInfo.docId);
}

/**
 * [팝업] 문서 등록
 */
function evtCreateDocumentPopup() {

    if (!currentFolderInfo.permissionInfo.create) {
        enixClever.alert.error("문서 생성 권한이 없습니다.");
        return;
    }

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

    if (currentDocInfo == undefined) {
        enixClever.alert.error("선택된 문서가 없습니다.");
        return;
    } else if (!currentDocInfo.permissionInfo.update) {
        enixClever.alert.error("문서 수정 권한이 없습니다.");
        return;
    }

    enixClever.modal.load(
        constants.url.documentModify,
        {
            docId : currentDocInfo.docId
        }, // 현재 선택된 폴더 정보를 넘긴다
        fnSelectFolderDocList
    );
}

/**
 * 문서 삭제
 */
function evtDeleteDocumentPopup() {
    if (currentDocInfo == undefined) {
        enixClever.alert.error("선택된 문서가 없습니다.");
        return;
    } else if (!currentDocInfo.permissionInfo.delete) {
        enixClever.alert.error("문서 삭제 권한이 없습니다.");
        return;
    }

    enixClever.alert.confirm("문서 삭제 확인", "'{0}'문서를 삭제할까요?".format(currentDocInfo.docName), function() {
        enixClever.api.doc.trashDoc(currentDocInfo.docId, function(res) {
            enixClever.alert.success("'{0}'문서를 삭제했습니다".format(currentDocInfo.docName));
            fnSelectFolderDocList();
        });
    });

}


/**
 * 문서 북마크
 */
function evtBookmarkDocument() {
    if (currentDocInfo == undefined) {
        enixClever.alert.error("선택된 문서가 없습니다.");
        return;
    }

    enixClever.alert.confirm("문서 북마크 확인", "'{0}'문서를 북마크할까요?".format(currentDocInfo.docName), function() {
        enixClever.api.doc.insertBookmark(currentDocInfo.docId, function(res) {
            enixClever.alert.success("'{0}'문서를 북마크했습니다".format(currentDocInfo.docName));
        })
    });

}