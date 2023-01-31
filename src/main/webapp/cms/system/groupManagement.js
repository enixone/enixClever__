$(document).ready(function () {


    treeObj = null;
    currentNode = null;
    currentGroupInfo = null;
    currentBoxId = null;
    contextNode = null;
    // 초기화
    fnInit();
});

var treeObj;
var currentBoxId;
var contextNode;
var currentNode;
var currentGroupInfo;
var groupDetailDivForm;
// var groupUserListDiv;
var groupUserListOption = {
    checkbox : false,
    icon : true,
    iconTag : '<h4 class="mb-0"><i class="metismenu-icon pe-7s-user"></i></h4>',
    displayKey : "userName"
}
/**
 * 초기화
 */
function fnInit() {
    groupDetailDivForm = $("form[name=groupInfoDiv]").enixForms();

    // groupUserListDiv = $("div[name=groupUserListDiv]").enixList(groupUserListOption);

    // 문서함 목록 조회
    fnLoadBox();
}

/**
 * 문서함 목록 조회
 */
function fnLoadBox() {
    enixClever.api.box.selectBoxList(function (res) {
        // 문서함 목록 출력
        fnDisplayBoxList(res.data.boxList);
    });
}

/**
 * 문서함 목록 버튼으로 출력
 * @param boxList
 */
function fnDisplayBoxList(boxList) {
    $("#tabListDiv").empty();

    var i = 0;
    $.each(boxList, function (idx, box) {
        if (box.boxId === "BOX_PRIVATE" || box.boxId === "BOX_GLOBAL_GROUP") return true;
        var activeTabTag = (i == 0) ? "active" : "";
        var boxTab = $('<li class="nav-item" onclick="evtBoxClick(this)"><a data-toggle="tab" class="nav-link {0}">{1}</a></li>"'.format(activeTabTag, box.boxName));
        boxTab.data(box);
        $("#tabListDiv").append(boxTab);

        if (i++ === 0) {
            $(boxTab).click();
        }

        // var boxBtn = $('<button class="btn-shadow btn btn-primary ml-2 mt-2" onclick="evtBoxClick(this)">{0}</button>'.format(box.boxName));
        // boxBtn.data(box);
        //
        // $("#boxListDiv").append(boxBtn);
        //
        // if (i++ === 0) {
        //     $(boxBtn).click();
        // }
    });
}

/**
 * 문서함 클릭 (문서함 루트 폴더 조회)
 * @param boxId
 */
function evtBoxClick(sender) {
    var _data = $(sender).data();
    currentBoxId = _data.boxId;

    // 현재 문서함 표시 이름 갱신
    // $("#boxNameLabel").html(_data.boxName);

    // 루트 폴더 조회
    fnSelectRootGroupList();
}

/**
 * 최상위 부서를 조회한다
 */
function fnSelectRootGroupList() {
    // 루트 폴더 조회
    enixClever.api.group.selectRootGroupList(currentBoxId, function (res) {
        var nodeList = enixTree.getGroupNodeListFromJson(res.data.rootList);

        if (nodeList.length > 0) {
            // 데이터 없음 숨김
            $("#emptyTreeMessage").addClass("hidden");

            // 트리 표시
            $("#groupTree").removeClass("hidden");

            // 테스트 버튼 영역 보임 처리
            $("#treeTestDiv").removeClass("hidden");

            fnInitTree(nodeList);
        } else {
            // 데이터 없음 표시
            $("#emptyTreeMessage").removeClass("hidden");

            // 트리 표시 숨김
            $("#groupTree").addClass("hidden");

            // 테스트 버튼 영역 보임 처리
            $("#treeTestDiv").addClass("hidden");
        }
    });
}

/**
 * 부서 트리 초기화
 * @param nodeList
 */
