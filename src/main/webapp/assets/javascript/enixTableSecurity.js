$.fn.enixTableSecurity = function(customOptions) {
    let $this = $(this);
    let isInitialized = false;
    let isClicking = false;
    let clickCount = 0;

    let defaultOption = {
        header : [],
        data : [], // json
        displayMember : [], 		// data에서 화면에 표시할 멤버 명
        colAlign : [], 				// data에서 화면에 표시할 멤버 명
        colGroup : [], 				// 헤더 th 간격 조정
        switchMember : [], 			// switch 표시할 멤버 명
        iconMember : [], 			// icon 표시할 멤버 명
        checkboxMember : [], 		// checkbox로 표시할 멤버 명
        isCheckboxReadonly : true, 	// checkbox 읽기 전용 여부
        isSingleCheck : false, 		// checkbox 단일 선택 여부
        isSecurityCard : false,
        isWithdraw : false,
        pagination : null,
        hover : false,
        checkBox : false,
        editBtn : false,
        sorting : false,
        pageNo : 1,
        perPage : 10,
        nowTime : "0000-00-00 00:00:00",
        isPagination : false,
        paginationDiv : null,
        orderKey : null,
        orderBy : null,
        orderIndex : 0,
        searchKey : null,
        clickFirstRow : false,
        noDataDiv : "",
        noDataMessage : "",
        callbackFunctions : {
            rowDoubleClickCallback : null,
            rowClickCallback : null,
            rowChangedCallback : null,
            orderChangedCallback : null,
            editBtnCallback : null,
            errorCallback : null,
            navigatePageCallback : null
        }
    };

	let options = $.extend({}, defaultOption, customOptions);

    let enixTableEvent = {
        // Row를 클릭했을 경우
        evtRowClick : function (event) {
			
			
			//체크박스를 선택했을 경우 리턴한다. 
			if(event.target.type == "checkbox")	return;
			
			//if (isClicking) return;
            utils.setClicking();
            let tr = $(this).closest("tr")
            let data = tr.data();
            uiHandler.setActiveRow(tr);
            utils.unsetClicking();

            clickCount++;
              
        },
        // Row를 더블 클릭 했을 경우
        evtRowDoubleClick : function (event) {

            let tr = $(this).closest("tr")
            let data = tr.data();

            // Row 더블 클릭 이벤트 시용 시 이벤트 연결
            if (typeof options.callbackFunctions.rowDoubleClickCallback == 'function') {
                options.callbackFunctions.rowDoubleClickCallback(data);
            }

        },
        // ROW 순서를 바꿨을 경우
        evtRowChanged : function (event, ui) {
            options.callbackFunctions.rowChangedCallback(ui);
        }
    }

    let uiHandler = {
        setActiveRow : function(tr) {
            $(tr).closest("tbody").find("tr").removeClass("click-row");
            $(tr).addClass("click-row");
        },
        setActivePagination : function (sender) {
            $(options.paginationDiv).find("li").removeClass("active");
            $(options.paginationDiv).addClass("active");
        }
    }

    let enixTableFunc = {
        initEnixTable : function () {
			
			// 본문 기본태그 구성
            $this.append("<tbody></tbody>");
            // 본문 구성
            enixTableFunc.loadData();
        },
        loadData : function () {

            let tbody = $this.find("tbody");
				
			// 데이터 초기화
            tbody.find("tr").remove();
            
            $.each(options.data, function (index, rowData) {
                
                let tbodyRow = $('<tr></tr>');

                tbodyRow.data(rowData);
				
				// 데이터 로우
                $.each(options.displayMember, function (index2, dpMember) {
                   
                   	var _colData = "";
                   
					// 제목인 경우 팝업
                    if(dpMember == 'docName'){
						_colData = '<td class="aLeft"><a href="#" onclick="showDetail(\'{1}\');" class="titleCollapse">{2}</a></td>'.format(options.colAlign[index2], rowData["docId"], rowData[dpMember]);
					}else{
						_colData = '<td>{0}</td>'.format(rowData[dpMember]);
					}
					$(tbodyRow).append(_colData);
				
                });
                $(tbodyRow).append('<td class="aCenter"><a href="#" onclick="evtSecurityCard(\'{0}\',\'{1}\');"><img src="/enixClever/assets/images/icon_blank.png" class="pdL10"></a></td>'.format(rowData["docId"], rowData["securityCodeName"]));
                
                $(tbody).append(tbodyRow);
            })

			$this.append(tbody);

            // Row 클릭 이벤트 연결
            $this.find('tbody tr').on("click", enixTableEvent.evtRowClick);
            $this.find('tbody tr').on("dblclick", enixTableEvent.evtRowDoubleClick);
        },
        setPagination : function (pagination) {
            // 기존 번호를 모두 삭제한다
            $(options.paginationDiv).empty();

            if (!options.isPagination || options.paginationDiv == null || !pagination) {
                return;
            }

            var navSize = 10;
            var pageDepth = parseInt(pagination.pageNo / navSize) + (pagination.pageNo % navSize > 0 ? 1 : 0);
            var totalDepth = parseInt(pagination.totalPage / navSize) + (pagination.totalPage % navSize > 0 ? 1 : 0);
            var startPage = (pageDepth - 1) * navSize + 1;
            var isCurrentPage = false;


            // 기본 클래스를 추가한다
            $(options.paginationDiv).addClass("PageArea");

            // 페이징 구성 태그
            var pagingNav = $('<nav></nav>');
            var pagingUl = $('<ul></ul>');

            // [<<] 이전 페이지 구성
            if (pageDepth > 1) {
                var tmp = $('<a href="javascript:void(0)" ><span>«</span></a>')
                    .data({idx : ((pageDepth - 1) * navSize) - 1 })
                    .click(function () {
                        // clickCallback($(this).data().idx);
                        options.pageNo = $(this).data().idx;
                        enixTableFunc.navigatePage(this);
                    });
                $(pagingUl).append(tmp);
            }

            // [0~9] 페이지 메인
            for (var i = startPage, j = 0; i <= pagination.totalPage && j < navSize; i++, j++) {

				var activeClass = '';               
               
                if (i == pagination.pageNo)	activeClass = 'pageActive';

                var tmp = $('<a href="javascript:void(0)" class="' + activeClass + '">' + i + '</a>')
                    .data({idx : i })
                    .click(function () {
                        // clickCallback($(this).data().idx);
                        options.pageNo = $(this).data().idx;
                        enixTableFunc.navigatePage(this);
                    });
                $(pagingUl).append(tmp);
            }

            // [>>] 다음 페이지 구성
            if (pageDepth < totalDepth) {
                var tmp = $('<a href="javascript:void(0)"><span>»</span></a>')
                    .data({idx : (pageDepth * navSize) + 1 })
                    .click(function () {
                        // clickCallback($(this).data().idx);
                        options.pageNo = $(this).data().idx;
                        enixTableFunc.navigatePage(this);
                    });
                $(pagingUl).append(tmp);
            }
            $(pagingNav).append(pagingUl);
            $(options.paginationDiv).append(pagingNav);

        },
        getCheckBoxTag : function () {
            let tag = "";

            if (options.checkBox) {
                tag =
                    (
                    '<input type="checkbox" id="check{0}">'
                    ).format(utils.randomId());
            }
            
            return tag;
        },
        navigatePage : function(sender) {
            if (typeof options.callbackFunctions.navigatePageCallback == 'function') {
                uiHandler.setActivePagination(sender);
                options.callbackFunctions.navigatePageCallback();
            }
        }
    }

    let utils = {
        checkClicking : function() {
            return isClicking;
        },
        setClicking : function() {
            isClicking = true;
        },
        unsetClicking : function() {
            isClicking = false;
        },
        randomId : function () {
            // Math.random should be unique because of its seeding algorithm.
            // Convert it to base 36 (numbers + letters), and grab the first 9 characters
            // after the decimal.
            return '_' + Math.random().toString(36).substr(2, 9);
        }
    }

    // 1회만 초기화
    if (!isInitialized) {
        enixTableFunc.initEnixTable();
        isInitialized = true;
    }

    return {
        setData : function(dataList) {

            let tbody = $this.find("tbody");

			// 데이터 초기화
            tbody.find("tr").remove();
            options.data = [];

            // 데이터가 있는 경우
            if (dataList.length > 0) {
				$("#noDataDiv").addClass("hidden");
            
            // 데이터가 없은 경우
            }else{
				$("#noDataDiv").removeClass("hidden");
				
                $("#noDataImage > img").attr({ src: "/enixClever/assets/images/document.png" });
                $("#noDataMessage").text(options.noDataMessage);
			}
            
           	options.data = dataList;

            // 데이터 조회
            enixTableFunc.loadData();
        },
        setPagination : function(pagination) {
            enixTableFunc.setPagination(pagination);
        },
        removeItem : function() {
        },
        getOptions : function() {
            return options;
        },
        getPagination : function() {
            let paging = {
                pageNo : options.pageNo,
                perPage : options.perPage,
                orderKey : options.orderKey,
                orderBy : options.orderBy,
                searchKey : options.searchKey,
                keyword : options.keyword
            };

			return paging;
        }
    };
}


