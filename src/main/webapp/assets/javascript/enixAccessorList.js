$.fn.enixAccessorList = function(customOptions) {
    let $this = $(this);
    let _isInitialized = false;

    let _defaultOptions = {
        header : ["대상", "목록", "상세", "생성", "수정", "삭제", "권한", "다운로드"],
        colGroup : ["10px", "5px","5px","5px","5px","5px","5px","5px"], 		// 헤더 th 간격 조정
        data : [], // json
        displayMember : ["targetName", "listView", "read", "create", "update", "delete", "permission", "download"], // data에서 화면에 표시할 멤버 명
        hover : true,
        noDataDiv : "",
        readonly : false,
        isRoleItem : false,
        
    };

    let _options = $.extend({}, _defaultOptions, customOptions);



    // 테이블을 출력할 타겟이 없을 경우 종료
    if ($(this).length == 0) {
        console.error("대상이 없어서 종료합니다");
        return null;
    }


    let _innerFunc = {
        initTable : function () {

            // 기존 데이터 및 클래스 제거
            $this.children().remove();
            $this.removeClass();

            // 기본 테이블 클래스
            $this.addClass("table-list2");

			// [헤더] 기본 태그 구성
            let colGroup = $('<colgroup></colgroup>');
            
			$.each(_options.colGroup, function(index, item){
				$(colGroup).append('<col width="'+item+'">');
			})

			$this.append(colGroup);


            // [헤더] 기본 태그 구성
            let _thead = $('<thead></thead>');
            let theadRow = $('<tr></tr>');

            // [헤더] 항목 설정 삭제함 by Kimsfeel
            /*
            $.each(_options.header, function (index, item) {

                $(theadRow).append(
                    '<th data-order-index="{0}">{1}</th>'.format(index, item)
                );
            })
            */

            _thead.append(theadRow);
            $this.append(_thead);

            // 본문 기본태그 구성
            $this.append("<tbody></tbody>");

            // 본문 구성
            _innerFunc.loadData();
        },
        loadData : function () {
            let tbody = $this.find("tbody");

            // 데이터 초기화
            tbody.find("tr").remove();

            // 표시할 데이터가 없을경우 종료
            if (_options.data.length == 0) {
                return;
            }

            _innerFunc.addData(_options.data);
        },
        setData : function (itemList) {
            let tbody = $this.find("tbody");

            // 데이터 초기화
            tbody.find("tr").remove();
            _options.data = [];

            // 데이터 없음 가이드 메세지 제거
            if (_options.noDataDiv != null) {
                $(_options.noDataDiv).removeClass("hidden");
            }

            // 데이터가 없을 경우 종료
            if (itemList === undefined || (itemList.length == 0)) {
                return;
            }

            _innerFunc.addData(itemList);
        },
        addData : function (itemList) {
            
            // 데이터 없음 가이드 메세지 제거
            if (_options.noDataDiv != null) {
                $(_options.noDataDiv).addClass("hidden");
            }

            let tbody = $this.find("tbody");

            $.each(itemList, function (index, rowData) {
                _options.data.push(rowData);

                let tbodyRow = $('<tr></tr>');
                let accessorInfo = {
                    read : "N",
                    create : "N",
                    update : "N",
                    delete : "N",
                    listView : "N",
                    permission : "N",
                    download : "N",
                }


                if (rowData["groupName"] != undefined) {
                    accessorInfo.targetId = rowData["groupId"];
                    accessorInfo.targetName = rowData["groupName"];
                    accessorInfo.targetType = "GROUP";

                } else if (rowData["userName"] != undefined) {
                    accessorInfo.targetId = rowData["userKey"];
                    accessorInfo.targetName = rowData["userName"];
                    accessorInfo.targetType = "USER";

                } else if (rowData["targetName"] != undefined) {
                    accessorInfo.targetId = rowData["targetId"];
                    accessorInfo.targetName = rowData["targetName"];
                    accessorInfo.targetType = rowData["targetType"];

                } else if (_options.isRoleItem) {
                    accessorInfo.applyFolders = "Y";
                    accessorInfo.applyDocs = "Y";
                    accessorInfo.admin = "N";

                } else {
                    accessorInfo.targetId = "ALL";
                    accessorInfo.targetName = "전체";
                    accessorInfo.targetType = "GLOBAL";
                }

                // 데이터 로우
                $.each(_options.displayMember, function (index2, dpMember) {
                    var _colData = '';
                    var _isChecked = false;

                    if (dpMember === "targetName") {
                       _colData = '<td><img src="/enixClever/assets/images/icon_access_{1}.png"> {0}</td>'.format(accessorInfo.targetName, accessorInfo.targetType);
                       
                    } else {
                        _isChecked = rowData[dpMember] === "Y";
                        _colData = '<td class="aCenter">{0}</td>'.format(_innerFunc.getHaveBoxTag(dpMember, _isChecked));
                    }

                    $(tbodyRow).append(_colData);
                    
                    $('img').click(function(event) {
				
					});
                });


                tbodyRow.data(accessorInfo);
                $(tbody).append(tbodyRow);
            });
        },
        getCheckBoxTag : function (name, isChecked, isDisabled) {
            let checkedTag = (isChecked ? "checked" : "");
            let disabledTag = (isDisabled ? "disabled" : "");


          /*  let tag =
                (
                    '<div align=\'"center\'">' +
                    '    <input type="checkbox" id="{0}" name="{1}" {2} {3}>' +
                    '    <label for="{0}"></label>' +
                    '</div>'
                ).format(enixClever.utils.uuidGenerate(), name, checkedTag, disabledTag); */
                
            let tag =
                (
                    '<div align=\'"center\'">' +
                    '    <input type="checkbox" id="{0}" name="{1}" {2} {3}>' +
                    '    <label for="{0}"></label>' +
                    '</div>'
                ).format(enixClever.utils.uuidGenerate(), name, checkedTag, disabledTag); 
    

		
            return tag;
        },
        getHaveBoxTag : function (name, isChecked) {   
        	let checkedTag = (isChecked ? "T" : "");
        	
          	let tag =
                (
                    '<img src="/enixClever/assets/images/permission/{1}{0}.png" width="25">'
                ).format(name, checkedTag);
			
            return tag;
        }
    }

    // 1회만 초기화
    if (!_isInitialized) {
        _innerFunc.initTable();
        _isInitialized = true;
    }

    return {
        setData : function (dataList) {
            _options.data = [];

            // 데이터 조회
            _innerFunc.setData(dataList);
        },
        addData : function (dataList) {
            var _tempList = [];

            // 데이터가 없을 경우 종료
            if (dataList === undefined) {
                return;
            }

            // 중복 제거
            $.each(dataList, function (index, item) {

                var findItem = _options.data.find(x => JSON.stringify(x) === JSON.stringify(item));
                var findKey = _options.data.find(x => x.targetId == item.targetId || x.targetId == item.userKey || x.targetId == item.groupId);

                // 기존에 추가되지 않은 아이템일 경우
                if (findItem == undefined && findKey == undefined) {
                    _tempList.push(item);
                }
            });

            // 데이터 추가
            _innerFunc.addData(_tempList);
        },
        getAccessorList : function () {
            var accessorList = [];

            // 전체 ACCESSOR를 루핑한다
            $.each ($this.find("tbody tr"), function (idx, row) {
                var allCheckList = [];
                var checkedItemList = []; // 체크된 아이템 목록

                // 체크된 아이템 이름 목록을 조회한다
                $.each ($(row).find("input:checked"), function (checkIdx, checkedItem) {
                    checkedItemList.push(checkedItem.name);
                });

                // 전체 체크박스 아이템 조회
                $.each ($(row).find("input[type=checkbox]"), function (checkIdx, checkedItem) {
                    allCheckList.push(checkedItem.name);
                });

                var rowData = $(row).data();

                // 현재 선택된 ROW의 KEY를 체크한다
                $.each (allCheckList, function(checkboxIdx, checkBoxName) {
                    let _isChecked = checkedItemList.includes(checkBoxName);

                    rowData[checkBoxName] = (_isChecked ? "Y" : "N");
                });

                accessorList.push(rowData);
            });

            return accessorList;
        }
    };
}