'use strict';

var $jscSelectedCoupon = $('.jscSelectedCoupon');
var offSetTop = $jscSelectedCoupon.offset().top;
var $window = $(window);
var $clearBtn = $('.clear a');
var $clearBtn2 = $('.clear');
var $clearBtn3 = $('.clear3');

$(function () {

	$window.on('scroll', function () {

		var winFlag = $window.scrollTop();

		if (winFlag >= offSetTop) {
			$jscSelectedCoupon.addClass('fixed');
		} else {
			$jscSelectedCoupon.removeClass('fixed');
		}
	});
	$clearBtn.on('click', function () {
		$jscSelectedCoupon.removeClass('append');
	});
});