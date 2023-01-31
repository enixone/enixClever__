$(function() {
		
});

/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
function initModal() {
    _selectGroup.treeObj = null;
    _selectGroup.successCallback = arguments[1];

    // 부서 트리 초기화
    _selectGroup.fnInitTree();
    
    
}

var _selectGroup = {
    treeObj : null,
    currentGroupInfo : null,
    successCallback : null,
    /**
     * 부서 트리 초기화
     */
    fnInitTree : function () {

        // 부서 로트를 조회하여 트리를 초기화 한다
        enixClever.api.group.selectRootGroupList("BOX_GROUP", function (res) {
            var nodeList = enixTree.getGroupNodeListFromJson(res.data.rootList);
            // 루트리스트가 없을 경우 종료
            if (nodeList.length == 0) {
                return;
            }

            if (_selectGroup.treeObj != undefined) {
                $(_selectGroup.treeObj).fancytree("getTree").reload(nodeList);
                return;
            }

            _selectGroup.treeObj = $("#selectGroupTree").fancytree({
                source: nodeList,
                lazyLoad: function(event, data) {
                    var parentGroupInfo = data.node.data;
					

                    enixClever.api.group.selectChildGroupList(parentGroupInfo.groupId, function (res) {
                        data.result = enixTree.getGroupNodeListFromJson(res.data.groupList);

                    }, true);
                },
                // 폴더 선택 (활성화)
                activate: function(event, data) {
                    _selectGroup.currentGroupInfo = data.node.data;
                    _selectGroup.currentGroupInfo.fullPath = data.node.getPath();

                },
                select: function(event, data) {
                },
                loadChildren : function (event, data) {
                    
                    // 최상위 노드일경우
                    if (data.node.parent == undefined) {
                        var node = data.node.children[0];
                        // 자식 노드 조회
                        data.node.children[0].setExpanded(true);
                        // 현재 노드 선택
                        data.node.children[0].setActive(true);
                    }
                }
            });
        });
    },

    /**
     * 모달 서밋
     */
    evtSubmitClick : function () {

        if (_selectGroup.currentGroupInfo == undefined) {
            enixClever.alert.warn("대상 지정 오류", "선택된 그룹이 없습니다.");
            return;
        }

        enixClever.modal.close();

        if (typeof _selectGroup.successCallback == "function") {
            _selectGroup.successCallback(_selectGroup.currentGroupInfo);
        }
    },

    /**
     * 모달 종료
     */
    evtCancelClick : function () {
        enixClever.modal.close();
    }
}
