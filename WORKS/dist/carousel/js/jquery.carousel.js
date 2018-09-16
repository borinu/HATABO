;(function($){
	var CarouselController = function($frame, options){
		if($frame.length == 0){
			return;
		}
		this.settings = $.extend({
			slideAuto : true,
			slideTime : 300,
			slideInterval : 5000,
			slideLoop : true,
			flickEnabled : true,
			flickThreshold : 75,
			indicatorAdjustment : false,
			imageCountPerView : 1,
			destroy : false
		}, options);

		this.$frame = $frame;
		this.init();
	};
	CarouselController.prototype = {
		INDICATOR_CURRENT_CLASS : 'current',
		TRIGGER_DISABLE_CLASS : 'disabled',

		init : function(){
			this.setParameters();
			this.createIndicators();
			this.cloneImage();
			this.controlTrigger();
			this.bindEvent();
			this.setTimer();
		},
		setParameters : function(){
			this.$window = $(window);
			this.$wrapper = this.$frame.find('.jsc-carousel-wrapper');
			this.$container = this.$frame.find('.jsc-carousel-container');
			this.$previous = this.$frame.find('.jsc-previous-trigger');
			this.$next = this.$frame.find('.jsc-next-trigger');
			this.$indicatorContainer = this.$frame.find('.jsc-indicator-container');
			this.viewWidth = this.$wrapper.width();
			this.viewCount = Math.ceil(this.$container.children().length / this.settings.imageCountPerView);
			this.viewOffset = this.$container.children().length % this.settings.imageCountPerView;

			if(this.viewOffset == 0){
				this.viewOffset = this.settings.imageCountPerView;
			}
			this.currentIndex = this.settings.slideLoop ? 1 : 0;
			this.timerIds = [];
			this.startAxis = null;

			this.$cassettes = this.$container.children();

			var imageWidth = this.viewWidth / this.settings.imageCountPerView;

			this.$cassettes.width(imageWidth);
			this.$container.width(imageWidth * this.$cassettes.length);
			this.carouselId = (new Date()).getTime();
		},
		createIndicators : function(){
			if(this.$indicatorContainer.length == 0){
				return;
			}
			if(this.settings.indicatorAdjustment){
				var $indicatorTemplate = this.$indicatorContainer.children().detach(),
					fragment = document.createDocumentFragment();

				for(var i = 0, count = this.viewCount; i < count; i++){
					fragment.appendChild($indicatorTemplate.clone().get(0));
				}
				this.$indicatorContainer.get(0).appendChild(fragment);
			}
			this.$indicators = this.$indicatorContainer.find('a');
			this.$indicators.eq(0).addClass(this.INDICATOR_CURRENT_CLASS);
		},
		cloneImage : function(){
			if(!this.settings.slideLoop){
				return;
			}
			var $lis = this.$container.children();

			for(var i = 0, length = this.settings.imageCountPerView; i < length; i++){
				this.$container.prepend($lis.eq($lis.length - 1 - i).clone().data('clone', true));
				this.$container.append($lis.eq(i).clone().data('clone', true));
			}
			this.$cassettes = this.$container.children();

			var imageWidth = this.viewWidth / this.settings.imageCountPerView;

			this.$cassettes.width(imageWidth);
			this.$container.width(imageWidth * this.$cassettes.length);

			this.scrollImages(this.viewWidth, 1, 0, 0);
		},
		bindEvent : function(){
			var myself = this;

			this.$window.on('resize.' + this.carouselId, $.proxy(this.adjustForResize, this));
			this.$previous.on('click.' + this.carouselId, $.proxy(this.slideToPrevious, this));
			this.$next.on('click.' + this.carouselId, $.proxy(this.slideToNext, this, false));

			if(this.$indicatorContainer.length > 0){
				this.$indicators.each(function(index){
					$(this).on('click.' + myself.carouselId, $.proxy(myself.slideByIndicator, myself, index));
				});
			}
			this.$container.on('transitionend.' + this.carouselId + ' webkitTransitionEnd.' + this.carouselId, $.proxy(this.finishToMove, this));

			if(this.settings.flickEnabled){
				this.$container.on('mousedown.' + this.carouselId + ' touchstart.' + this.carouselId, $.proxy(this.startToFlick, this));
				this.$container.on('mousemove.' + this.carouselId + ' touchmove.' + this.carouselId, $.proxy(this.flick, this));
				this.$container.on('mouseup.' + this.carouselId + ' touchend.' + this.carouselId, $.proxy(this.endToFlick, this));
				this.$container.on('dragstart.' + this.carouselId, $.proxy(this.preventDefault, this));
			}
		},
		adjustForResize : function(){
			var viewWidth = this.$wrapper.width();

			if(this.viewWidth == viewWidth){
				return;
			}
			this.clearTimer();
			this.viewWidth = viewWidth;

			var imageWidth = this.viewWidth / this.settings.imageCountPerView;

			this.$cassettes.width(imageWidth);
			this.$container.width(imageWidth * this.$cassettes.length);

			this.scrollImages(this.viewWidth, this.currentIndex, 0, 0);
			this.setTimer();
		},
		preventDefault : function(event){
			event.preventDefault();
		},
		startToFlick : function(event){
			this.clearTimer();
			this.startAxis = this.getAxis(event);
		},
		flick : function(event){
			if(!this.startAxis){
				return;
			}
			event.preventDefault();

			var axis = this.getAxis(event),
				dx = axis.x - this.startAxis.x;

			this.scrollImages(this.viewWidth, this.currentIndex,  -dx, 0);
		},
		endToFlick : function(event){
			if(!this.startAxis){
				return;
			}
			var axis = this.getAxis(event),
				dx = axis.x - this.startAxis.x;

			if(dx > -this.settings.flickThreshold && dx < this.settings.flickThreshold){
				this.scrollImages(this.viewWidth, this.currentIndex, 0, this.settings.slideTime);
			}else{
				if(dx > 0){
					this.slideToPrevious();
				}else{
					this.slideToNext(false, null);
				}
			}
			this.startAxis = null;
			this.setTimer();
		},
		getAxis : function(event){
			var touches = event.originalEvent.changedTouches;
			return touches ? {x : touches[0].pageX, y : touches[0].pageY} : {x : event.pageX, y : event.pageY};
		},
		slideToPrevious : function(event){
			if(event){
				event.preventDefault();
			}
			this.clearTimer();
			this.currentIndex = Math.max(this.currentIndex - 1, 0);
			this.scrollImages(this.viewWidth, this.currentIndex, 0, this.settings.slideTime);
		},
		slideToNext : function(loopBack, event){
			if(event){
				event.preventDefault();
			}
			this.clearTimer();

			if(this.settings.slideLoop){
				this.currentIndex = Math.min(this.currentIndex + 1, this.viewCount + 1);
			}else{
				if(++this.currentIndex == this.viewCount){
					this.currentIndex = loopBack ? 0 : (this.viewCount - 1);
				}
			}
			this.scrollImages(this.viewWidth, this.currentIndex, 0, this.settings.slideTime);
		},
		slideByIndicator : function(index, event){
			event.preventDefault();

			this.clearTimer();
			this.currentIndex = index + (this.settings.slideLoop ? 1 : 0);
			this.scrollImages(this.viewWidth, this.currentIndex, 0, this.settings.slideTime);
		},
		scrollImages : function(viewWidth, index, offset, duration){
			var distance;

			if(index >= this.viewCount + (this.settings.slideLoop ? 0 : - 1)){
				distance = viewWidth * (index - 1) + viewWidth / this.settings.imageCountPerView * this.viewOffset + offset;
			}else{
				distance = viewWidth * index + offset;
			}
			this.$container.css('transition-duration', duration / 1000 + 's');
			this.$container.css('transform', 'translate3d(' + -distance + 'px, 0px, 0px)');
		},
		finishToMove : function(){
			if(this.settings.slideLoop){
				if(this.currentIndex == 0){
					this.currentIndex = this.viewCount;
				}else if(this.currentIndex == this.viewCount + 1){
					this.currentIndex = 1;
				}
				this.scrollImages(this.viewWidth, this.currentIndex, 0, 0);
			}else{
				this.controlTrigger();
			}
			this.setTimer();

			if(this.$indicatorContainer.length > 0){
				this.$indicators.removeClass(this.INDICATOR_CURRENT_CLASS);
				this.$indicators.eq(this.currentIndex + (this.settings.slideLoop ? -1 : 0)).addClass(this.INDICATOR_CURRENT_CLASS);
			}
		},
		controlTrigger : function(){
			if(this.settings.slideLoop){
				return;
			}
			if(this.currentIndex == 0){
				this.$previous.addClass(this.TRIGGER_DISABLE_CLASS);
			}else{
				this.$previous.removeClass(this.TRIGGER_DISABLE_CLASS);
			}
			if(this.currentIndex == this.viewCount - 1){
				this.$next.addClass(this.TRIGGER_DISABLE_CLASS);
			}else{
				this.$next.removeClass(this.TRIGGER_DISABLE_CLASS);
			}
		},
		setTimer : function(){
			if(!this.settings.slideAuto){
				return;
			}
			this.clearTimer();
			this.timerIds.push(setInterval($.proxy(this.slideToNext, this, true, null), this.settings.slideInterval));
		},
		clearTimer : function(){
			while(this.timerIds.length > 0){
				clearInterval(this.timerIds.pop());
			}
		},
		destroy : function(){
			this.clearTimer();

			var myself = this;

			this.$window.off('resize.' + this.carouselId, this.adjustForResize);
			this.$previous.off('click.' + this.carouselId, this.slideToPrevious);
			this.$next.off('click.' + this.carouselId, this.slideToNext);

			if(this.$indicatorContainer.length > 0){
				this.$indicators.each(function(index){
					$(this).off('click.' + myself.carouselId, myself.slideByIndicator);
				});
			}
			this.$container.off('transitionend.' + this.carouselId + ' webkitTransitionEnd.' + this.carouselId, this.finishToMove);

			if(this.settings.flickEnabled){
				this.$container.on('mousedown.' + this.carouselId + ' touchstart.' + this.carouselId, this.startToFlick);
				this.$container.on('mousemove.' + this.carouselId + ' touchmove.' + this.carouselId, this.flick);
				this.$container.on('mouseup.' + this.carouselId + ' touchend.' + this.carouselId, this.endToFlick);
				this.$container.on('dragstart.' + this.carouselId, this.preventDefault);
			}
			if(this.settings.indicatorAdjustment){
				this.$indicators.removeClass(this.INDICATOR_CURRENT_CLASS).filter(':not(:first)').remove();
			}
			this.$cassettes.each(function(){
				if($(this).data('clone')){
					$(this).remove();
				}
			});
			this.scrollImages(this.viewWidth, 0, 0, 0);
		}
	};
	$.fn.carousel = function(options){
		if(options.destroy){
			var controller = $(this).data('carousel-controller');

			if(controller){
				controller.destroy();
			}
		}else{
			this.each(function(){
				$(this).data('carousel-controller', new CarouselController($(this), options));
			});
		}
	};
})(jQuery);