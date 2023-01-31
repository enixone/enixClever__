$.fn.enixList = function(customOptions) {
    let $this = $(this);
    let _isInitialized = false;

    let _defaultOptions = {
        data : [],
        checkbox : false,
        displayKey : "",
        icon : false,
        iconTag : "",
        isSingleCheck : false,
        callbackFunctions : {
            rowClickCallback : null
        }
    };

    let _options = $.extend({}, _defaultOptions, customOptions);

    // 리스트를 출력할 타겟이 없을 경우 종료
    if ($(this).length == 0) {
        console.error("[enixList] 대상이 없어서 종료합니다");
        return null;
    }

    let _enixListEvent = {
        // 체크 변동 이벤트
        evtCheckedChanged : function (obj) {
            $.each($this.find("input[type=checkbox]"), function (idx, item) {
                $(item).prop("checked", false);
            });

            $(this).prop("checked", true);
        }
    }

    let _innerFunc = {
        // 초기화
        initEnixList : function () {
            // 기존 데이터 제거
            $this.children().remove();

            // 기본 구조 구성
            $this.append(_tag.ulTag());
        },
        // 데이터 로드
        loadData : function () {
            // 기존 데이터 삭제
            $this.find("ul li").remove();

            // 표시할 데이터가 없을 경우 종료
            if (_options.data.length == 0) {
                return;
            }

            $.each(_options.data, function (idx, rowData) {
                var displayName = "";

                if (typeof _options.displayKey === 'function') {
                    displayName = _options.displayKey(rowData);
                } else {
                    displayName = rowData[_options.displayKey];
                }

                let rowTag = $(_tag.liTag().format(displayName));
                rowTag.data(rowData);

                $this.find('ul').append(rowTag);
            });

            $this.find("input[type=checkbox]").change(_enixListEvent.evtCheckedChanged);
        }
    }

    let _tag = {
        ulTag : function() {
            let tag = '<ul class="todo-list-wrapper list-group list-group-flush"></ul>';

            return tag;
        },
        liTag : function() {

            let checkboxTag = '';
            let iconTag = '';
            let itemTag = '<div class="widget-content-left">{0}</div>';

            if (_options.checkbox) {
                var tempId = enixClever.utils.uuidGenerate();

                checkboxTag =
                    (
                        '<div class="widget-content-left mr-2">' +
                        '   <div class="custom-checkbox custom-control">' +
                        '       <input type="checkbox" class="custom-control-input" id="{0}">' +
                        '       <label class="custom-control-label" for="{0}"></label>' +
                        '   </div>' +
                        '</div>'
                    ).format(tempId);
            }

            if (_options.icon) {
                iconTag =
                    (
                        '<div class="widget-content-left mr-2">' +
                        '   <div class="custom-checkbox custom-control">' +
                        '       {0}' +
                        '   </div>' +
                        '</div>'
                    ).format(_options.iconTag);
            }

            let tag =
                '<li class="list-group-item">' +
                '   <div class="todo-indicator bg-success"></div> ' +
                '   <div class="widget-content p-0">' +
                '       <div class="widget-content-wrapper">' +
                iconTag +
                checkboxTag +
                itemTag +
                '       </div>' +
                '   </div>' +
                '</li>';

            return tag;
        }
    }

    // 1회만 초기화
    if (!_isInitialized) {
        _innerFunc.initEnixList();
        _isInitialized = true;
    }

    return {
        setData : function(dataList) {
            _options.data = [];

            // 데이터가 없을 경우 종료
            if (dataList == undefined) {
                return;
            }

            _options.data = dataList;

            // 데이터 출력
            _innerFunc.loadData();
        },
        addData : function(dataList) {

            $.each(dataList, function(idx, item) {
                if (!_options.data.includes(item)) {
                    _options.data.push(item);
                }
            });

            // 데이터 출력
            _innerFunc.loadData();
        },
        getData : function() {
            return _options.data;
        },
        getCheckedList : function() {
            var _checkedList = [];
            $.each($this.find("input[type=checkbox]:checked"), function(idx, item) {
                _checkedList.push($(item).closest("li").data());
            });

            return _checkedList;
        },
        deleteCheckedList : function() {

            $.each($this.find("input[type=checkbox]:checked"), function(idx, item) {
                var _checkedData = $(item).closest("li").data();

                var findItem = _options.data.find(x => JSON.stringify(x) === JSON.stringify(_checkedData));

                if (findItem != undefined) {
                    var _tempIndex = _options.data.indexOf(findItem);

                    if (_tempIndex > -1) {
                        _options.data.splice(_tempIndex, 1);
                    }
                }
            });

            // 데이터 출력
            _innerFunc.loadData();
        }

    }
}