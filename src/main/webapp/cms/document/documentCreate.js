$(document).ready(function(){
	initModal();
});


/**
 * 모달 초기화
 * arg[0] : data
 * arg[1] : successCallback
 */
 
function initModal() {
	
	
	folderNameAutocomplete();
	userNameAutocomplete();
	permissionNameAutocomplete();
	
	_docCreate.createForm = $("form[name=documentCreateForm]").enixForms(_docCreate.validOption);
	
	_docCreate.permissionTable = $("div[name=selectPermissionDiv] table[name=permissionListTable]")
        .enixTable({
            colGroup : ["20px","*","120px"],
            colAlign : ["aCenter", "aLeft","aCenter"],
    });
	
    // 업로드 플러그인 초기화
    _docCreate.initUpload();
    
    // 문서 등록 팝업 초기화
    _docCreate.initCreate();
}



var _docCreate = {
    createForm : null,
    permissionTable : null,
    validOption : {
        displayError : true,
        docName : {
            required : true
        }
    },
    typeList : null,
    successCallback : null,
    uploadFileList : [],
    fileUploader : null,
    
    /**
     * 업로드 플러그인 초기화
     */
    initUpload : function () {
	
			_docCreate.fileUploader = $("form[name=documentCreateForm] div[name=fileUpload]").pluploadQueue({
            runtimes : 'html5,flash,silverlight,html4',
            url : "/enixClever/io",
            type : "POST",
            unique_names : true,
            chunk_size : '1024mb',
            dragdrop: true,

            filters : {
                max_file_size : '1024mb',
            },

            init : {
                FileUploaded : function (up, file, info) {
	
	            },
                UploadComplete : function (up, file) {
	                // 문서 정보 취합 후 등록 수행
                    _docCreate.fnInsertDocument();
                }
            },

            // Flash settings
            flash_swf_url : '/enixClever/plugins/plupload/js/Moxie.swf',

            // Silverlight settings
            silverlight_xap_url : '/enixClever/plugins/plupload/js/Moxie.xap'
        });
    },
    initCreate : function () {
        var typeSelector = _docCreate.createForm.find("div[name=docTypeId]");

        // 문서 유형 변경 이벤트 연결
        typeSelector.on("change", this.evtTypeChanged);

        // 문서 유형 목록 조회
        enixClever.api.type.selectTypeList(function (res) {
            
            _docCreate.typeList = res.data.typeList;
            uiHandller.appendOptionList(
                typeSelector,
                "docTypeId",
                _docCreate.typeList,
                "typeName",
                "typeId",
                function () {
                    typeSelector.change();
                }
            )
        });
    },
    /**
     * 문서 유형 변경 이벤트
     */
    evtTypeChanged : function () {
		
		var targetDiv = _docCreate.createForm.find("div[name=typeItemDiv]");
        targetDiv.empty();

        var typeId = _docCreate.createForm.find("input[name=docTypeId]:checked").val();
        
        var typeInfo = null;

		$.each(_docCreate.typeList, function (idx, item) {
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
			targetDiv.append(_docCreate.typeItemTag.format(item.itemName, item.itemId));
        });
        
    },
    /**
     * 문서 유형 아이템 목록 구성
     */
    fnGetTypeItemList : function (typeId) {
	
		
        var arr = [];
        $.each(_docCreate.createForm.find("div[name=typeItemSection]"), function (idx, divRow) {
            var docTypeItem = {
                typeId : typeId,
                itemId : $(divRow).find("input").prop("name"),
                itemValue : $(divRow).find("input").val()
            }
            arr.push(docTypeItem);
        });
        return arr;
    },
    /**
     * 문서 정보를 취합하여 등록한다
     */
    fnInsertDocument : function () {
	
		var uploader = $(_docCreate.fileUploader).pluploadQueue();
        var data = _docCreate.createForm.toJson();
        
        data.fileList = [];
        data.fileCount = uploader.files.length;

		$.each(uploader.files, function(idx, item) {
			data.fileList.push({ tempUploadName : item.id, fileName : item.name})
        });
		
		data.docTypeItemList = _docCreate.fnGetTypeItemList(data.docTypeId);

		
		enixClever.api.doc.insertDoc(data, function (res) {
            displayResult(res, data);
            if (typeof _docCreate.successCallback == "function") {
				_docCreate.successCallback();
            }
        });
    },
    
    
    /**
     * 권한 선택
     */
    evtSelectPermission : function () {

		enixClever.modal.load(
            constants.url.selectPermission,
            null,
            function (permissionInfo, currentAccessorList) {
                _docCreate.createForm.binding({
                    permissionId : permissionInfo.permissionId,
                    permissionName : permissionInfo.permissionName
                });
				_docCreate.permissionTable.setPermissionData(currentAccessorList);               
            },"md-large"
        );
    },

	/**
     * 사용자 선택
     */
    evtSelectUser : function (objId, objName) {

		enixClever.modal.load(
            constants.url.selectUser,
            null,
            function (userInfo) {
				$("div").find('input[name={0}][type=hidden]'.format(objId)).val(userInfo.userKey);
                $("div").find('input[name={0}][type=text]'.format(objName)).val(userInfo.userName);
            },
            "md-large"
        );
    },
        
    /**
     * 저장 폴더 선택
     */
    evtSelectFolder : function () {

        enixClever.modal.load(
            constants.url.selectFolder,
            null,
            function (permissionInfo) {
                _docCreate.createForm.binding({
                    permissionId : permissionInfo.permissionId,
                    permissionName : permissionInfo.permissionName
                });
            },"md-midium"
        );
    },
    
    /**
     * 문서 등록
     */
    evtSubmitClick : function (statusCode) {
		var securityCode = document.documentCreateForm.securityCode.value; 
    	
    	if(securityCode == "S2" || securityCode == "S3"){
				enixClever.modal.load(
		            constants.url.documentPromotion,
		            null,
		            function() {
		                _docCreate.fnSubmitClick("PROMOTION");                
		            },
		            "md-midium"
		        );
		}else{
			_docCreate.fnSubmitClick(statusCode);
		}
		
    },
    
    /**
     * 문서 등록 써밋
     */
    fnSubmitClick : function (statusCode) {
 
        // 문서 등록시 상태 정보 기록
        document.documentCreateForm.statusCode.value = statusCode;
        
        //임시적으로 제목에 값을 넣어둠.. - 테스트 목적 by kimsfeel
        
        //if(document.documentCreateForm.docName.value == ""){
	        document.documentCreateForm.docName.value = _temp_title[Math.floor( ( Math.random() * 100 ) ) ];
        //}
        
        var uploader = $(_docCreate.fileUploader).pluploadQueue();

		// 업로드할 파일이 있을 경우
        if (uploader.files.length > 0) {
            // 파일 업로드 후 문서 등록
            uploader.start();

        } else {
			// 문서 정보 취합 후 등록
            _docCreate.fnInsertDocument();

        }
		
    },
    /**
     * 모달 종료
     */
    evtCancelClick : function () {
        enixClever.modal.close();
    },
    
    typeItemTag :	'<div>' +
			        '   <label>{0}</label>' +
			        '   <div name="typeItemSection">' +
			        '       <input name="{1}" type="text">' +
			        '   </div>' +
			        '</div>'
}

