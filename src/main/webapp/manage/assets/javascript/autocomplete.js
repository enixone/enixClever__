$(document).ready(function () {

});

function userNameAutocomplete() {
	
  $(function() {
	
	$('#userName').autocomplete({
        source : function(request, response) { //source: 입력시 보일 목록
		     $.ajax({
                    type: 'get',
                    url: "/enixClever/autocomplete/user?userKey=kimsfeel&boxId=MYBOX",
                    dataType: "json",
                   	data : {value: request.term},

                   	success: function(data) {
                        response(
                            $.map(data, function(item) {    
								if(item.userName.includes(request.term)) {
									return {
				                    	     label : item.userName +"("+item.userKey+")"  
				                           , value : item.userName 		
				                           , idx : item.userKey 
				                    };
                            }
						})
					)}
					
				})	
		},
        select : function(event, ui) {
			document.forms[0].userKey.value = ui.item.idx;
        },
        
        minLength : 2,
        autoFocus : true,
        classes : {
            'ui-autocomplete' : 'highlight'
        },
        delay : 500, 
        disable : true, 
        position: { my : "left top", at: "left top" },
        open: function(){
	        $(this).autocomplete('widget').css('z-index', 9999);
	        return false;
	    },
	    close : function(event) { 
        }
    });
});

}
function convertLabel(str){
	rVal = "<font color=red>"+str+"</font>";
	return rVal;
}

function folderNameAutocomplete() {

    $('#folderName').autocomplete({ 
		minLength : 2,
        autoFocus : true,
        delay : 100, 
        disable : true, 
        classes : { 'ui-autocomplete' : 'highlight'},
        position: { my : "left top", at: "left bottom" },
        source : function( request, response ) {
			$.ajax({
                    type: 'get',
                    url: "/enixClever/autocomplete/folder?userKey=kimsfeel&boxId=MYBOX",
                    dataType: "json",
                   	data : {value: request.term},

                   	success: function(data) {
						response(
                            $.map(data, function(item) {    
								if(item.folderName.includes(request.term)) {
									return {
				                    	     label : item.folderName  
				                           , value : item.folderName 		
				                           , idx : item.folderId 
				                    };
                            }
                            
						})
					)}
					
				})	
		},
        open: function(){
	        $(this).autocomplete('widget').css('z-index', 9999);
	        return false;
	    },
//	    select : function(event, ui) {
//			document.forms[0].folderId.value = ui.item.idx;
//        },
        close : function(event) { 
			return false;
        },
        focus : function(event, ui){
			return false;
		}
         
    });
	
}

function groupNameAutocomplete() {

	$('#groupName').autocomplete({
		
		minLength : 1,
        autoFocus : false,
        delay : 500, 
        disable : true, 
        classes : { 'ui-autocomplete' : 'highlight'},
        position: { my : "left top", at: "left bottom" },
		 
        source : function( request, response ) {	
			$.ajax({
                    type: 'get',
                    url: "/enixClever/autocomplete/group?userKey=kimsfeel&boxId=MYBOX",
                    dataType: "json",
                   	data : {value: request.term},
                   	success: function(data) {
						response(
                            $.map(data, function(item) {    
								if(item.groupName.includes(request.term)) {
									return {
				                    	     label : item.groupName  
				                           , value : item.groupName 		
				                           , idx : item.groupId 
				                    };
                            }
                            
						})
					)}
					
				})	
		},
        open: function(){
			$(this).autocomplete('widget').css('z-index', 9999);
	        return false;
	    },
	    select : function(event, ui) {
			document.userCreateForm.groupId.value = ui.item.idx;
        },
        close : function(event) { 
    		return false;
	    },
        focus : function(event, ui){
			return false;
		}
         
    });
	
}


function roleNameAutocomplete() {

	$('#roleName').autocomplete({ 
        source : function( request, response ) {	
			$.ajax({
                    type: 'get',
                    url: "/enixClever/autocomplete/role?userKey=kimsfeel&boxId=MYBOX",
                    dataType: "json",
                   	data : {value: request.term},
                   	success: function(data) {
						response(
                            $.map(data, function(item) {    
								if(item.roleName.includes(request.term)) {
									return {
				                    	     label : item.roleName  
				                           , value : item.roleName 		
				                           , idx : item.roleId 
				                    };
                            }
                            
						})
					)}
					
				})	
		},
        minLength : 1,
        autoFocus : true,
        classes : {
            'ui-autocomplete' : 'highlight'
        },
        delay : 200, 
        disable : true, 
        position: { my : "left top", at: "left bottom" },
        open: function(){
			$(this).autocomplete('widget').css('z-index', 9999);
	        return false;
	    },
	    select : function(event, ui) {
			document.userCreateForm.roleId.value = ui.item.idx;
        },
        close : function(event) { 
    		return false;
	    },
        focus : function(event, ui){
			return false;
		}
         
    });
	
}



function permissionNameAutocomplete() {

    $('#permissionName').autocomplete({ 
        source : function( request, response ) {	
			$.ajax({
                    type: 'get',
                    url: "/enixClever/autocomplete/permission?userKey=kimsfeel&boxId=MYBOX",
                    dataType: "json",
                   	data : {value: request.term},

                   	success: function(data) {
						response(
                            $.map(data, function(item) { 
						
								if(item.permissionName.includes(request.term)) {
									return {
				                    	     label : item.permissionName  
				                           , value : item.permissionName 		
				                           , idx : item.permissionId 
				                    };
	                        	}
						})
					)}
					
				})	
		},
        select : function(event, ui) {
			document.forms[0].permissionId.value = ui.item.idx;
        },
        
        minLength : 2,
        autoFocus : true,
        classes : {
            'ui-autocomplete' : 'highlight'
        },
        delay : 500, 
        disable : true, 
        position: { my : "left top", at: "left top" },
        open: function(){
	        $(this).autocomplete('widget').css('z-index', 9999);
	        return false;
	    },
	    close : function(event) { 
        }
         
    });
	
}


	

$('input[type="text"]').keydown(function() {
  if (event.keyCode === 13) {
    event.preventDefault();
  };
});
