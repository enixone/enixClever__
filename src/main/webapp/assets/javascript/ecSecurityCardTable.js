$.fn.ecSecurityCardTable = function(customOptions) {
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
        pagination : null,
        hover : true,
        checkBox : false,
        editBtn : false,
        sorting : false,
        pageNo : 1,
        perPage : 10,
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


    // 테이블을 출력할 타겟이 없을 경우 종료
    if ($(this).length == 0) {
        console.warn("대상이 없어서 종료합니다");
        return null;
    }

    let enixTableEvent = {
        // 헤더 체크박스 체크/언체크 이벤트
        evtHeaderCheckboxChanged : function () {
            $this.find('tbody td.rowSelector input[type=checkbox]').prop("checked", $(this).is(":checked"));
        },
        // 목록 체크박스 체크/언체크 이벤트
        evtBodyCheckboxChanged : function () {

            if (options.isSingleCheck) {

                
                $.each($this.find("input[type=checkbox]"), function (idx, item) {
                    $(item).prop("checked", false);
                });

                $(this).prop("checked", true);

            } else {
                let totalCount = $this.find('tbody td.rowSelector input[type=checkbox]').length;
                let chkList = $this.find('tbody td.rowSelector input[type=checkbox]:checked').length;

                if (chkList < totalCount) {
                    $this.find('thead input[type=checkbox]').prop("checked", false);
                } else if (chkList == totalCount) {
                    $this.find('thead input[type=checkbox]').prop("checked", true);
                }
                
            }

        },
        // 헤더 정렬 변경 시
        evtSortChange : function () {
            let header = $(this).closest("th");
            let orderIndex = header.data("order-index");
            if (orderIndex === undefined) {
                return;
            }

            // 인덱스 갱신
            options.orderIndex = orderIndex;

            // 정렬 키 조회
            let orderKey = options.displayMember[orderIndex];

			// 헤더 위치에 따른 분기
            if (orderKey === options.orderKey) {
                // 같은 헤더를 클릭(소팅 반전)
                options.orderBy = (options.orderBy === "ASC") ? "DESC" : "ASC";

            } else {
                // 다른 헤더를 클릭
                let oldHeader = $(header).closest("thead").find(".sorting_" + options.orderBy.toLowerCase());
                oldHeader.removeClass("sorting_desc sorting_asc");
              
                options.orderBy = "ASC";
                options.orderKey = orderKey;
            }

            $(header).removeClass("sorting_desc sorting_asc").addClass("sorting_" + options.orderBy.toLowerCase());

			options.callbackFunctions.orderChangedCallback();
        },
        // Row의 항목 수정 버튼 클릭 시
        evtEditButtonClick : function (event) {
            if (isClicking) return;
            utils.setClicking();

            let data = $(this).closest("tr").data();
            options.callbackFunctions.editBtnCallback(data);

            utils.unsetClicking();
        },
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

			
			if (clickCount == 1) {
                setTimeout(function() {

                    if (clickCount == 1) {
                        // 체크박스 사용 시 토글
                        if (options.checkBox) {
                            var input = $(tr).find("td.rowSelector input[type=checkbox]");
                            var isChecked = $(input).prop("checked");

                            $(input).prop("checked", !isChecked);
                            
                        }

                        // Row 클릭 이벤트 시용 시 이벤트 연결
                        if (typeof options.callbackFunctions.rowClickCallback == 'function') {
                            options.callbackFunctions.rowClickCallback(data);
                        }
                    }

                    clickCount = 0;
                }, 300);
            }        
            
              
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

            // 기존 데이터 및 클래스 제거
            $this.children().remove();
            $this.removeClass();

            // 기본 테이블 클래스
            $this.addClass(options.tableClass);
            if (options.hover) $this.addClass("table-hover");


			// [헤더] 기본 태그 구성
            let colGroup = $('<colgroup></colgroup>');
            
			$.each(options.colGroup, function(index, item){
				$(colGroup).append('<col width="'+item+'">');
			})

			//비밀 이력카드인 경우 노출...
            if(options.isSecurityCard){
				$(colGroup).append('<col width="80px">');
			}

			$this.append(colGroup);

			



            // [헤더] 기본 태그 구성
            let thead = $('<thead></thead>');
            let theadRow = $('<tr></tr>');

            // [헤더] 체크박스 (전체)
            if (options.checkBox) {

                var _checkTag = options.isSingleCheck ? "" : enixTableFunc.getCheckBoxTag();
                $(theadRow).append('<th>{0}</th>'.format(_checkTag));
            }

			


            // [헤더] 항목 설정
            $.each(options.header, function (index, item) {

                let thClass = options.colAlign[index];
                // if (options.sorting) {
                //     thClass = "sorting";
                //
                //     // 정렬 기준 항목 여부 체크
                //     if (options.orderKey == options.displayMember[index]) {
                //         thClass += "_" + options.orderBy.toLowerCase();
                //
                //         // 정렬 기준 인덱스
                //         options.orderIndex = index;
                //     }
                // }
                
                $(theadRow).append(
				                '<th class="{0}" data-order-index="{1}">{2}</th>'.format(thClass, index, item)
			          
                );
                
                
            })

			//비밀 이력카드인 경우 노출...
            if(options.isSecurityCard){
				$(theadRow).append('<th class="aCenter">문서이력</th>');
			}


            if (options.editBtn) {
                $(theadRow).append('<th class="text-center">수정</th>');
            }

            thead.append(theadRow);
            $this.append(thead);

	

            // [헤더] 정렬 변경 이벤트 설정
            if (options.sorting) {
                $this.find("thead th").on("click", enixTableEvent.evtSortChange);
            }

            // 본문 기본태그 구성
            $this.append("<tbody></tbody>");

            // 본문 구성
            enixTableFunc.loadData();
        },
        loadData : function () {
            let tbody = $this.find("tbody");

            // 데이터 초기화
            tbody.find("tr").remove();

            // 표시할 데이터가 없을경우 종료
            if (options.data.length == 0) {
                return;
            }

            $.each(options.data, function (index, rowData) {
                
                
                let tbodyRow = $('<tr></tr>');
                tbodyRow.data(rowData);

                // 체크박스 (아이템별)
                if (options.checkBox) {
                    $(tbodyRow).append('<td class="rowSelector">{0}</td>'.format(enixTableFunc.getCheckBoxTag()));
                }

				// 데이터 로우
                $.each(options.displayMember, function (index2, dpMember) {
                    var _colData = '';

					
					if (options.switchMember.includes(dpMember)) {
	                    _colData = '<td name="switchCol"><input type="checkbox" disabled {1} ></td>'.format(dpMember, (rowData[dpMember] == "Y" ? "checked" : ""));

                    } else if (options.iconMember.includes(dpMember)) {
                        _colData = '<td><i class="{0}"></i></td>'.format(rowData[dpMember]);

                    } else if (options.checkboxMember.includes(dpMember)) {
                        var _tempId = enixClever.utils.uuidGenerate();
                        var _isCheckedTag = rowData[dpMember] == "Y" ? "checked" : "";
                        var _isDisableTag = options.isCheckboxReadonly ? "disabled" : "";

                        _colData =
                            (
                                '<td>' +
                                '   <div >' +
                                '       <input type="checkbox" name="isSystem" id="{0}" {1} {2}>' +
                                '       <label for="{0}"></label>' +
                                '   </div>' +
                                '</td>'
                            ).format(_tempId, _isCheckedTag, _isDisableTag);
                    } else {
                        _colData = rowData[dpMember];
                        
                        if (_colData == undefined) _colData = '';
                        
                        // 날짜인 경우 문자열 변환
                        if(dpMember.includes('createDate') || dpMember.includes('updateDate')){
							_colData = covertDate(_colData);
						}
						
						
						// 숫자인 경우 "0"이 넘어올 때, "-"으로 변경
                        if(dpMember.includes('fileCount')){
							_colData = covertCount(_colData);
						}
						
						
						// 제목인 경우 팝업
                        if(dpMember == 'docName'){
							_colData = '<td class="{0}"><a href="#" onclick="showDetail(\'{1}\');" class="titleCollapse">00{2}</a></td>'.format(options.colAlign[index2], rowData["docId"], _colData);
								
						}
						//권한 제목인 경우
						else if(dpMember == 'permissionName'){
							_colData = '<td class=" {0} "><font class=\'\' style="cursor:pointer;">{1}</font></td>'.format(options.colAlign[index2], _colData);	
						}else{
							_colData = '<td class=" {0} ">22{1}</td>'.format(options.colAlign[index2], _colData);
						}                        
                               
                        
                    }
                    
                    $(tbodyRow).append(_colData);
                    
                    
                    
                });
                
                
                //비밀 이력카드인 경우 노출...
	            if(options.isSecurityCard){
					$(tbodyRow).append('<td class="aCenter"><a href="#" onclick="evtSecurityCard(\'{0}\',\'{1}\');"><img src="/enixClever/assets/images/icon_blank.png" class="pdL10"></a></td>'.format(rowData["docId"], rowData["securityCodeName"]));
				}
                 
                
                

                $(tbody).append(tbodyRow);
            })

            // 체크박스를 사용할 경우 이벤트 연결
            if (options.checkBox) {
                $this.find('thead input[type=checkbox]').on("change", enixTableEvent.evtHeaderCheckboxChanged);
                $this.find('tbody td.rowSelector input[type=checkbox]').on("change", enixTableEvent.evtBodyCheckboxChanged);
            }

            // Row 클릭 이벤트 연결
            $this.find('tbody tr').on("click", enixTableEvent.evtRowClick);
            $this.find('tbody tr').on("dblclick", enixTableEvent.evtRowDoubleClick);


            // 수정 버튼 사용 시 이벤트 연결
            if (options.editBtn) {
                $this.find('tbody button').on("click", enixTableEvent.evtEditButtonClick);
            }

            // 스위치 사용 시 플러그인 표시
            if (options.switchMember.length > 0) {
                $.each($this.find('tbody td[name=switchCol] input.js-info'), function (idx, item) {
                    // new Switchery(item, { color: '#62d1f3', jackColor: '#fff', size:'medium' });
                    uiHandller.setSwitch(item);
                });
            }

            
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

            // 데이터가 없을 경우 종료
            if (dataList === undefined) {
                //return;
            }
            

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
        // 접근권한 목록을 셋팅한다. 
        setPermissionData : function(dataList) {

            let tbody = $this.find("tbody");

            // 데이터 초기화
            tbody.find("tr").remove();
            options.data = [];

			$.each(dataList, function (index, item) {
                //checkedList.push($(item).data());
                
                _colData =(
                            '<tr style="height:30px">'+
                            '<td class="text-center"><img src="/enixClever/assets/images/icon_access_{0}.png"></td>' +
                            '<td class="text-left">{1}</td>' +
                            '<td class="text-right"><div class="btn_access_area">' +
                            '	<span class="btn_access_{2}">목록</span>'+
                            '	<span class="btn_access_{3}">조회</span>'+
                            '	<span class="btn_access_{4}">수정</span>'+
                            '	<span class="btn_access_{5}">삭제</span>'+
                            '	<span class="btn_access_drm_{6}">저장</span>'+
                            '	<span class="btn_access_drm_{7}">편집</span>'+
                            '</div>'+
                            '</td></tr>'
                        ).format(item.targetType, item.targetName, item.create,item.delete,item.create,item.delete,item.create,item.delete);
                        
                $(tbody).append(_colData);
            });
        },

		// 검색한 사용자 목록을 셋팅한다.  
        setUserListData : function(dataList) {

            let tbody = $this.find("tbody");
			
            // 데이터 초기화
            tbody.find("tr").remove();

            $.each(dataList, function (index, item) {

	            let tbodyRow = $('<tr></tr>');
	                tbodyRow.data(item);
	                
					_colData =( '	<td class="text-center">{0}</td>' +
	                            '	<td class="text-left">{1}</td>' +
	                            '	<td class="text-left">{2}</td>'
	                        ).format(item.userName, item.groupName, item.roleName);
	                        
	                $(tbodyRow).append(_colData);
	                $(tbody).append(tbodyRow);
            });            
            
            $this.find('tbody tr').on("click", enixTableEvent.evtRowClick);
            $this.find('tbody tr').on("dblclick", enixTableEvent.evtRowDoubleClick);
            
            
            
            
        },

        // 첨부파일 목록을 셋팅한다.  
        setAttachFiles : function(dataList) {

			let tbody = $this.find("tbody");

            // 데이터 초기화
            tbody.find("tr").remove();
            options.data = [];

			$.each(dataList, function (index, item) {
            
                _colData =(
                            '<tr>'+
                            '<td class="text-center"><a href="/enixClever/io/{0}"><img src="/enixClever/assets/images/icon_download_b.png"></td>' +
                            '<td class="text-center"><img src="/enixClever/assets/images/extenssion/{1}.gif"></td>' +
                            '<td class="text-left">{2}({3})</td>' +
                            '</tr>'
                        ).format(item.fileId, item.extension, item.fileName,replaceKB(item.fileSize));
                        
                $(tbody).append(_colData);
            });
        },
        setPagination : function(pagination) {
            enixTableFunc.setPagination(pagination);
        },
        getCheckedList : function() {
            let checkedList = [];
            let trList = $this.find('tbody td.rowSelector input[type=checkbox]:checked').closest('tr');

            if (trList.length > 0) {
                $.each(trList, function (index, item) {
                    checkedList.push($(item).data());
                });
            }

            return checkedList;
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


