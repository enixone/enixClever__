$(document).ready(function(){

	
	fnInit();
	
  
});






function fnInit() {

	$("#leftMenuDiv ul li a").on("click",evtMenuClick);
    
 	// 메뉴 로드 완료 시 기본 메뉴 클릭

    //fnActivateMenu("myDocument"); 			// 내문서 
    //fnActivateMenu("myNewDoc"); 			// 최근 등록 문서
    // fnActivateMenu("myRecentRead"); 		// 최근 조회 문서
    // fnActivateMenu("myBookmarkDoc"); 	// 내 관심 문서
    // fnActivateMenu("myBookmarkFolder"); 	// 관심 폴더
    // fnActivateMenu("myGiveOwnership"); 	// 소유권 인계
    // fnActivateMenu("myUrlLink"); 		// URL 링크
    // fnActivateMenu("boxGroup"); 			// 부서 문서함
    // fnActivateMenu("boxGlobal"); 		// 전사 문서함
    // fnActivateMenu("sysRole"); 			// 역할 관리
    // fnActivateMenu("sysPermission"); 	// 권한 관리
     fnActivateMenu("sysUser"); 			// 유저 관리
    // fnActivateMenu("sysGroup"); 			// 부서 관리
    // fnActivateMenu("sysType"); 			// 문서 유형 관리
    // fnActivateMenu("sysFolder"); 		// 문서 유형 관리
    // fnActivateMenu("sysExpired"); 		// 만기 문서 관리
    // fnActivateMenu("sysTrash"); 			// 만기 문서 관리
    // fnActivateMenu("statMost"); 			// 최다 조회 문서
    // fnActivateMenu("statUser"); 			// 사용자별 문서
    // fnActivateMenu("statTracking"); 		// 문서 추적
 
    
}

function fnActivateMenu(menuId) {
	
	$("#leftMenuDiv ul li a[data-menu-id={0}]".format(menuId)).click();
	
	
}

/**
 *  메뉴를 클릭했을 때, 실행
 */
function evtMenuClick() {

    var menuId = $(this).data("menu-id");

	 if(menuId == "encryption") {
		alert("장비 연동");
			
		return;
	}
	
    if (!menuId){
        return;
    }
    
   
	

    $("#leftMenuDiv ul li a").removeClass("on mm-active");
    $("#leftMenuDiv ul li").removeClass("on mm-active");
    $(this).addClass("mm-active");
    $(this).closest("li").addClass("on");
    $(this).closest("li").addClass("mm-active");

    $("#mainContentDiv").load(constants.url[menuId], function() {
			
    });
}