function fnInitTree(nodeList) {
    if (treeObj != undefined) {
        $("#groupTree").fancytree("getTree").reload(nodeList);
        return;
    }

    treeObj = $("#groupTree").fancytree({
        extensions: ["contextMenu"],
        selectMode: 3,
        source: nodeList,
        lazyLoad: function(event, data) {
            var parentGroupInfo = data.node.data;

            enixClever.api.group.selectChildGroupList(parentGroupInfo.groupId, function (res) {
                data.result = enixTree.getGroupNodeListFromJson(res.data.groupList);

            }, true);
        },
        // 폴더 선택 (활성화)
        activate: function(event, data) {
            currentNode = data.node;
            currentGroupInfo = data.node.data;
            currentGroupInfo.fullPath = data.node.getPath();

            // 그룹 상세조회
            fnSelectGroupDetail(currentGroupInfo.groupId);
        },
        select: function(event, data) {
            currentNode = data.node;
            currentGroupInfo = data.node.data;
            currentGroupInfo.fullPath = data.node.getPath();

            // 그룹 상세조회
            fnSelectGroupDetail(currentGroupInfo.groupId);
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
        contextMenu : {
            menu : function(node) {
                return {
                    create : {name: "생성", icon: "add"},
                    update: {name: "수정", icon: "edit"},
                    delete: {name: "삭제", icon: "delete"},
                }

            },
            actions : function(node, action, options) {
                contextNode = node;

                switch (action) {
                    case "create" :
                        evtCreateGroupPopup(node.data);
                        break;
                    case "update" :
                        evtModifyGroupPopup(node.data);
                        break;
                    case "delete" :
                        evtDeleteGroupPopup(node.data);
                        break;
                    case "read" :
                        // evtCreateChildFolderPopup(node.data);
                        break;
                }
            }
        }
    });
}

/**
 * [트리] 현재 선택된 노드레벨을 다시 로드한다
 */
function fnReloadParentTreeNode() {
    // var parentNode = $("#groupTree").fancytree("getActiveNode").parent;
    // var parentNode = currentNode.parent;

    var _parent = contextNode.parent;

    // 최상위 노드일경우
    if (_parent.parent == undefined) {
        // 최상위 부서를 조회한다
        fnSelectRootGroupList();
    } else {
        _parent.resetLazy();
        _parent.setExpanded();

    }

}

/**
 * [트리] 현재 선택된 노드레벨을 다시 로드한다
 */
function fnReloadChildTreeNode() {
    // var parentNode = $("#groupTree").fancytree("getActiveNode");
    if (contextNode != undefined) {
        contextNode.resetLazy();
        contextNode.setExpanded();
    }
}

/**
 * [팝업] 루트 부서 등록
 */
function evtCreateRootGroupPopup() {
    enixClever.modal.load(
        constants.url.groupCreate,
        {boxId : currentBoxId},
        null
    );
}

/**
 * [팝업] 하위 부서 등록
 */
function evtCreateGroupPopup(groupInfo) {

    enixClever.modal.load(
        constants.url.groupCreate,
        {
            boxId : currentBoxId,
            parentGroupName : groupInfo.groupName,
            parentGroupId : groupInfo.groupId
        },
        fnReloadChildTreeNode
    );
}

/**
 * [팝업] 부서 수정
 */
function evtModifyGroupPopup(groupInfo) {

    enixClever.modal.load(
        constants.url.groupModify,
        groupInfo,
        fnReloadParentTreeNode
    );
}

/**
 * [팝업] 부서 삭제
 */
function evtDeleteGroupPopup(groupInfo) {
    enixClever.alert.confirm("부서 삭제 확인", "'{0}'부서를 삭제할까요?".format(groupInfo.groupName), function() {
        enixClever.api.group.deleteGroup(groupInfo.groupId, function(res) {
            enixClever.alert.success("'{0}'그룹을 삭제했습니다".format(groupInfo.groupName));
            fnReloadParentTreeNode();
        });
    });
}


/**
 * 그룹 상세 조회
 * @param groupId
 */
function fnSelectGroupDetail(groupId) {

    enixClever.api.group.selectGroupInfo(groupId, function (res) {
        var groupInfo = res.data.groupInfo;
        if (groupInfo.parentGroupName == undefined) groupInfo.parentGroupName = "-";
        if (groupInfo.updateDate == undefined) groupInfo.updateDate = "-";

        groupDetailDivForm.binding(res.data.groupInfo);

        // $("label[name=groupUserCountLabel]").html("({0}명)".format(res.data.groupUserList.length));
        // groupUserListDiv.setData(res.data.groupUserList);
        $("div[name=groupUserListDiv]").empty();

        $.each(res.data.groupUserList, function (idx, user) {
            var leftMargin = "";

            if (idx > 0) {
                leftMargin = "m-l-20 ";
            }
            var tag = '<i class="{0}metismenu-icon pe-7s-user fsize-3"></i><label class="pb-10 m-l-5 va-m">{1}({2})</label>'.format(leftMargin, user.userName, user.userKey);
            $("div[name=groupUserListDiv]").append(tag);
        });

        // 부서 문서함쪽 부서가 아닐경우
        if (currentBoxId !== "BOX_GROUP") {
            $("div[name=groupUserListDiv]").append('<button type="button" class="btn btn-success m-2" onclick="fnAddMember()">부서원 추가</button>');
        }


    });
}

/**
 * 부서원 추가
 */
function fnAddMember() {
    enixClever.modal.load(
        constants.url.selectAccessor,
        "USER",
        function (targetList) {
            var userKeyList = [];

            $.each(targetList, function (index, item) {
                userKeyList.push(item.userKey);
            });

            console.info(userKeyList);

            enixClever.api.group.insertGroupUser(currentGroupInfo.groupId, userKeyList, function (res) {
                enixClever.alert.info("부서원을 추가했습니다.");
                fnSelectGroupDetail(currentGroupInfo.groupId);
            });
        },
        true
    )
}