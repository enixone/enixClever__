$.fn.enixAccessorList = function(customOptions) {
    let $this = $(this);
    let _isInitialized = false;

    let _defaultOptions = {
        colGroup : ["*", "30px","30px","30px","30px","30px","30px","30px","30px","30px","30px","30px","30px"], 		// 헤더 th 간격 조정
        data : [], // json
        displayMember : ["targetName", "applyFolders", "applyDocs", "listView", "read", "create", "update", "delete", "permission", "download", "admin", "edit", "print"], // data에서 화면에 표시할 멤버 명
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
			_colData = $('<td><img src="/enixClever/manage/assets/images/icon_minus.png" style="cursor:hand;"></td>');
            // 데이터 초기화
            tbody.find("tr").remove();

            // 표시할 데이터가 없을경우 종료
            if (_options.data.length == 0) {
                return;
            }

            _innerFunc.addData(_options.data);
        },
        setData : function (itemList, isRemoveIcon) {
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
			
            _innerFunc.addData(itemList, isRemoveIcon);
         
        },
		
        addData : function (itemList, isRemoveIcon) {
            // 데이터 없음 가이드 메세지 제거
            if (_options.noDataDiv != null) {
                $(_options.noDataDiv).addClass("hidden");
            }
            
		
            let tbody = $this.find("tbody");

            $.each(itemList, function (index, rowData) {

              	_options.data.push(rowData);
				
                let tbodyRow = $('<tr></tr>');
                let accessorInfo = {
                    applyFolders : rowData["applyFolders"] == "N" ?  "N": "Y",
                    applyDocs : rowData["applyDocs"] == "N" ?  "N": "Y",
                    listView : rowData["listView"] == "N" ?  "N": "Y",
                    read : rowData["read"] == "N" ?  "N": "Y",
                    create : rowData["create"] == "Y" ?  "Y": "N",
                    update : rowData["update"] == "Y" ?  "Y": "N",
                    delete : rowData["delete"] == "Y" ?  "Y": "N",
                    permission : rowData["permission"] == "Y" ?  "Y": "N",
                    download: rowData["download"] == "N" ?  "N": "Y",
                    edit: rowData["edit"] == "Y" ?  "Y": "N",
                    print: rowData["print"] == "N" ?  "N": "Y",
                    admin: rowData["admin"] == "N" ?  "N": "Y"
                }


//                if (rowData["groupName"] != undefined) {
//                    accessorInfo.targetId = rowData["groupId"];
//                    accessorInfo.targetName = rowData["groupName"];
//                    accessorInfo.targetType = "GROUP";
//
//                } else if (rowData["userName"] != undefined) {
//                    accessorInfo.targetId = rowData["userKey"];
//                    accessorInfo.targetName = rowData["userName"];
//                    accessorInfo.targetType = "USER";
//                    
//                } else if (rowData["roleName"] != undefined) {
//                    accessorInfo.targetId = rowData["roleId"];
//                    accessorInfo.targetName = rowData["roleName"];
//                    accessorInfo.targetType = "ROLE";
//                    
//                } else if (rowData["targetName"] != undefined) {
//                    accessorInfo.targetId = rowData["targetId"];
//                    accessorInfo.targetName = rowData["targetName"];
//                    accessorInfo.targetType = rowData["targetType"];
//
//                } else if (_options.isRoleItem) {
//                    accessorInfo.applyFolders = rowData["applyFolders"] == "N" ?  "N": "Y",
//                    accessorInfo.applyDocs = rowData["applyDocs"] == "N" ?  "N": "Y",
//                    accessorInfo.admin = rowData["admin"] == "Y" ?  "Y": "N"
//					
//				} else {
//                    accessorInfo.targetId = "ALL";
//                    accessorInfo.targetName = "전체";
//                    accessorInfo.targetType = "ALL";
//                }
				
				
				accessorInfo.targetId = rowData.targetId;
                accessorInfo.targetName = rowData.targetName;
                accessorInfo.targetType = rowData.targetType;
				
				
                // 데이터 로우
                $.each(_options.displayMember, function (index2, dpMember) {
                    var _colData = '';
                    var _isChecked = false;
                    var _isDisable = _options.readonly;
                	
                	if (dpMember === "targetName") {
                    
                    	let Allmembers = accessorInfo.targetId == "_ALL" ? "ALL" : accessorInfo.targetType; 
                    
                    
                       _colData = '<td style="text-align:center;"><img src="/enixClever/assets/images/icon_access_{1}.png"></td><td class="aLeft"> {0} </td>'.format(accessorInfo.targetName, Allmembers);
                       
                    } else {
                        _isChecked = rowData[dpMember] === "Y";
                        _colData = '<td class="aCenter">{0}</td>'.format(_innerFunc.getHaveBoxTag(dpMember, _isChecked,accessorInfo));
                    }

					$(tbodyRow).append(_colData);
					                 	
                });
			
				if(isRemoveIcon){
					_colData = $('<td><img src="/enixClever/manage/assets/images/icon_minus.png" style="cursor:hand;"></td>');
					$(_colData).on('click', function(e) {
						var hasData = _options.data.find(x => JSON.stringify(x) === JSON.stringify(rowData));
						if (hasData) {
							$(e.target).closest('tr').remove();
							_options.data = _options.data.filter(x => JSON.stringify(x) !== JSON.stringify(rowData));
						}
					});
					$(tbodyRow).append(_colData);
				}
					
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
                    '    <label>' +
                    '    	<input type="checkbox" name="{0}" {1} {2}>' +
                    '    </label>' +
                    '</div>'
                ).format(name, checkedTag, disabledTag);  
    

		
            return tag;
        },
        getHaveBoxTag : function (name, Checked, accessorInfo) {
			
        	let transName = {
					applyFolders : '폴더',
					applyDocs : '문서',
					listView : '목록',
					read : '조회',
					create : '생성',
					update : '수정',
					delete : '삭제',
					permission : '권한',
					admin : '관리',
					download : '저장',
					edit : '편집',
					print : '인쇄'
			}
     		
     		let isDRM = "";
			let isApply ="";
			//DRM 권한인 경우
			if (name == 'download' || name == 'edit' || name == 'print')
			{
				isDRM = "_drm";
			} 
			
			else if (name == 'applyFolders' || name == 'applyDocs')
			{
				isApply = "_apply";
			}
			
			else if (name == 'admin')
			{
				isApply = "_admin";
			}
			
			else if (name == 'permission')
			{
				isApply = "_permission";
			}
     	
			let tag =
                (
					                   
                   '<div class="btn_access_area">' +
                   		'<label>' +
               				'<p class="btn_access{3}{4}_{1}" id={0} style="cursor:pointer" onclick="replaceClass(this, {2});" name={0} >' + transName[name]+ '</p>' +
                   			'<input type="hidden" name="{0}" value="{1}">' +
                   		'</label>' +
                   '</div>' 
					
                ).format(name, accessorInfo[name], _options.readonly, isDRM, isApply);
            return tag;
        },
        
		
    }

    // 1회만 초기화
    if (!_isInitialized) {
        _innerFunc.initTable();
        _isInitialized = true;
    }

    return {
        setData : function (dataList, isRemoveIcon) {
            _options.data = [];
			
            // 데이터 조회
            _innerFunc.setData(dataList, isRemoveIcon);
           
        },
      
        addData : function (dataList, isRemoveIcon) {
            var _tempList = [];

            // 데이터가 없을 경우 종료
            if (dataList === undefined) {
                return;
            }

            // 중복 제거
            $.each(dataList, function (index, item) {
                var findItem = _options.data.find(x => JSON.stringify(x) === JSON.stringify(item));
//                var findItem = _options.data.find(function(x) {
//					return JSON.stringify(x) === JSON.stringify(item)
//				} );
                var findKey = _options.data.find(x => x.targetId == item.targetId || x.targetId == item.userKey || x.targetId == item.groupId);
				
                // 기존에 추가되지 않은 아이템일 경우
                if (findItem == undefined && findKey == undefined) {
                    _tempList.push(item);
                }
            });

            // 데이터 추가
            _innerFunc.addData(_tempList, isRemoveIcon);
            
           
        },
        getAccessorList : function () {
            var accessorList = [];

            // 전체 ACCESSOR를 루핑한다
            $.each ($this.find("tbody tr"), function (idx, row) {
                var allCheckList = [];
                var checkedItemList = []; // 체크된 아이템 목록

                // 체크된 아이템 이름 목록을 조회한다
                $.each ($(row).find("input[value='Y']"), function (checkIdx, checkedItem) {
                    checkedItemList.push(checkedItem.name);
                });

                // 전체 체크박스 아이템 조회
                $.each ($(row).find("input[type=hidden]"), function (checkIdx, checkedItem) {
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


function replaceClass(spanObj, readonly) {
	
	if (readonly) return;
	

	var target = spanObj;
	var targetId = $(spanObj).attr('id');
	var targetClass = $(spanObj).attr('class');
	var $choiceAnswer = jQuery(spanObj).closest("td").find("input[type=hidden]");
	
	var className = "btn_access_";
	
	//DRM 권한인 경우
	if (targetId == 'download' || targetId == 'edit' || targetId == 'print')
	{
		className = className +"drm_";
	} 
	
	else if (targetId == 'applyFolders' || targetId == 'applyDocs')
	{
		className = className +"apply_";
	} 
	
	else if (targetId == 'admin')
	{
		className = className +"admin_";
	} 
	
	else if (targetId == 'permission')
	{
		className = className +"permission_";
	} 
	
	/* 버튼 다수 통제
	if(targetId == 'delete') {
		replaceClass(update);
	}
	if(targetId == 'update') {
		replaceClass(read);
	}
	/* 생성이 빠지는 곳이 있어 함수에서 제외 
	if(targetName == 'create') {
		replaceClass(read);
	}
	
	if(targetId == 'read') {
		replaceClass(listView);
	}*/
	
	/* 클릭시 클래스 변경 */
	if (targetClass == className+'Y') {
		
		target.className = className+'N';
		$choiceAnswer.val("N");
	} else  {
		
		target.className = className+'Y';
		$choiceAnswer.val("Y");	
	} 
	
}
