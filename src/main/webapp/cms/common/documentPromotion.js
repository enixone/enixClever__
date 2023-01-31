function initModal(data, cb){
	

	_workflowStep.dataForm = $("form[name=documentPromotionForm]").enixForms();
	_workflowStep.dataForm.binding(data);
	
	$("#actorMessage").focus();
	
	_workflowStep.successCallback = arguments[1];
}


var _workflowStep = {
    dataForm : null,
    successCallback : null,
        
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
    
    evtSubmitClick : function(){
	
		if($("#actorId").val() == ""){
			return enixClever.alert.warn("승인자를 선택하세요");
		}else{
			
			_docCreate.createForm.binding({
	            actorId : $("#actorId").val(),
	            creatorMessage : $("#_creatorMessage").val()
	        });
			
			_workflowStep.successCallback();
			enixClever.modal.close();
		}
		
    },
    evtCancelClick : function(){
		enixClever.modal.close();
    }
    
}

