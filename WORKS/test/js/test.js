var HPG = HPG || {};
HPG.STICKY_SIDE = HPG.STICKY_SIDE || {};

HPG.STICKY_SIDE = {
	init: function() {
		this.$serectCoupon = $('.jscSelectedCoupon');
		if(this.$serectCoupon.length <= 0) return false;
		this.offSetTop = this.$serectCoupon.offset().top;
		this.$clearBtn = $('.clear').find('a');
		this.$window = $(window);
		this.append();
		this.bindEvent();
	},
	bindEvent: function() {
		var _self = this;

		this.$clearBtn.on('click', function() {
			_self.release();
		});
		this.$window.on('scroll', function() {
			_self.stickyFix();
		});
	},
	release: function() {
		this.$serectCoupon.removeClass('append');
	},
	append: function(){
		this.$serectCoupon.addClass('append');
	},
	stickyFix: function(){
		var winFlag = this.$window.scrollTop();
		if (winFlag >= this.offSetTop) {
			this.$serectCoupon.addClass('fixed');
		} else {
			this.$serectCoupon.removeClass('fixed');
		}
	}
};

$(window).on('load',function(){
	HPG.STICKY_SIDE.init();
});