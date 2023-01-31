$(document).ready(function(){
	
    evtGoMenu("system");
    
});


function evtGoMenu(Part) {
	
	$("#leftMenuDiv").load("/enixClever/manage/menu/system.html", function() {	
		
	});
}


function fnLogout() {
    enixClever.api.user.logout(function (res) {
        enixClever.page.login();
        window.close();
    });
}