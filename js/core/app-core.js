/* ----------------------------------- */
/*         ___  _        _             */
/*        / _ \| | ___  (_)_ __        */
/*       | | | | |/ _ \ | | '__|       */
/*       | |_| | | (_) || | |          */
/*        \___/|_|\___(_)_|_|          */
/*                                     */
/*        Mail: animation@Olo.ir       */
/*   Designed by Olo Ads (Oloads.ir)   */
/*                                     */
/* ----------------------------------- */

$(document).ready( function(){

	//Pages

	$timer_page  = './pages/timer.html';
	$game_page   = './pages/game.html';

	//Loading Lines Motion

	function loading_motion(){
		new TimelineMax({repeat: -1}).to("#loading-line-1", .5, {morphSVG:"m 838.2766,476.78573 h 243.4468", ease: Power1.easeInOut}).to("#loading-line-1", .5, {morphSVG:"m 1081.7234,476.78573 v 0", ease: Power1.easeInOut});
		new TimelineMax({repeat: -1,delay:.45}).to("#loading-line-2", .5, {morphSVG:"m 838.2766,603.21429 h 243.4468", ease: Power1.easeInOut}).to("#loading-line-2", .5, {morphSVG:"m 838.2766,603.21429 v 0", ease: Power1.easeInOut});
	}

	//Loading On

	function loading_on(){
		TweenMax.set("#loading-line-1", {morphSVG:"m 838.2766,476.78573 v 0"});
		TweenMax.set("#loading-line-2", {morphSVG:"m 1081.7234,603.21429 v 0"});
		loading_motion();
		TweenMax.set("#loading", {opacity:0});
		$("#loading").removeClass("active");
		TweenMax.to("#loading", 1, {opacity:1, ease: Power4.easeInOut});
	}

	//Loading Off

	function loading_off(){
		TweenLite.delayedCall(2, function(){TweenMax.to("#loading", 1, {opacity:0, ease: Power4.easeInOut});});
		TweenLite.delayedCall(3, function(){$("#loading").addClass("active");TweenMax.killTweensOf("#loading-line-1, #loading-line-2");});
	}

	//Cache Cheacker

	function cache_cheack (value){
		$("#timer-cache, #game-cache").addClass("cache-storage");
		if( $(".after-load").parent().find("#"+value+"-cache").length == 1)
			return true;
		else
			return false;
	}
	
	//JS Load Function

	function jsfunction(value) {
		if (typeof value != 'undefined')
		{
			if( value == 'game_loadetrue')
			{
				if (typeof howl_runing != 'undefined')
				{
					if (typeof draggable_runing != 'undefined')
					{
						if( typeof $loadfp != 'undefined' && $loadfp == true )
						{
							loading_off();
						}
						else
						{
							setTimeout(function(){jsfunction(value);}, 1000);
						}
					}
					else
					{
						setTimeout(function(){jsfunction(value);}, 1000);
					}
				}
				else
				{
					setTimeout(function(){jsfunction(value);}, 1000);
				}
			}
			else
			{
				loading_off();
			}
		}
		else
		{
			setTimeout(function(){jsfunction(value);}, 1000);
	    }
	}

	//Timer Page Load

	function page_timer(){
		if( cache_cheack('timer') == true )
		{
			$("#timer-cache").removeClass("cache-storage");
			loading_off();
		}
		else
		{
			$.get($timer_page, function (DataPage) {
				$(".after-load").append(DataPage);
				jsfunction('timer_loadetrue');
			});
		}
	}

	//Game Page Load

	function page_game(){
		if( cache_cheack('game') == true )
		{
			$("#game-cache").removeClass("cache-storage");
			loading_off();
		}
		else
		{
			$.get($game_page, function (DataPage) {
				$(".after-load").append(DataPage);
				jsfunction('game_loadetrue');
			});
		}
	}

	// Timer Motor Click

	$(".after-load").on("click","#timer-motor", function(){
		loading_on();
		TweenLite.delayedCall(1, function(){
			TweenMax.killTweensOf("#timer-motor-red, #timer-motor-blue, #timer-motor");
			TweenMax.set("#timer-motor-red, #timer-motor-blue, #timer-motor", {x:0, y:0});
			$("#timer-log").addClass("object-disable");
			$("#error-log").addClass("object-disable");
			$("#timer-motor-red").addClass("object-disable");
			$("#timer-motor-blue").addClass("object-disable");
			clearTimeout($sto1);
			clearTimeout($sto2);
			clearTimeout($sto3);
			clearTimeout($sto4);
			clearTimeout($sto5);
			clearTimeout($sto6);
			clearTimeout($sto7);
			clearTimeout($sto8);
			clearTimeout($sto9);
			$num1 = 0;
			$num2 = 0;
			$num3 = 9;
			$num4 = 0;
			$num5 = 9;
			$num6 = 0;
			$num7 = 9;
			$num8 = 9;
			if( cache_cheack('game') == true )
			{
				Howler.mute(false);
			}
			page_game();
		});
	});

	//Game Exit Click

	$(".after-load").on("click","#game-button-exit", function(){
		loading_on();
		TweenLite.delayedCall(1, function(){
			if( Cookies.get('finish') == 'true' && Cookies.get('on') == 'true' )
			{
				$game_finish = true;
				$sfx = false;
				$game_button = false;
				$m_startmachin.stop();
				$m_noneloop.stop();
				$m_gearon.stop();
				$m_fanon.stop();
				$m_rodsfx.stop();
				$m_degreeon.stop();
				$m_pistonon.stop();
				$m_pipetop.stop();
				$m_thermalon.stop();
				TweenMax.killAll(true, true, true, true);
				TweenMax.set("#loading-line-1", {morphSVG:"m 838.2766,476.78573 v 0"});
				TweenMax.set("#loading-line-2", {morphSVG:"m 1081.7234,603.21429 v 0"});
				loading_motion();
				TweenMax.to("#game-button-line", 0, {morphSVG:"m 131.40921,626.86075 h 37.05521 v 35.08789 c 0,4.64874 -37.05521,4.72668 -37.05521,0 z"});
				TweenMax.to("#game-button-top", 0, {y:0});
				TweenMax.set("#game-object-1, #game-gear-1, #game-gear-2, #game-object-2, #game-rod, #game-gear-3, #game-piston-1, #game-degree, #game-gear-4, #game-gear-5",{rotation:0});
				TweenMax.set("#game-lamp",{fill: "#8f6a00"});
				TweenMax.set("#game-lamp-light, #game-hot-light-1, #game-hot-light-2",{opacity:0});
				TweenMax.set("#game-piston-2, #game-object-4, #game-piston-3, #game-piston-rod",{x:0});
				TweenMax.set("#game-spring",{scaleX:1});
				TweenMax.set("#game-pipe-1, #game-pipe-2, #game-pipe-3",{y:0});
				TweenMax.set("#game-thermal-lamp",{fill: "#7d3f37"});
				$game_finish_start();
				$timer();
			}
			else
			{
				$error();
			}
			Howler.mute(true);
			page_timer();
			
		});
	});

	//Share Links

	$(".after-load").on("click","#timer-video", function(){window.open('https://www.youtube.com/watch?v=_r5X00cNGwk', '_blank');});
	$(".after-load").on("click","#share-whatsapp", function(){window.open('https://wa.me/?text=اگه%20می%20خوای%20بدونی%20وبسایت%20جدید%20Olo%20Animation%20کی%20راه%20می%20افته،%20تو%20هم%20مثل%20من،%20موتور%20زمان%20سنج%20رو%20تعمیر%20کن!%20https://Olo.ir', 'whatsapp','height=400,width=500');});
	$(".after-load").on("click","#share-twitter", function(){window.open('https://twitter.com/share?text=اگه%20می%20خوای%20بدونی%20وبسایت%20جدید%20Olo%20Animation%20کی%20راه%20می%20افته،%20تو%20هم%20مثل%20من،%20موتور%20زمان%20سنج%20رو%20تعمیر%20کن!%20@Oloanimation&url=https://Olo.ir&hashtags=Oloanimation', 'twitter','height=200,width=600');});
	$(".after-load").on("click","#share-telegram", function(){window.open('https://telegram.me/share/url?url=https://Olo.ir&text=اگه%20می%20خوای%20بدونی%20وبسایت%20جدید%20Olo%20Animation%20کی%20راه%20می%20افته،%20تو%20هم%20مثل%20من،%20موتور%20زمان%20سنج%20رو%20تعمیر%20کن!%20@Oloanimation', 'telegram','height=400,width=500');});
	$(".after-load").on("click","#share-instagram", function(){window.open('./instagram', 'instagram','height=500,width=500');});
	$(".after-load").on("click","#share-email", function(){window.open('./mail/', 'Email','height=500,width=500');});

	loading_motion();
	page_timer();

});

function homeresize(){
	if (matchMedia('all and (orientation:portrait)').matches)
	{
		$('.index').addClass('rotate');
		$('.index').css({'width':$(window).height()});
		$('.index').css({'height':$(window).height()});
		$('.index').css({'left': ($(window).width()-$(window).height())/2});
	}
	else
	{
		$('.index').removeClass('rotate');
		$('.index').css({'width':'auto'});
		$('.index').css({'height':'auto'});
		$('.index').css({'left': 'auto'});
	}
};
$(document).ready(homeresize);
$(window).bind('resize', homeresize);
$(window).resize(homeresize);