$(document).ready(function(){

	console.log("Start > myDocument.js");
	
	$(".navBtnArrow").on("click",function(){
		$navSubWrap = $(this).next();
		$(".navSubWrap").slideUp();
		$(".navBtnWrap li").removeClass("on");

		if($navSubWrap.css("display")=="none"){
			$(this).closest("li").addClass("on");
			$navSubWrap.slideDown(500);
		}
	});	
	
  	fnInit();
});


function fnInit() {
	$("#leftMenuDiv ul li a").on("click",evtMenuClick);
	// 내문서 클릭 효과
	fnActivateMenu("docListMyDocument"); 			
}

function fnActivateMenu(menuId) {
	$("#leftMenuDiv ul li a[data-menu-id={0}]".format(menuId)).click();
}

/**
 *  메뉴를 클릭했을 때, 실행
 */
var isLoadMyDocument = false;
var reloadMenuId = null;
function evtMenuClick() {

    var menuId = $(this).data("menu-id");

	if (!menuId){
		return;
    }
	
	reloadMenuId = menuId;
	
	$("#leftMenuDiv ul li").removeClass("on");
    $("#leftMenuDiv ul li").removeClass("mm-active");
    $("#leftMenuDiv ul li a").removeClass("mm-active");
    
    $(this).addClass("mm-active");
    $(this).closest("li").addClass("on");
    $(this).closest("li").addClass("mm-active");
    
    
    //비밀관리 기록부인 경우
    if(menuId == "securityDocument"){

    	$("#mainContentDiv").load(constants.url["securityDocument"]);
    	isLoadMyDocument = false;

	//내 문서함 목록인 경우
	}else{
		
		$("#mainContentDiv").load(constants.url["myDocument"], function () {
            // modal의 js를 로드한다
            loadScript(function() {
                fnInit(menuId);
            });

        });

	}
}


function pageReload(){
	fnActivateMenu(reloadMenuId);	
}
