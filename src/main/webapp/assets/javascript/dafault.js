$(document).ready(function(){
	$(".icon-mypage").on("click",function(){
		event.preventDefault();		
		menuOpen();
		fixedBody();
	});
	$(".mymenu-close").on("click",function(){
		menuClose();
		unfixedBody();
	});

	$(".toggle").on("click",function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			$(".container-wrap").removeClass("active");
			$(".navigation").removeClass("active");
		} else {
			$(this).addClass("on");
			$(".container-wrap").addClass("active");
			$(".navigation").addClass("active");

		}
	});

	$(".chart-info").on("click",function(){
		if($(".chart-info-view").css("display")=="none"){
			$(".chart-info-view").show();
		} else {
			$(".chart-info-view").hide();
		}
	});

	$(".rel-pop").on("click",function(){
		event.preventDefault();
		$("html, body").css("overflow","hidden");
		$(".overlay").show();
		$("#defaultModal1").show();
	});

	$(".modal-close, .modal-close-btn").on("click",function(){
		$(".overlay").hide();
		$("#defaultModal1").hide();
		$("html, body").removeAttr("style");
	});
	$(".rel-pop1").on("click",function(){
		event.preventDefault();
		$("html, body").css("overflow","hidden");
		$(".overlay").show();
		$("#defaultModal2").show();
	});

	$(".modal-close, .modal-close-btn").on("click",function(){
		$(".overlay").hide();
		$("#defaultModal2").hide();
		$("html, body").removeAttr("style");
	});

	//상단 상세 셀렉트
	$(".btn_detail > a").click(function(){
		$(this).children("i").toggleClass("up");
		$(this).next(".detailbox_area").toggle();
	});
	$(".btn_detail .detailbox_area").removeClass(function(){
		$(".btn_detail > a i").removeClass();
		$(this).hide();
	});

	//상단 상세 기간
	$('[class*=btn_dropdown__]').on('click', function () {
        var $this = $(this);    
        $this.hasClass('on') ? $this.removeClass('on').siblings('[class*=dropdown_items__]').removeClass('on').closest('.dropdown').removeClass('on') : $this.addClass('on').siblings('[class*=dropdown_items__]').addClass('on').closest('.dropdown').addClass('on');
    });
    $('[class*=dropdown_items__]').on('click','a', function () {
        var $this = $(this)
            $parent = $this.parent('li'),
            $wrap = $this.closest('.dropdown')
            $items = $wrap.find('[class*=dropdown_items__]'),
            $dropdownBtn = $wrap.find('[class*=btn_dropdown__]'),
            _text = $this.text();
        $parent.addClass('selected').siblings().removeClass('selected');
        $wrap.removeClass('on');
        $items.removeClass('on');
        $dropdownBtn.removeClass('on').text(_text);
    });

	//최근 검색 리스트
	$('#target_search').focusin(function() {
        $(".searching_list").show()
    })
	$('#target_search').focusout(function() {
        $(".searching_list").hide()
    })

});

function menuOpen(){
	$('#mymenu').stop().show().animate({right:0}, 500);
	$('.overlay').fadeIn(300);
}
function menuClose(){
	$('#mymenu').stop().animate({right:'-100vw'}, 500, function(){
		$('#mymenu').hide();
	})
	$('.overlay').fadeOut(300);
}
function fixedBody(){
	$("html, body").css("overflow","hidden");
}

function unfixedBody(){
	$("html, body").removeAttr("style");
}
