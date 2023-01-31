$(function() {
	
	var addr = location.href;
	var docId = addr.substring(addr.lastIndexOf("docId=")+6, addr.length);
	_docDetail.docId = docId;
	_docDetail.selectDocInfo(docId);
	
	_docDetail.permissionTable = $("div[name=selectPermissionDiv] table[name=permissionListTable]")
        .enixTable({
            colGroup : ["20px","*","180px"],
            data : [],
            displayMember : ["permissionName", "ownerName", "creatorName", "isSystem"],
            clickFirstRow : true,
    });


	_docDetail.attachFileTable = $("div[name=selectAttachfileDiv] table[name=attachFileListTable]")
        .enixTable({
            colGroup : ["20px","20px","*"],
            data : [],
            displayMember : ["permissionName", "ownerName", "creatorName", "isSystem"],
            clickFirstRow : true,
    });	
	
});

/**
 * 로드 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
function initDetail() {

    //var data = arguments[0];

    //_docDetail.successCallback = arguments[1];
    _docDetail.viewForm = $("form[name=documentDetailForm]").enixForms();

    // 문서 등록 팝업 초기화
    _docDetail.initCreate();
}

var _docDetail = {
	docId : null,
    docuInfo : null,
    docuBookmarkId : null,
    viewForm : null,
    permissionTable : null,
    attachFileTable : null,
    workflowApplovalTable : null,
    fileList : null,
    typeList : null,
    successCallback : null,
    uploadFileList : [],
    fileUploader : null,
    initCreate : function () {
        // 문서 버전 변경 이벤트 연결
        $("#docVersionList").on("change", this.evtVersionChanged);

        var typeSelector = _docDetail.viewForm.find("select[name=docTypeId]");

        // 문서 유형 변경 이벤트 연결
        typeSelector.on("change", this.evtTypeChanged);

		// 문서 유형 목록 조회
        enixClever.api.type.selectTypeList(function (res) {
            _docDetail.typeList = res.data.typeList;

            uiHandller.appendOptionList(
                typeSelector,
                _docDetail.typeList,
                "typeName",
                "typeId",
                function () {
                    typeSelector.change();
                }
            )

        });
    },
    /**
     * 문서 정보 조회
     * @param docId
     */
    selectDocInfo : function (docId) {
	
		// 문서 상세 조회
        enixClever.api.doc.selectDocInfo(docId, function(res) {
            
            $('#btnGroup-pop').addClass(res.data.docInfo.statusCode)
            
            _docDetail.docuInfo = res.data.docInfo;
            
            $('#documentTitle').text(res.data.docInfo.docName);
            $('#fullPath').text(res.data.docInfo.fullPath);
            $('#creatorName').text(res.data.docInfo.creatorName);
            $('#createDate').text(res.data.docInfo.createDate);
            $('#docId').text(res.data.docInfo.docId);
            $('#securityCodeName').text(res.data.docInfo.securityCodeName);
            $('#docTypeIdName').text(res.data.docInfo.docTypeIdName);
            $('#description').html(ConvertSystemSourcetoHtml(res.data.docInfo.description));
            $('#permissionName').text(res.data.docInfo.permissionName);
            $('#statusCodeName').text(res.data.docInfo.statusCodeName);
            
            if(res.data.docInfo.securityCode != "S0"){
				$("#secretImage > img").attr({ src: ("/enixClever/assets/images/icon_secret_{0}.png").format(res.data.docInfo.securityCode) });
            	$("#secretImage").show();
            	
            	$("#secretImageB > img").attr({ src: ("/enixClever/assets/images/icon_secret_{0}.png").format(res.data.docInfo.securityCode) });
            	$("#secretImageB").show();
            
            	$('#expireTitle').text("예고문");
            	$('#expireValue').text(res.data.docInfo.expireDate);
            	
			}else{
				
				$('#expireTitle').text("보존기간");
            	$('#expireValue').text(res.data.docInfo.expireCodeName);
				
			}
            
            //권한 설정
			if(res.data.docInfo.permissionId != ""){
				enixClever.api.permission.selectPermissionInfo(res.data.docInfo.permissionId, function (res1) {
					_docDetail.permissionTable.setPermissionData(res1.data.permissionInfo.accessorList);
			    });
		    }
		    
		    
		    enixClever.api.workflow.getWorkFlowId(res.data.docInfo.docId,"REGISTRATION", function (res2) {
		     
		     	// 해당 결제 아이템이 있는 경우 SUCCESS를 반환함
		     	if(res2.objectId != null){
					_docDetail.docuInfo.workflowId = res2.objectId;
				
					//결제 대상자 버튼 출력
					$('#btnApproval').attr('style', "display:'';");  	//승인
			    	$('#btnRejection').attr('style', "display:'';");  	//반려
			    	
				}
				
				
				if(res.data.docInfo.statusCode == "ACTIVE"){
				//	$('#btnGroup-pop').attr('style', "background:#215280;");  	//활성화 문서
				}else if(res.data.docInfo.statusCode == "TEMP_SAVE"){
				//	$('#btnGroup-pop').attr('style', "background:#B8860B;");  	//임시저장 문서	
				}
				
				//문서 상태가 결재진행중이고, 작성자와 로그인한 사용자가 같은 경우 
				if(res.data.docInfo.statusCode == "PROMOTION" && res.data.docInfo.creatorId == enixClever.user.getSessionUserKey()){		    	
		    		$('#btnWithDraw').attr('style', "display:'';");  	//회수
		    	}	
		        
		    });
		    
		    _docDetail.attachFileTable.setAttachFiles(res.data.docInfo.fileList);
		    
		    
		    // 해당 문서가 즐겨찾기에 있음을 확인
	        enixClever.api.bookmark.selectIsBookmark(_docDetail.docId, function (res3) {
		
		        if(res3.objectId !=null){
					_docDetail.docuBookmarkId = res3.objectId;
					$("input:checkbox[name='t_like_chk12']").prop("checked", true); 
				}
	        });
		    
		    
		    //결제 아이템을 가지고 온다. 
		    enixClever.api.workflow.getWorkFlowApploval(_docDetail.docId,function (resWF) {
			
				//결재대상 아이템이 있는 경우에만 화면에 결재정보를 출력한다. 
				if(resWF.data.wfList.length > 0){
				
					_docDetail.workflowApplovalTable = $("div[name=workflowApplovalDiv] table[name=workflowApplovalTable]")
				        .enixTable({
				            header : ["구분", "상신일자", "상신자", "결재"],
				            displayMember : ["workflowStatus", "creatorId", "creatorName", "creatorMessage"],
				            colGroup : ["120px","120px","*","140px",],
				            data : [],
				            tableClass : "table-listW",
				    });    
					
					_docDetail.workflowApplovalTable.setWorkflowItems(resWF.data.wfList);
					
					$('#workflowApplovalDiv').attr('style', "display:block;");  		//승인
				}
			});
			
			
			
			
			//프로그레스 없애고, 화면 활성화
			$('#progressZone').attr('style', "display:none;");  		
			$('#wrap').attr('style', "display:block;");  	
		    
            
        });
        
        
        
        
        	
	
		
        
    },
    
    /**
     * 비밀이력카드 열람
     * @param data
     */
    evtSecurityCard : function () {
        enixClever.modal.load(
            constants.url.securityCard,
            _docDetail.docuInfo,
            null,
            "md-securityCard"
        );
    },
    
    /**
     * 북마크 반전
     * @param data
     */
    evtReverseBookmark : function (data) {
        if(data.checked){
			enixClever.api.bookmark.insertBookmark(_docDetail.docId, null);
		}else{
			enixClever.api.bookmark.deleteBookmark(_docDetail.docId, null);
		}
        
        
    },
    
    /**
     * 첨부파일 다운로드
     * @param data
     */
    evtFileDownload : function (data) {
        enixClever.file.download(data.fileId);
    },
    
    /**
     * 문서 유형 변경 이벤트
     */
    evtTypeChanged : function () {
        var targetDiv = _docDetail.viewForm.find("div[name=typeItemDiv]");
        targetDiv.empty();

        var typeId = _docDetail.viewForm.find("select[name=docTypeId]").val();
        var typeInfo = null;

        $.each(_docDetail.typeList, function (idx, item) {
            if (item.typeId == typeId) {
                typeInfo = item;
                return;
            }
        });

        // 유형 아이템이 없을 경우 종료
        if (!typeInfo || (typeInfo && typeInfo.typeItemList.length == 0)) {
            return;
        }

        // 유형 아이템이 있을 경우 화면에 표시
        $.each(typeInfo.typeItemList, function(idx, item) {
            targetDiv.append(_docDetail.typeItemTag.format(item.itemName, item.itemId));
        });
    },
    /**
     * 문서 버전 변경 이벤트
     */
    evtVersionChanged : function () {
        var _docId = $(this).val();

        _docDetail.selectDocInfo(_docId);
    },
    
    /**
     * 결제 모달 출력
     */
    evtWorkflowStep : function (id, code) {
		
		_docDetail.docuInfo.workflowId = id;
		_docDetail.docuInfo.workflowStatus = code;
		enixClever.modal.load(
            constants.url.workflowStep,
            _docDetail.docuInfo,
            updateWF,
			"md-small",
			"height:300px"
        );
    },
    
    /**
     * 재문류 창 출력
     */
    evtReClassification : function () {
		
		enixClever.modal.load(
            constants.url.reClassification,
            _docDetail.docuInfo,
            updateWF,
			"md-small",
			"height:500px"
        );
    },
    
    /**
     * 인수인계 창 출력
     */
    evtTakeoverDocument : function () {
		enixClever.modal.load(
            constants.url.takeoverDocument,
            _docDetail.docuInfo,
            updateWF,
			"md-small",
			"height:400px"
        );
    },
    
    /**
     * 파기
     */
    evtDestroyDocument : function () {
		enixClever.modal.load(
            constants.url.destroyDocument,
            _docDetail.docuInfo,
            updateWF,
			"md-small",
			"height:400px"
        );
    },
    
    
    /**
     * 회수신청
     */
    evtDestroyDocument : function () {
		enixClever.modal.load(
            constants.url.destroyDocument,
            _docDetail.docuInfo,
            updateWF,
			"md-small",
			"height:400px"
        );
    },
    
    /**
     * 문서 유형 아이템 표시
     * @param docTypeItemList
     */
    fnSetTypeItemList : function (docTypeItemList) {
        $.each(docTypeItemList, function (idx, item) {
            $(_docDetail.viewForm.find("input[name={0}]".format(item.itemId)).val(item.itemValue));
        });
    },
    
    typeItemTag :
        '<div class="position-relative row form-group">' +
        '   <label class="col-sm-2 col-form-label">{0}</label>' +
        '   <div name="typeItemSection" class="col-sm-10">' +
        '       <input name="{1}" type="text" class="form-control" disabled>' +
        '   </div>' +
        '</div>'
}

function ConvertSystemSourcetoHtml(str){
	 str = str.replace(/</g,"&lt;");
	 str = str.replace(/>/g,"&gt;");
	 str = str.replace(/\"/g,"&quot;");
	 str = str.replace(/\'/g,"&#39;");
	 str = str.replace(/\n/g,"<br />");
	 return str;
}


function updateWF(res){
	
	//정상처리된 경우 결제 버튼 disable
	if(res.status == "SUCCESS"){
		
		$('#btnApproval').attr('style', "display:none;");  		//승인
		$('#btnRejection').attr('style', "display:none;");  	//반려
		$('#btnWithDraw').attr('style', "display:none;");  		//회수
		
		$('#btnGroup-pop').attr('style', "background:#215280;");  	//결제대상이 없는 경우
	}
	
	
	location.reload();
	
	alert(res.message);
	enixClever.modal.close();
	
}
