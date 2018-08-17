'use strict';

const $carouseImglList = $(".jscCarouseImglList");
const $carouselWindow = $(".jscCarouselWindow");
const $carouselimg = $carouseImglList.find('img');
const carouselimgWidth = $carouselimg.width();
const changePoint = carouselimgWidth * ($carouselimg.length-1) * -1;
const imgWidth = $carouselimg.width();
const $rightBtn = $(".jscRightBtn");
const $leftBtn = $(".jscLeftBtn");


$(function () {
	$rightBtn.on('click', function () {
		let carouselOffsetLeft = $carouseImglList.offset().left;

		if(carouselOffsetLeft === changePoint){
			//最終画像に到達した段階で、元の状態に戻す。
			//そしてそのままifを抜けて、2枚目画像へ移動する。
			$carouseImglList.css('left', '0');
			carouselOffsetLeft = 0;
		}
		$carouseImglList.animate({ 'left': carouselOffsetLeft - imgWidth }, 500);

	});
});



//
//$(window).on('load',function(){
//	//
//	//htmlからleft,rightの情報をjqオブジェクトとして取得、onklickで操作
//	//をするために使う
//	var $leftButton = $('#left');
//	var $rightButton = $('#right');
//	var $container = $('.container');
//
//	var $img = $('img');
//	var imgWidth = $img.width();
//	//⑤が表示されているときの、①の画像のposition-left（−3200）をとる.ただの-3200。
//	var changePoint = imgWidth * ($img.size()-1) * -1;
//	//container’箱’のposition-left’一番後ろ’の値をとる。比較用。
//
//
//	//アニメーション中にアニメーションさせない
//	$leftButton.on('click',function(){
//		if($container.is(':animated')){
//			return;
//		}
//		//containerLeft’コンテナの後ろ’がimgposition'⑤　表示＞①-3200'の時
//		//----------左ボタン
//		var containerLeft = $container.position().left;
//
//		//箱のleftが最後の画像の表示位置にある時、箱（conteinerLeft）を最初の位置に移動させる。
//		if(containerLeft == changePoint){
//
//			//$containerのleftの位置は0になるが、containerleftの中身は-3200のまま
//			$container.css('left', '0');
//
//			//0を代入。下で0から（最初の画像の位置から始まる）使うため。
//			containerLeft = 0;
//		}
//		//最後画像じゃなかった時の基本の目的。箱のleftをimg画像分　-　する。
//		$container.animate({ 'left': containerLeft - imgWidth }, 500);
//	});
//
//	//--------右ボタン
//	//今のcontainerのrightの値は？
//	$rightButton.on('click',function(){
//		if($container.is('animated')){
//			return;
//		}
//
//		var containerLeft = $container.position().left;
//		if( containerLeft == 0 ){
//			$container.css('left',changePoint);
//
//			containerLeft = changePoint;
//		}
//		$container.animate({ 'left' : containerLeft + imgWidth }, 500);
//	});
//
//});

//---------------------------------------------------
//    leihauoli-object
//---------------------------------------------------
//
//
//var LEIHAUOLI = LEIHAUOLI || {};
//
//LEIHAUOLI.OBJECT = {
//	init : function(){
//		//ここでは初期化の場所として最初に実行したい関数を実行する
//		this.setParamters();
//		this.prepare();
//		this.bindEvent();
//
//	},
//	setParameters : function(){
//		this.leftButton = $('#left');
//		this.rightButton = $('#right');
//		this.container = $('.container');
//		this.img = $('img');
//		this.imgWidth = $img.width();
//
//	},
//	prepare : function(){
//
//
//
//	},
//	bindeEvent : function(){
//		//左右ボタンイベント--------
//		$leftButton.on('click',function(){
//
//			if($container.is(':animated')){
//				return;
//			}
//
//			var containerLeft = $container.position().left;
//			if(containerLeft == changePoint){
//				$container.css('left', '0');
//				containerLeft = 0;
//			}
//			$container.animate({ 'left': containerLeft - imgWidth }, 500);
//		});
//
//		$rightButton.on('click',function(){
//			if($container.is('animated')){
//				return;
//			}
//
//			var containerLeft = $container.position().left;
//			if( containerLeft == 0 ){
//				$container.css('left',changePoint);
//
//				containerLeft = changePoint;
//			}
//			$container.animate({ 'left' : containerLeft + imgWidth }, 500);
//		});
//
//
//	},
//	otherFuntion : function(){
//		//その他自分で実装した関数をここにかくとよし！
//
//	},
//	otherFunction2 : function(){
//
//	}
//};
//
////ここがスクリプトで一番最初に呼ばれる場所。（上のオブジェクトはただ定義しているだけでinit()関数を実行しないとOBJECT機能は使えない）
//$(function(){
//	//init()関数にOBJECT内の必要な関数をまとめているため、ここではinit()関数を呼び出すだけで、あとはOBJECTの機能が中で勝手にやってくれる
//	LEIHAUOLI.OBJECT.init();
//});
//