function displayImage(imgValue) {
	
	
	$('#secretImageTop').empty();
	$('#secretImageBottom').empty();
	
	if(imgValue.value == "S2" || imgValue.value == "S3" ){
		$('#secretImageTop').append("<img src='/enixClever/assets/images/icon_secret_{0}.png'>".format(imgValue.value));
		$('#secretImageBottom').append("<img src='/enixClever/assets/images/icon_secret_{0}.png'>".format(imgValue.value));
		
		$('#divApproval').attr('style', "display:'';");  		//나타내기
		$('#divExpireCode').attr('style', "display:none;");  	//숨기기
		
	}else{
		$('#divExpireCode').attr('style', "display:'';");  //나타내기
		$('#divApproval').attr('style', "display:none;");  //숨기기
	}
		
}


function displayResult(res, data){

	$('#btnGroup-pop').empty();
	
	let dispZone = $('#write_info_area');
	
		dispZone.empty();
		dispZone.append(
							'<div class="complete_insert">'+
							'<h4>'+res.message+'</h4>'+
							'<p> - 제목 : <b>'+res.data.docInfo.docName+'</b></p>'+
							'<p> - 문서아이디 : '+res.data.docInfo.docId+'</p>'+
							'<p> - 문서상태 : '+res.data.docInfo.statusCodeName+'</p>'+
							'<p> - 보안등급 : <font  class="txt-red">'+res.data.docInfo.securityCodeName+'</font></p>'+
							'<button class="btn btn-primary" onclick="window.close()">확인</button>'+
							'</div>'
						);
						
		window.opener.pageReload();
						
}