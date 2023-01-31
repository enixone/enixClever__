$(function() {

});


/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
function initModal() {
    var mode = arguments[0];

    _selectAccessor.treeObj = null;
    _selectAccessor.successCallback = arguments[1];
    _selectAccessor.selectUserOnly = (mode === "USER");

    // 부서 트리 초기화
    _selectAccessor.fnInitTree();

    // 사용자 목록 플러그인 초기화
    _selectAccessor.userListObj = $("#popupSelectAccessor div[name=userListDiv]").enixList(_selectAccessor.userListOption);

    // 사용자 목록 플러그인 초기화
    _selectAccessor.accessorListObj = $("#popupSelectAccessor div[name=accessorListDiv]").enixList(_selectAccessor.accessorListOption);
}

var _selectAccessor = {
    treeObj : null,
    userListObj : null,
    accessorListObj : null,
    selectUserOnly : false,
    currentGroupInfo : null,
    successCallback : null,
    // 유저 리스트 플러그인 옵션
    userListOption : {
        checkbox: true,
        // displayKey : "userName"
        displayKey : function(item) {
            return item.userName;
        }
    },
    // 선택 대상 리스트 플러그인 옵션
    accessorListOption : {
        checkbox: true,
        displayKey : function(item) {
            if (item.groupId != undefined) {
                return item.groupName;
            } else {
                return item.userName;
            }
        },
        displayIcon : function(item) {
            if (item.groupId != undefined) {
                return '<i class="header-icon lnr-users bg-night-fade"> </i>';
            } else {
                return '<i class="header-icon lnr-user bg-night-fade"> </i>';
            }
        },
    },

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

            if (_selectAccessor.treeObj != undefined) {
                $("#accessorGroupTree").fancytree("getTree").reload(nodeList);
                return;
            }

            _selectAccessor.treeObj = $("#accessorGroupTree").fancytree({
                // checkbox : true,
                checkbox : !_selectAccessor.selectUserOnly,
                selectMode: 2,
                source: nodeList,
                lazyLoad: function(event, data) {
                    var parentGroupInfo = data.node.data;

                    enixClever.api.group.selectChildGroupList(parentGroupInfo.groupId, function (res) {
                        data.result = enixTree.getGroupNodeListFromJson(res.data.groupList);

                    }, true);
                },
                // 폴더 선택 (활성화)
                activate: function(event, data) {
                    _selectAccessor.currentGroupInfo = data.node.data;
                    _selectAccessor.currentGroupInfo.fullPath = data.node.getPath();

                    // 그룹 유저 정보 조회
                    _selectAccessor.fnSelectGroupUserList();
                },
                select: function(event, data) {
                    console.info("treeSelect", data);
                },
                loadChildren : function (event, data) {

                    // 최상위 노드일경우
                    if (data.node.parent == undefined) {
                        var node = data.node.children[0];

                        // 자식 노드 조회
                        data.node.children[0].setExpanded(true);
                        // data.node.children[0].setSelected(true);

                        // 현재 노드 선택
                        data.node.children[0].setActive(true);
                    }
                }
            });
        });
    },

    /**
     * 선택된 그룹 목록을 조회한다
     * @returns {[]}
     */
    fnGetCheckedGroupList : function () {
        var groupList = [];

        $.each($(_selectAccessor.treeObj).fancytree("getTree").getSelectedNodes(), function (idx, node) {
            groupList.push(node.data);
        });

        return groupList;
    },

    /**
     * 부서 사용자 목록 조회
     */
    fnSelectGroupUserList : function () {
        enixClever.api.user.selectGroupUserList(_selectAccessor.currentGroupInfo.groupId, function(res) {
            _selectAccessor.userListObj.setData(res.data.userList);
        });
    },

    /**
     * 대상 목록 추가
     */
    fnAddAccessor : function () {
        // 선택한 부서 목록 조회
        var groupList = _selectAccessor.fnGetCheckedGroupList();

        // 선택한 사용자 목록 조회
        var userList = _selectAccessor.userListObj.getCheckedList();

        _selectAccessor.accessorListObj.addData(groupList.concat(userList));
    },

    /**
     * 대상 목록 제거
     */
    fnRemoveAccessor : function () {
        // 체크되어 있는 대상 목록을 제거한다
        _selectAccessor.accessorListObj.deleteCheckedList();
    },


    /**
     * 모달 서밋
     */
    evtSubmitClick : function () {

        var accessorList = _selectAccessor.accessorListObj.getData();

        if (accessorList.length == 0) {
            enixClever.alert.warn("대상 지정 오류", "추가된 대상이 없습니다.");
            return;
        }

        enixClever.modal.close();

        if (typeof _selectAccessor.successCallback == "function") {
            _selectAccessor.successCallback(accessorList);
        }
    },

    /**
     * 모달 종료
     */
    evtCancelClick : function () {
        enixClever.modal.close();
    }
}



