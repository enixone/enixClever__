function initModal(data, cb){
	

	//상단의 결제박스 타이틀 생성
	var label_workflow_information = "결제정보 입력";

	switch(data.workflowStatus){
		case "APPROVAL" : label_workflow_information = "승인사유 입력"; break;
		case "REJECTION" : label_workflow_information = "반려사유 입력"; break;
		case "WITHDRAW" : label_workflow_information = "회수사유 입력"; break;
		case "DELETE" : label_workflow_information = "삭제사유 입력"; break;
	}

	$("#label_workflow_information").html(label_workflow_information);
	
	_workflowStep.dataForm = $("form[name=workflowForm]").enixForms();
	_workflowStep.docuInfo = data;
	
	$("#actorMessage").focus();
	
	_workflowStep.successCallback = arguments[1];
}


var _workflowStep = {
    docuInfo : null,
    dataForm : null,
    successCallback : null,
    
    updateWorkflow : function(){
		_workflowStep.dataForm.binding({
            docId : _workflowStep.docuInfo.docId,
            workflowId : _workflowStep.docuInfo.workflowId,
            workflowStatus : _workflowStep.docuInfo.workflowStatus
        });
		
		let data = _workflowStep.dataForm.toJson();

		enixClever.api.workflow.updateWorkFlow(data, function (res) {
		    if (typeof _workflowStep.successCallback == "function") {
                _workflowStep.successCallback(res);
            }
	    });
    }
    
}

/**
 * 확인시 선택한 사용자를 가져온다.
 */
function evtSubmitClick() {
    _workflowStep.updateWorkflow();
}


/**
 * 선택된 폴더를 가져온다.
 */
function evtCancelClick() {
    enixClever.modal.close();
}

