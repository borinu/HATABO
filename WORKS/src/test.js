const $jscSelectedCoupon = $('.jscSelectedCoupon');
const offSetTop = $jscSelectedCoupon.offset().top;
const $window = $(window);
const $clearBtn =$('.clear a');
const $clearBtn2 =$('.clear');
const $clearBtn3 =$('.clear3');

$(function(){

	$window.on('scroll',function(){

		var winFlag = $window.scrollTop();

		if(winFlag >= offSetTop){
			$jscSelectedCoupon.addClass('fixed');
		}else {
			$jscSelectedCoupon.removeClass('fixed');
		}
	});
	$clearBtn.on('click',function(){
		$jscSelectedCoupon.removeClass('append');
	});

});