$.fn.enixFileList = function(customOptions) {
    let $this = $(this);
    let _isInitialized = false;

    let _defaultOptions = {
        data : [],
        displayKey : "",
        canDownload : false,
        callbackFunctions : {
            downloadCallback : null
        }
    };

    let _options = $.extend({}, _defaultOptions, customOptions);

    // 리스트를 출력할 타겟이 없을 경우 종료
    if ($(this).length == 0) {
        console.error("[enixFileList] 대상이 없어서 종료합니다");
        return null;
    }

    let _innerEvent = {
        evtDownload : function () {
            var data = $(this).closest("li").data();

            if (typeof _options.callbackFunctions.downloadCallback == 'function') {
                _options.callbackFunctions.downloadCallback(data);
            }
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

            $this.find("button").on("click", _innerEvent.evtDownload);

        }
    }

    let _tag = {
        ulTag : function() {
            let tag = '<ul class="todo-list-wrapper list-group list-group-flush"></ul>';

            return tag;
        },
        liTag : function() {
            let tag =
                '<li class="list-group-item">' +
                '   <div class="todo-indicator bg-success"></div> ' +
                '   <div class="widget-content p-0">' +
                '       <div class="widget-content-wrapper">' +
                '       <div class="widget-content-left">{0}</div>' +
                '       <div class="widget-content-right">' +
                '           <button type="button" class="border-0 btn-transition btn btn-outline-success">' +
                '               <i class="fa fa-download"></i>' +
                '           </button>' +
                '       </div>' +
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
        setDownload : function(canDownload) {

        },
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
        }
    }
}