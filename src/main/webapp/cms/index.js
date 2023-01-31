$(document).ready(function(){

    evtGoMenu("myDocument");
    
    $("#search").load("/enixClever/cms/common/search.html", function() {	});
        
	//관리자인 경우 관리자 버튼 도시
	if(enixClever.user.userInfo.isAdmin == "Y") {
		$('#adminBtndddd').attr('style', "display:block;");
	}     
         
   	$(".navi li").click(function(){
		$(".toplist").removeClass("on");
		$(this).addClass("on");
	});
	
	enixClever.user.load(function () {
	    // 사용자 정보 출력
	    $("#userProfileDiv div[name=userName]").html(enixClever.user.userInfo.userName);
	    $("#userProfileDiv div[name=groupName]").html(enixClever.user.userInfo.groupName);
	});
	
});



function evtGoMenu(Part) {
	
	$("#leftMenuDiv").load("./cms/menu/"+Part+".html", function() {	});
}


function evtGoSystem() {
	window.open("/enixClever/manage/index.html", "시스템 관리", "location=no,toolbar=no,resizable=no,top=100,left=600,width=1280px,height=720px,,scrollbars=yes");
}


function fnUserConfig() {
    enixClever.modal.load(
        "/enixClever/cms/user/userConfig.html",
        null,
        null,
        "md-midium",
        "height:450px"
    );
}


function fnLogout() {
    enixClever.api.user.logout(function (res) {
        enixClever.page.login();
    });
}


//POST는 FORM 통해서 던져야하기 때문에 스크립트로 FORM 생성 후 전달
function createDocument(verb, url, data, target) {
	window.open(constants.url.documentCreate+"?a=b", "documentCreate" + Math.random(), "location=no,toolbar=no,resizable=no,top=100,left=600,width=800px,height=960px,,scrollbars=yes");
}


