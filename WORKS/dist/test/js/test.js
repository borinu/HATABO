'use strict';

//'use strict';
//
//var HPG = HPG || {};
//HPG.STICKY_SIDE = HPG.STICKY_SIDE || {};
//
//HPG.STICKY_SIDE = {
//	init: function init() {
//		this.$serectCoupon = $('.jscSelectedCoupon');
//		if (this.$serectCoupon.length <= 0) return false;
//		this.offSetTop = this.$serectCoupon.offset().top;
//		this.$clearBtn = $('.clear').find('a');
//		this.$window = $(window);
//		this.append();
//		this.bindEvent();
//	},
//	bindEvent: function bindEvent() {
//		const _self = this;
//
//		this.$clearBtn.on('click', function () {
//			_self.release();
//		});
//		this.$window.on('scroll', function () {
//			_self.stickyFix();
//		});
//	},
//	release: function release() {
//		this.$serectCoupon.removeClass('append');
//	},
//	append: function append() {
//		this.$serectCoupon.addClass('append');
//	},
//	stickyFix: function stickyFix() {
//		var winFlag = this.$window.scrollTop();
//		var winFlag = this.$window.scrollTop();
//		if (winFlag >= this.offSetTop) {
//			this.$serectCoupon.addClass('fixed');
//		} else {
//			this.$serectCoupon.removeClass('fixed');
//		}
//	}
//};
//
//$(window).on('load', function () {
//	HPG.STICKY_SIDE.init();
//});

var $SelectedCoupon = $('.jscSelectedCoupon');
var offset = $SelectedCoupon.offset().top;
var $window = $(window);
var $clearBtn = $('.clear');

$(function () {
	var winFlag = $window.scrollTop();
	$window.on('scroll', function () {
		if (winFlag >= offset) {
			$SelectedCoupon.addClass('fixed');
		}
	});
	$clearBtn.on('click', function () {
		$SelectedCoupon.removeClass('append');
	});
});