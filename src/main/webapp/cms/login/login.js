$(document).ready(function () {

    let storedId = enixClever.utils.getCookie("storedId");

    $("form input").filter("[type=text], [type=password]").on("keydown", function(key) {
        if (key.keyCode == 13) {
            fnLoginClick();
        }
    });
});

function fnLoginClick () {
	
	
	
	let data = $("form[name=loginForm]").serializeObject();

    let isStored = data.storedId === "Y";

	

    // 로그인 처리
    enixClever.api.user.login(data.userKey, data.userPass,
        // API 성공
        function (res) {
            // ID 저장 여부 > 쿠키 저장 에러
            if (isStored) {
                enixClever.utils.setCookie("storedId", userKey);
            } else {
                enixClever.utils.removeCookie("storedId");
            }


            // 메인 페이지로 이동
            enixClever.page.index();
        },
        // API 실패
        function (errMessage) {
	        enixClever.alert.error(errMessage);
        });
}