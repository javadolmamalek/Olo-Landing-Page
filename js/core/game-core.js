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

	// Default Value

	$area_value = '50%';

	$object1_block = false;
	$object2_block = false;
	$object3_block = false;
	$object4_block = false;
	$object5_block = false;

	$object1 = false;
	$object2 = false;
	$object3 = false;
	$object4 = false;
	$object5 = false;

	$game_on = false;
	$game_button = false;
	$game_finish = false;

	$loadfp = false;

	new Date().setTime(new Date().getTime()+(365*24*60*60*1000));
	$expires = new Date().toGMTString();

	// SFX Load

	$sfx = true;
	$m_dragon = new Howl({src: ['sound/on_drag.webm', 'sound/on_drag.mp3']});
	$m_dragfalse = new Howl({src: ['sound/drag_false.webm', 'sound/drag_false.mp3']});
	$m_dragfix = new Howl({src: ['sound/drag_fix.webm', 'sound/drag_fix.mp3']});
	$m_buttonclick = new Howl({src: ['sound/button_click.webm', 'sound/button_click.mp3']});
	$m_startmachin = new Howl({src: ['sound/start_machine.webm', 'sound/start_machine.mp3'], volume: .2});
	$m_noneloop = new Howl({src: ['sound/none_loop.webm', 'sound/none_loop.mp3'], loop: true, volume: .07});
	$m_gearon = new Howl({src: ['sound/gear_on.webm', 'sound/gear_on.mp3'], loop: true, volume: .07});
	$m_fanon = new Howl({src: ['sound/fan_on.webm', 'sound/fan_on.mp3'], loop: true, volume: .03});
	$m_rodsfx = new Howl({src: ['sound/rod_effect.webm', 'sound/rod_effect.mp3'], volume: .3});
	$m_degreeon = new Howl({src: ['sound/degree_on.webm', 'sound/degree_on.mp3']});
	$m_pistonon = new Howl({src: ['sound/piston_on.webm', 'sound/piston_on.mp3'], loop: true, volume: .06});
	$m_pipetop = new Howl({src: ['sound/pipe_top.webm', 'sound/pipe_top.mp3'], volume: .3});
	$m_thermalon = new Howl({src: ['sound/thermal_on.webm', 'sound/thermal_on.mp3']});
	$m_machinoff = new Howl({src: ['sound/machine_off.webm', 'sound/machine_off.mp3'], volume: .25});
	$m_finish = new Howl({src: ['sound/finish.webm', 'sound/finish.mp3'], volume: .15});

	//SFX Mute Unmut

	function audio_muted(){
		$m_startmachin.fade(.2, 0, 500);
		$m_noneloop.fade(.07, 0, 500);
		$m_gearon.fade(.07, 0, 500);
		$m_fanon.fade(.03, 0, 500);
		$m_rodsfx.fade(.3, 0, 500);
		$m_degreeon.fade(.075, 0, 500);
		$m_pistonon.fade(.06, 0, 500);
		$m_pipetop.fade(.3, 0, 500);
		$m_thermalon.fade(.3, 0, 500);
		$m_machinoff.fade(.25, 0, 500);
		$m_finish.fade(.15, 0, 500);
	}
	function audio_unmuted(){
		$m_startmachin.fade(0, .2, 500);
		$m_noneloop.fade(0, .07, 500);
		$m_gearon.fade(0, .07, 500);
		$m_fanon.fade(0, .03, 500);
		$m_rodsfx.fade(0, .3, 500);
		$m_degreeon.fade(0, .075, 500);
		$m_pistonon.fade(0, .06, 500);
		$m_pipetop.fade(0, .3, 500);
		$m_thermalon.fade(0, .3, 500);
		$m_machinoff.fade(0, .25, 500);
		$m_finish.fade(0, .15, 500);
	}
	document.addEventListener("visibilitychange", function() {
		if( document.visibilityState == 'visible')
			audio_unmuted();
		else
			audio_muted();
	});

	// Learn Border

	if( Cookies.get('learn') == 'true' || Cookies.get('finish') || Cookies.get('on') )
	{
		$("#game-learn").addClass("object-disable");
	}
	else
	{
		new TimelineMax({repeat: -1}).to("#game-learn-button", 1, {scale:1.07, transformOrigin:"center center"}).to("#game-learn-button", 1, {scale:1, transformOrigin:"center center"});
		$('#game-learn-button').click(function(){
			Cookies.set('learn', 'true', { expires: 365, path: '' });
			TweenMax.to("#game-learn", .5, {scale:1.05, opacity:0, transformOrigin:"center center", ease: Power1.easeInOut});
			TweenLite.delayedCall(.5, function(){$("#game-learn").addClass("object-disable");});
		});
	}
	
	// Load Page Cookie

	$game_finish_start = function(){
		if( Cookies.get('finish') == 'true' )
		{
			$('.game-dragged-lock').addClass("active");
			$('#game-object-1-gear').removeClass("object-disable");
			$('#game-object-2-fan').removeClass("object-disable");
			$('#game-object-3-solar').removeClass("object-disable");
			$('#game-object-4-piston').removeClass("object-disable");
			$('#game-object-5-thermal').removeClass("object-disable");
			$("#game-all-tools").addClass("object-disable");
			$("#game-button-new-all").removeClass("object-disable");
			TweenMax.set("#game-all-tools", {x:20, opacity:0});
			TweenMax.set("#game-button-new-all", {x:0, opacity:1});
			TweenMax.set("#game-finish-text", {opacity:0});
			$object1 = true;
			$object2 = true;
			$object3 = true;
			$object4 = true;
			$object5 = true;
			$game_finish = true;
			if( Cookies.get('on') == 'true' )
			{
				$m_gearon.play();
				$m_fanon.play();
				$m_pistonon.play();
				$game_on = true;
				TweenMax.to("#game-button-line", 0, {morphSVG:"m 131.40921,651.85791 h 37.05521 l 0,10.09073 c 0,4.64874 -37.05521,4.72668 -37.05521,0 z"});
				TweenMax.to("#game-button-top", 0, {y:24});
				TweenMax.to("#game-object-1", 4, {rotation: -360, transformOrigin:"center center", repeat: -1, ease: Power0.easeNone});
				TweenMax.to("#game-gear-1", 12, {rotation: 360, transformOrigin:"center center", repeat: -1, ease: Power0.easeNone});
				TweenMax.to("#game-gear-2", 3, {rotation: -360, transformOrigin:"center center", repeat: -1, ease: Power0.easeNone});
				TweenMax.to("#game-object-2", .5, {rotation: 360, transformOrigin:"center center", repeat: -1, ease: Power0.easeNone});
				TweenMax.set("#game-rod", {rotation: 38, transformOrigin:"center 114"});
				new TimelineMax({repeat: -1}).to("#game-rod", .1, {rotation: 38, transformOrigin:"center 114"}).to("#game-rod", .1, {rotation: 37.5, transformOrigin:"center 114"});
				TweenMax.set("#game-lamp", {fill: "#ffbc00"});
				TweenMax.set("#game-lamp-light", {opacity:1});
				TweenMax.set("#game-gear-3", {rotation: -50, transformOrigin:"92 center"});
				TweenMax.to("#game-gear-3", 5, {rotation: -410, transformOrigin:"92 92", repeat: -1, ease: Power0.easeNone});
				TweenMax.set("#game-piston-1", {rotation: 50, transformOrigin:"20 center"});
				TweenMax.to("#game-piston-1", 5, {rotation: 410, transformOrigin:"20 center", repeat: -1, ease: Power0.easeNone});
				TweenMax.set("#game-degree", {rotation: 260, transformOrigin:"23.3 18.7"});
				TweenMax.set("#game-piston-2, #game-object-4, #game-piston-3, #game-piston-rod", {x:-40});
				new TimelineMax({repeat: -1}).to("#game-piston-2", .6, {x:40, ease: Power1.easeInOut}).to("#game-piston-2", .6, {x:-40, ease: Power1.easeInOut});
				new TimelineMax({repeat: -1}).to("#game-object-4, #game-piston-3, #game-piston-rod", .6, {x:40, ease: Power1.easeInOut}).to("#game-object-4, #game-piston-3, #game-piston-rod", .6, {x:-40, ease: Power1.easeInOut});
				TweenMax.set("#game-spring", {scaleX:1.26, transformOrigin:"163 center"});
				new TimelineMax({repeat: -1}).to("#game-spring", .6, {scaleX:.74, transformOrigin:"163 center", ease: Power1.easeInOut}).to("#game-spring", .6, {scaleX:1.26, transformOrigin:"163 center", ease: Power1.easeInOut});
				TweenMax.set("#game-pipe-3", {y:-40});
				TweenMax.set("#game-pipe-2", {y:-70});
				TweenMax.set("#game-pipe-1", {y:-92});
				TweenMax.set("#game-hot-light-1, #game-hot-light-2", {opacity:1});
				TweenMax.set("#game-thermal-lamp", {fill: "#ff1f00"});
				TweenMax.to("#game-gear-4", 4, {rotation: 360, transformOrigin:"center center", repeat: -1, ease: Power0.easeNone});
				TweenMax.to("#game-gear-5", 4, {rotation: -360, transformOrigin:"center center", repeat: -1, ease: Power0.easeNone});
				TweenMax.set("#game-finish-text", {opacity:1});
			}
		}
	}

	$game_finish_start();

	// Machine On And Off Button

	$('#game-button').click(function(){
		if( $game_on == false && $game_button == false )
		{
			$game_on = true;
			$game_button = true;
			$sfx = true;
			Cookies.set('on', 'true', { expires: 365, path: '' });
			$m_buttonclick.play();
			game_start();
		}
		else if( $game_on == true && $game_button == false )
		{
			$game_on = false;
			$game_button = true;
			Cookies.set('on', 'false', { expires: 365, path: '' });
			$m_machinoff.play();
			TweenMax.to("#game-finish-text", .75, {opacity:0});
			game_stop();
		}
	});

	// New Game

	$('#game-button-new').click(function(){
		$game_on = false;
		$game_button = true;
		Cookies.set('on', 'false', { expires: 365, path: '' });
		Cookies.set('finish', 'false', { expires: 365, path: '' });
		$m_machinoff.play();
		TweenMax.to("#game-stop-flash", .3, {opacity:'.8', ease: Power1.easeIn});
		TweenMax.to("#game-blur", .3, {attr:{stdDeviation:7}});
		TweenLite.delayedCall(.3, function(){
			$("#game-object-1-gear, #game-object-2-gear, #game-object-3-gear, #game-object-4-gear, #game-object-5-gear, #game-object-1-fan, #game-object-2-fan, #game-object-3-fan, #game-object-4-fan, #game-object-5-fan, #game-object-1-solar, #game-object-2-solar, #game-object-3-solar, #game-object-4-solar, #game-object-5-solar, #game-object-1-piston, #game-object-2-piston, #game-object-3-piston, #game-object-4-piston, #game-object-5-piston, #game-object-1-thermal, #game-object-2-thermal, #game-object-3-thermal, #game-object-4-thermal, #game-object-5-thermal").addClass("object-disable");
			TweenMax.set("#game-object-all-gear, #game-object-all-fan, #game-object-all-solar, #game-object-all-piston, #game-object-all-thermal",{x: 0, y: 0, opacity:1});
			$object1_block = false;
			$object2_block = false;
			$object3_block = false;
			$object4_block = false;
			$object5_block = false;
			$object1 = false;
			$object2 = false;
			$object3 = false;
			$object4 = false;
			$object5 = false;
			$game_finish = false;
			$sfx = false;
			$m_startmachin.stop();
			$m_noneloop.stop();
			$m_gearon.stop();
			$m_fanon.stop();
			$m_rodsfx.stop();
			$m_degreeon.stop();
			$m_pistonon.stop();
			$m_pipetop.stop();
			$m_thermalon.stop();
			$('.game-dragged-lock').removeClass("active");
			$("#game-all-tools").removeClass("object-disable");
			$("#game-button-new-all").addClass("object-disable");
			TweenMax.to("#game-all-tools", 0, {x:0, opacity:1});
			TweenMax.to("#game-button-new-all", 0, {x:-20, opacity:0});
			TweenMax.to("#game-button-line", 0, {morphSVG:"m 131.40921,626.86075 h 37.05521 v 35.08789 c 0,4.64874 -37.05521,4.72668 -37.05521,0 z"});
			TweenMax.to("#game-button-top", 0, {y:0});
			TweenMax.killAll(true, true, true, true);
			TweenMax.set("#game-object-1, #game-gear-1, #game-gear-2, #game-object-2, #game-rod, #game-gear-3, #game-piston-1, #game-degree, #game-gear-4, #game-gear-5",{rotation:0});
			TweenMax.set("#game-lamp",{fill: "#8f6a00"});
			TweenMax.set("#game-lamp-light, #game-hot-light-1, #game-hot-light-2",{opacity:0});
			TweenMax.set("#game-piston-2, #game-object-4, #game-piston-3, #game-piston-rod",{x:0});
			TweenMax.set("#game-spring",{scaleX:1});
			TweenMax.set("#game-pipe-1, #game-pipe-2, #game-pipe-3",{y:0});
			TweenMax.set("#game-thermal-lamp",{fill: "#7d3f37"});
		});
		setTimeout(function(){
			TweenMax.to("#game-stop-flash", .3, {opacity:'0', ease: Power1.easeOut});
			TweenMax.to("#game-blur", .3, {attr:{stdDeviation:0}});
			TweenLite.delayedCall(.3, function(){$game_button = false;});
		}, 320);
	});

	// Game Machine Part 1 On

	function game_start(){
		$('.game-dragged-lock').addClass("active");
		TweenMax.to("#game-button-line", .25, {morphSVG:"m 131.40921,651.85791 h 37.05521 l 0,10.09073 c 0,4.64874 -37.05521,4.72668 -37.05521,0 z", ease: Power0.easeNone});
		TweenMax.to("#game-button-top", .25, {y:24, ease: Power0.easeNone});
		$m_startmachin.play();
		new TimelineMax().to("#game-object-1", 3, {rotation: -100, transformOrigin:"center center", ease: Power2.easeIn}).to("#game-object-1", 4, {rotation: -460, transformOrigin:"center center", repeat: -1, ease: Power0.easeNone});
		TweenLite.delayedCall(.6, function(){$game_button = false;});
		if( $object1 == true && !$('#game-object-1-gear').hasClass("object-disable") )
			game_level_2();
		else
			TweenLite.delayedCall(1.5, function(){if( $sfx == true ){$m_noneloop.fade(0, .07, 3000, $m_noneloop.play());}});
	}

	// Game Machine Part 2 On

	function game_level_2(){
		new TimelineMax().to("#game-gear-1", 3, {rotation: 30, transformOrigin:"center center", ease: Power2.easeIn}).to("#game-gear-1", 12, {rotation: 390, transformOrigin:"center center", repeat: -1, ease: Power0.easeNone});
		new TimelineMax().to("#game-gear-2", 3, {rotation: -150, transformOrigin:"center center", ease: Power2.easeIn}).to("#game-gear-2", 3, {rotation: -510, transformOrigin:"center center", repeat: -1, ease: Power0.easeNone});
		TweenLite.delayedCall(1.5, function(){if( $sfx == true ){$m_gearon.fade(0, .07, 3000, $m_gearon.play());}});
		new TimelineMax().to("#game-object-2", 2, { rotation: 360, transformOrigin:"center center", ease: Power2.easeIn}).to("#game-object-2", .5, {rotation: 720, transformOrigin:"center center", repeat: -1, ease: Power0.easeNone});
		if( $object2 == true && !$('#game-object-2-fan').hasClass("object-disable") )
			game_level_3();
	}

	// Game Machine Part 3 On

	function game_level_3(){
		TweenLite.delayedCall(2, function(){if( $sfx == true ){$m_fanon.fade(0, .03, 3000, $m_fanon.play());}});
		TweenMax.to("#game-rod", 2, {delay:2, rotation: 38, transformOrigin:"center 114", ease: Power4.easeIn});
		TweenLite.delayedCall(3.1, function(){if( $sfx == true ){$m_rodsfx.play();}});
		new TimelineMax({delay:4, repeat: -1}).to("#game-rod", .1, {rotation: 38, transformOrigin:"center 114"}).to("#game-rod", .1, {rotation: 37.5, transformOrigin:"center 114"});
		TweenMax.to("#game-lamp", 2, {delay:4, fill: "#ffbc00"});
		TweenMax.to("#game-lamp-light", 2, {delay:4, opacity:1});
		if( $object3 == true && !$('#game-object-3-solar').hasClass("object-disable") )
			game_level_4();
	}

	// Game Machine Part 4 On

	function game_level_4(){
		new TimelineMax({delay:4.5}).to("#game-gear-3", 2, {rotation: -50, transformOrigin:"92 center", ease: Power2.easeIn}).to("#game-gear-3", 5, {rotation: -410, transformOrigin:"92 92", repeat: -1, ease: Power0.easeNone});
		new TimelineMax({delay:4.5}).to("#game-piston-1", 2, {rotation: 50, transformOrigin:"20 center", ease: Power2.easeIn}).to("#game-piston-1", 5, {rotation: 410, transformOrigin:"20 center", repeat: -1, ease: Power0.easeNone});
		TweenMax.to("#game-degree", 5, {delay:6.5, rotation: 260, transformOrigin:"23.3 18.7", ease: Power1.easeInOut});
		TweenLite.delayedCall(6.5, function(){if( $sfx == true ){$m_degreeon.fade(.075, 0, 4500, $m_degreeon.play());}});
		new TimelineMax({delay:9}).to("#game-piston-2", 1.2, {x:40, ease: Power1.easeInOut}).to("#game-piston-2", .8, {x:-40, ease: Power1.easeInOut});
		new TimelineMax({repeat: -1, delay:11}).to("#game-piston-2", .6, {x:40, ease: Power1.easeInOut}).to("#game-piston-2", .6, {x:-40, ease: Power1.easeInOut});
		if( $object4 == true && !$('#game-object-4-piston').hasClass("object-disable") )
			game_level_5();
	}

	// Game Machine Part 5 On

	function game_level_5(){
		new TimelineMax({delay:9}).to("#game-object-4, #game-piston-3, #game-piston-rod", 1.2, {x:40, ease: Power1.easeInOut}).to("#game-object-4, #game-piston-3, #game-piston-rod", .8, {x:-40, ease: Power1.easeInOut});
		new TimelineMax({repeat: -1, delay:11}).to("#game-object-4, #game-piston-3, #game-piston-rod", .6, {x:40, ease: Power1.easeInOut}).to("#game-object-4, #game-piston-3, #game-piston-rod", .6, {x:-40, ease: Power1.easeInOut});
		new TimelineMax({delay:9}).to("#game-spring", 1.2, {scaleX:.74, transformOrigin:"163 center", ease: Power1.easeInOut}).to("#game-spring", .8, {scaleX:1.26, transformOrigin:"163 center", ease: Power1.easeInOut});
		new TimelineMax({repeat: -1, delay:11}).to("#game-spring", .6, {scaleX:.74, transformOrigin:"163 center", ease: Power1.easeInOut}).to("#game-spring", .6, {scaleX:1.26, transformOrigin:"163 center", ease: Power1.easeInOut});
		TweenLite.delayedCall(9, function(){if( $sfx == true ){$m_pistonon.fade(0, .06, 3000, $m_pistonon.play());}});
		new TimelineMax({delay:11}).to("#game-pipe-3", 1, {y:-40, ease: Power1.easeInOut}).to("#game-pipe-2", 1, {y:-70, ease: Power1.easeInOut}).to("#game-pipe-1", 1, {y:-92, ease: Power1.easeInOut});
		TweenLite.delayedCall(11, function(){if( $sfx == true ){$m_pipetop.play();}});
		TweenMax.to("#game-hot-light-1", 2, {delay:15, opacity:1});
		TweenMax.to("#game-hot-light-2", 4, {delay:16, opacity:1});
		TweenLite.delayedCall(14, function(){if( $sfx == true ){$m_thermalon.fade(.3, 0, 7000,$m_thermalon.play());}});
		if( $object5 == true && !$('#game-object-5-thermal').hasClass("object-disable") )
			game_level_6();
	}

	// Game Machine Part 6 On

	function game_level_6(){
		TweenMax.to("#game-thermal-lamp", 3, { delay:18, fill: "#ff1f00"});
		new TimelineMax({delay:18}).to("#game-gear-4", 3, {rotation: 100, transformOrigin:"center center", ease: Power2.easeIn}).to("#game-gear-4", 4, {rotation: 460, transformOrigin:"center center", repeat: -1, ease: Power0.easeNone});
		new TimelineMax({delay:18}).to("#game-gear-5", 3, {rotation: -100, transformOrigin:"center center", ease: Power2.easeIn}).to("#game-gear-5", 4, {rotation: -460, transformOrigin:"center center", repeat: -1, ease: Power0.easeNone});
		TweenMax.to("#game-finish-text", .75, {delay:20, opacity:1});
		if( $game_finish == false)
		{
			TweenLite.delayedCall(20, function(){if( $sfx == true ){$m_finish.play();}});
			TweenLite.delayedCall(20, function(){$("#game-all-tools").addClass("object-disable");$("#game-button-new-all").removeClass("object-disable");});
			TweenMax.to("#game-all-tools", .75, {delay:20, x:20, opacity:0});
			TweenMax.to("#game-button-new-all", .75, {delay:20, x:0, opacity:1});
		}
		Cookies.set('finish', 'true', { expires: 365, path: '' });
	}

	// Game Machine All Off

	function game_stop(){
		if( $('#game-all-tools').hasClass("object-disable") )
			$game_finish = true;

		TweenMax.to("#game-stop-flash", .3, {opacity:'.8', ease: Power1.easeIn});
		TweenMax.to("#game-blur", .3, {attr:{stdDeviation:7}});
		TweenLite.delayedCall(.3, function(){
			$sfx = false;
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
			if( $game_finish == false )
			{
				$('.game-dragged-lock').removeClass("active");
				$("#game-all-tools").removeClass("object-disable");
				$("#game-button-new-all").addClass("object-disable");
				TweenMax.to("#game-all-tools", 0, {x:0, opacity:1});
				TweenMax.to("#game-button-new-all", 0, {x:-20, opacity:0});
			}
			TweenMax.to("#game-button-line", 0, {morphSVG:"m 131.40921,626.86075 h 37.05521 v 35.08789 c 0,4.64874 -37.05521,4.72668 -37.05521,0 z"});
			TweenMax.to("#game-button-top", 0, {y:0});
			TweenMax.set("#game-object-1, #game-gear-1, #game-gear-2, #game-object-2, #game-rod, #game-gear-3, #game-piston-1, #game-degree, #game-gear-4, #game-gear-5",{rotation:0});
			TweenMax.set("#game-lamp",{fill: "#8f6a00"});
			TweenMax.set("#game-lamp-light, #game-hot-light-1, #game-hot-light-2",{opacity:0});
			TweenMax.set("#game-piston-2, #game-object-4, #game-piston-3, #game-piston-rod",{x:0});
			TweenMax.set("#game-spring",{scaleX:1});
			TweenMax.set("#game-pipe-1, #game-pipe-2, #game-pipe-3",{y:0});
			TweenMax.set("#game-thermal-lamp",{fill: "#7d3f37"});
		});
		setTimeout(function(){
			TweenMax.to("#game-stop-flash", .3, {opacity:'0', ease: Power1.easeOut});
			TweenMax.to("#game-blur", .3, {attr:{stdDeviation:0}});
			TweenLite.delayedCall(.3, function(){$game_button = false;});
		}, 320);
	}

	// Gear Dragged

	Draggable.create("#game-object-all-gear", {
		type:"x,y",
		bounds: $("#game"),

		onPress:function() {
			$m_dragon.play();
		},

		onDrag: function() {
			$('#game-object-1-gear').addClass("object-disable");
			$('#game-object-2-gear').addClass("object-disable");
			$('#game-object-3-gear').addClass("object-disable");
			$('#game-object-4-gear').addClass("object-disable");
			$('#game-object-5-gear').addClass("object-disable");
			TweenMax.to("#game-object-all-gear", 0, {opacity:1});
			hidden_object('1');

			if (this.hitTest($("#game-object-1-area"), $area_value)) {
				$(this.target).addClass("a");
			}
			else if (this.hitTest($("#game-object-2-area"), $area_value)) {
				$(this.target).addClass("b");
			}
			else if (this.hitTest($("#game-object-3-area"), $area_value)) {
				$(this.target).addClass("c");
			}
			else if (this.hitTest($("#game-object-4-area"), $area_value)) {
				$(this.target).addClass("d");
			}
			else if (this.hitTest($("#game-object-5-area"), $area_value)) {
				$(this.target).addClass("e");
			}
			else {
				$(this.target).removeClass("a");
				$(this.target).removeClass("b");
				$(this.target).removeClass("c");
				$(this.target).removeClass("d");
				$(this.target).removeClass("e");
			}
		},

		onDragEnd: function()
		{
			show_object();
			if ($(this.target).hasClass("a"))
			{
				if( $object2_block != 'a' && $object3_block != 'a' && $object4_block != 'a' && $object5_block != 'a')
				{
					$m_dragfix.play();
					$object1_block = 'a';
					$object1 = true;
					TweenMax.to(this.target, .1, {x: -422, y: -452.5});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-gear", 0, {opacity:0});
						$('#game-object-1-gear').removeClass("object-disable");
					});
				}
				else
					reload_object('1', this.target);
			}
			else if ($(this.target).hasClass("b"))
			{
				if( $object2_block != 'b' && $object3_block != 'b' && $object4_block != 'b' && $object5_block != 'b')
				{
					$m_dragfix.play();
					$object1_block = 'b';
					$object1 = false;
					TweenMax.to(this.target, .1, {x: -242.5, y: -803});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-gear", 0, {opacity:0});
						$('#game-object-2-gear').removeClass("object-disable");
					});
				}
				else
					reload_object('1', this.target);
			}
			else if ($(this.target).hasClass("c"))
			{
				if( $object2_block != 'c' && $object3_block != 'c' && $object4_block != 'c' && $object5_block != 'c')
				{
					$m_dragfix.play();
					$object1_block = 'c';
					$object1 = false;
					TweenMax.to(this.target, .1, {x: 304, y: -637});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-gear", 0, {opacity:0});
						$('#game-object-3-gear').removeClass("object-disable");
					});
				}
				else
					reload_object('1', this.target);
			}
			else if ($(this.target).hasClass("d"))
			{
				if( $object2_block != 'd' && $object3_block != 'd' && $object4_block != 'd' && $object5_block != 'd')
				{
					$m_dragfix.play();
					$object1_block = 'd';
					$object1 = false;
					TweenMax.to(this.target, .1, {x: 659, y: -272.5});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-gear", 0, {opacity:0});
						$('#game-object-4-gear').removeClass("object-disable");
					});
				}
				else
					reload_object('1', this.target);
			}
			else if ($(this.target).hasClass("e"))
			{
				if( $object2_block != 'e' && $object3_block != 'e' && $object4_block != 'e' && $object5_block != 'e')
				{
					$m_dragfix.play();
					$object1_block = 'e';
					$object1 = false;
					TweenMax.to(this.target, .1, {x: 1018, y: -632.5});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-gear", 0, {opacity:0});
						$('#game-object-5-gear').removeClass("object-disable");
					});
				}
				else
					reload_object('1', this.target);
			}
			else
				reload_object('1', this.target);
		}
	});

	// Fan Dragged

	Draggable.create("#game-object-all-fan", {
		type:"x,y",
		bounds: $("#game"),

		onPress:function() {
			$m_dragon.play();
		},

		onDrag: function() {
			$('#game-object-1-fan').addClass("object-disable");
			$('#game-object-2-fan').addClass("object-disable");
			$('#game-object-3-fan').addClass("object-disable");
			$('#game-object-4-fan').addClass("object-disable");
			$('#game-object-5-fan').addClass("object-disable");
			TweenMax.to("#game-object-all-fan", 0, {opacity:1});
			hidden_object('2');

			if (this.hitTest($("#game-object-1-area"), $area_value)) {
				$(this.target).addClass("a");
			}
			else if (this.hitTest($("#game-object-2-area"), $area_value)) {
				$(this.target).addClass("b");
			}
			else if (this.hitTest($("#game-object-3-area"), $area_value)) {
				$(this.target).addClass("c");
			}
			else if (this.hitTest($("#game-object-4-area"), $area_value)) {
				$(this.target).addClass("d");
			}
			else if (this.hitTest($("#game-object-5-area"), $area_value)) {
				$(this.target).addClass("e");
			}
			else {
				$(this.target).removeClass("a");
				$(this.target).removeClass("b");
				$(this.target).removeClass("c");
				$(this.target).removeClass("d");
				$(this.target).removeClass("e");
			}
		},

		onDragEnd: function()
		{
			show_object();
			if ($(this.target).hasClass("a"))
			{
				if( $object1_block != 'a' && $object3_block != 'a' && $object4_block != 'a' && $object5_block != 'a')
				{
					$m_dragfix.play();
					$object2_block = 'a';
					$object2 = false;
					TweenMax.to(this.target, .1, {x: -1020, y: -463});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-fan", 0, {opacity:0});
						$('#game-object-1-fan').removeClass("object-disable");
					});
				}
				else
					reload_object('2', this.target);
			}
			else if ($(this.target).hasClass("b"))
			{
				if( $object1_block != 'b' && $object3_block != 'b' && $object4_block != 'b' && $object5_block != 'b')
				{
					$m_dragfix.play();
					$object2_block = 'b';
					$object2 = true;
					TweenMax.to(this.target, .1, {x: -840, y: -814});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-fan", 0, {opacity:0});
						$('#game-object-2-fan').removeClass("object-disable");
					});
				}
				else
					reload_object('2', this.target);
			}
			else if ($(this.target).hasClass("c"))
			{
				if( $object1_block != 'c' && $object3_block != 'c' && $object4_block != 'c' && $object5_block != 'c')
				{
					$m_dragfix.play();
					$object2_block = 'c';
					$object2 = false;
					TweenMax.to(this.target, .1, {x: -293, y: -647});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-fan", 0, {opacity:0});
						$('#game-object-3-fan').removeClass("object-disable");
					});
				}
				else
					reload_object('2', this.target);
			}
			else if ($(this.target).hasClass("d"))
			{
				if( $object1_block != 'd' && $object3_block != 'd' && $object4_block != 'd' && $object5_block != 'd')
				{
					$m_dragfix.play();
					$object2_block = 'd';
					$object2 = false;
					TweenMax.to(this.target, .1, {x: 61, y: -283});

					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-fan", 0, {opacity:0});
						$('#game-object-4-fan').removeClass("object-disable");
					});
				}
				else
					reload_object('2', this.target);
			}
			else if ($(this.target).hasClass("e"))
			{
				if( $object1_block != 'e' && $object3_block != 'e' && $object4_block != 'e' && $object5_block != 'e')
				{
					$m_dragfix.play();
					$object2_block = 'e';
					$object2 = false;
					TweenMax.to(this.target, .1, {x: 421, y: -643});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-fan", 0, {opacity:0});
						$('#game-object-5-fan').removeClass("object-disable");
					});
				}
				else
					reload_object('2', this.target);
			}
			else
				reload_object('2', this.target);
		}
	});

	// Solar Dragged

	Draggable.create("#game-object-all-solar", {
		type:"x,y",
		bounds: $("#game"),

		onPress:function() {
			$m_dragon.play();
		},

		onDrag: function() {
			$('#game-object-1-solar').addClass("object-disable");
			$('#game-object-2-solar').addClass("object-disable");
			$('#game-object-3-solar').addClass("object-disable");
			$('#game-object-4-solar').addClass("object-disable");
			$('#game-object-5-solar').addClass("object-disable");
			TweenMax.to("#game-object-all-solar", 0, {opacity:1});
			hidden_object('3');

			if (this.hitTest($("#game-object-1-area"), $area_value)) {
				$(this.target).addClass("a");
			}
			else if (this.hitTest($("#game-object-2-area"), $area_value)) {
				$(this.target).addClass("b");
			}
			else if (this.hitTest($("#game-object-3-area"), $area_value)) {
				$(this.target).addClass("c");
			}
			else if (this.hitTest($("#game-object-4-area"), $area_value)) {
				$(this.target).addClass("d");
			}
			else if (this.hitTest($("#game-object-5-area"), $area_value)) {
				$(this.target).addClass("e");
			}
			else {
				$(this.target).removeClass("a");
				$(this.target).removeClass("b");
				$(this.target).removeClass("c");
				$(this.target).removeClass("d");
				$(this.target).removeClass("e");
			}
		},

		onDragEnd: function()
		{
			show_object();
			if ($(this.target).hasClass("a"))
			{
				if( $object1_block != 'a' && $object2_block != 'a' && $object4_block != 'a' && $object5_block != 'a')
				{
					$m_dragfix.play();
					$object3_block = 'a';
					$object3 = false;
					TweenMax.to(this.target, .1, {x: -124, y: -453});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-solar", 0, {opacity:0});
						$('#game-object-1-solar').removeClass("object-disable");
					});
				}
				else
					reload_object('3', this.target);
			}
			else if ($(this.target).hasClass("b"))
			{
				if( $object1_block != 'b' && $object2_block != 'b' && $object4_block != 'b' && $object5_block != 'b')
				{
					$m_dragfix.play();
					$object3_block = 'b';
					$object3 = false;
					TweenMax.to(this.target, .1, {x: 56, y: -803});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-solar", 0, {opacity:0});
						$('#game-object-2-solar').removeClass("object-disable");
					});
				}
				else
					reload_object('3', this.target);
			}
			else if ($(this.target).hasClass("c"))
			{
				if( $object1_block != 'c' && $object2_block != 'c' && $object4_block != 'c' && $object5_block != 'c')
				{
					$m_dragfix.play();
					$object3_block = 'c';
					$object3 = true;
					TweenMax.to(this.target, .1, {x: 596, y: -632.5});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-solar", 0, {opacity:0});
						$('#game-object-3-solar').removeClass("object-disable");
					});
				}
				else
					reload_object('3', this.target);
			}
			else if ($(this.target).hasClass("d"))
			{
				if( $object1_block != 'd' && $object2_block != 'd' && $object4_block != 'd' && $object5_block != 'd')
				{
					$m_dragfix.play();
					$object3_block = 'd';
					$object3 = false;
					TweenMax.to(this.target, .1, {x: 957, y: -272});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-solar", 0, {opacity:0});
						$('#game-object-4-solar').removeClass("object-disable");
					});
				}
				else
					reload_object('3', this.target);
			}
			else if ($(this.target).hasClass("e"))
			{
				if( $object1_block != 'e' && $object2_block != 'e' && $object4_block != 'e' && $object5_block != 'e')
				{
					$m_dragfix.play();
					$object3_block = 'e';
					$object3 = false;
					TweenMax.to(this.target, .1, {x: 1316, y: -632.5});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-solar", 0, {opacity:0});
						$('#game-object-5-solar').removeClass("object-disable");
					});
				}
				else
					reload_object('3', this.target);
			}
			else
				reload_object('3', this.target);
		}
	});

	// Piston Dragged

	Draggable.create("#game-object-all-piston", {
		type:"x,y",
		bounds: $("#game"),

		onPress:function() {
			$m_dragon.play();
		},

		onDrag: function() {
			$('#game-object-1-piston').addClass("object-disable");
			$('#game-object-2-piston').addClass("object-disable");
			$('#game-object-3-piston').addClass("object-disable");
			$('#game-object-4-piston').addClass("object-disable");
			$('#game-object-5-piston').addClass("object-disable");
			TweenMax.to("#game-object-all-piston", 0, {opacity:1});
			hidden_object('4');

			if (this.hitTest($("#game-object-1-area"), $area_value)) {
				$(this.target).addClass("a");
			}
			else if (this.hitTest($("#game-object-2-area"), $area_value)) {
				$(this.target).addClass("b");
			}
			else if (this.hitTest($("#game-object-3-area"), $area_value)) {
				$(this.target).addClass("c");
			}
			else if (this.hitTest($("#game-object-4-area"), $area_value)) {
				$(this.target).addClass("d");
			}
			else if (this.hitTest($("#game-object-5-area"), $area_value)) {
				$(this.target).addClass("e");
			}
			else {
				$(this.target).removeClass("a");
				$(this.target).removeClass("b");
				$(this.target).removeClass("c");
				$(this.target).removeClass("d");
				$(this.target).removeClass("e");
			}
		},

		onDragEnd: function()
		{
			show_object();
			if ($(this.target).hasClass("a"))
			{
				if( $object1_block != 'a' && $object2_block != 'a' && $object3_block != 'a' && $object5_block != 'a')
				{
					$m_dragfix.play();
					$object4_block = 'a';
					$object4 = false;
					TweenMax.to(this.target, .1, {x: -721, y: -452.5});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-piston", 0, {opacity:0});
						$('#game-object-1-piston').removeClass("object-disable");
					});
				}
				else
					reload_object('4', this.target);
			}
			else if ($(this.target).hasClass("b"))
			{
				if( $object1_block != 'b' && $object2_block != 'b' && $object3_block != 'b' && $object5_block != 'b')
				{
					$m_dragfix.play();
					$object4_block = 'b';
					$object4 = false;
					TweenMax.to(this.target, .1, {x: -540, y: -802});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-piston", 0, {opacity:0});
						$('#game-object-2-piston').removeClass("object-disable");
					});
				}
				else
					reload_object('4', this.target);
			}
			else if ($(this.target).hasClass("c"))
			{
				if( $object1_block != 'c' && $object2_block != 'c' && $object3_block != 'c' && $object5_block != 'c')
				{
					$m_dragfix.play();
					$object4_block = 'c';
					$object4 = false;
					TweenMax.to(this.target, .1, {x: 5, y: -637});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-piston", 0, {opacity:0});
						$('#game-object-3-piston').removeClass("object-disable");
					});
				}
				else
					reload_object('4', this.target);
			}
			else if ($(this.target).hasClass("d"))
			{
				if( $object1_block != 'd' && $object2_block != 'd' && $object3_block != 'd' && $object5_block != 'd')
				{
					$m_dragfix.play();
					$object4_block = 'd';
					$object4 = true;
					TweenMax.to(this.target, .1, {x: 360, y: -272});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-piston", 0, {opacity:0});
						$('#game-object-4-piston').removeClass("object-disable");
					});
				}
				else
					reload_object('4', this.target);
			}
			else if ($(this.target).hasClass("e"))
			{
				if( $object1_block != 'e' && $object2_block != 'e' && $object3_block != 'e' && $object5_block != 'e')
				{
					$m_dragfix.play();
					$object4_block = 'e';
					$object4 = false;
					TweenMax.to(this.target, .1, {x: 719, y: -632});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-piston", 0, {opacity:0});
						$('#game-object-5-piston').removeClass("object-disable");
					});
				}
				else
					reload_object('4', this.target);
			}
			else
				reload_object('4', this.target);
		}
	});

	// Thermal Dragged

	Draggable.create("#game-object-all-thermal", {
		type:"x,y",
		bounds: $("#game"),

		onPress:function() {
			$m_dragon.play();
		},

		onDrag: function() {
			$('#game-object-1-thermal').addClass("object-disable");
			$('#game-object-2-thermal').addClass("object-disable");
			$('#game-object-3-thermal').addClass("object-disable");
			$('#game-object-4-thermal').addClass("object-disable");
			$('#game-object-5-thermal').addClass("object-disable");
			TweenMax.to("#game-object-all-thermal", 0, {opacity:1});
			hidden_object('5');

			if (this.hitTest($("#game-object-1-area"), $area_value)) {
				$(this.target).addClass("a");
			}
			else if (this.hitTest($("#game-object-2-area"), $area_value)) {
				$(this.target).addClass("b");
			}
			else if (this.hitTest($("#game-object-3-area"), $area_value)) {
				$(this.target).addClass("c");
			}
			else if (this.hitTest($("#game-object-4-area"), $area_value)) {
				$(this.target).addClass("d");
			}
			else if (this.hitTest($("#game-object-5-area"), $area_value)) {
				$(this.target).addClass("e");
			}
			else {
				$(this.target).removeClass("a");
				$(this.target).removeClass("b");
				$(this.target).removeClass("c");
				$(this.target).removeClass("d");
				$(this.target).removeClass("e");
			}
		},

		onDragEnd: function()
		{
			show_object();
			if ($(this.target).hasClass("a"))
			{
				if( $object1_block != 'a' && $object2_block != 'a' && $object3_block != 'a' && $object4_block != 'a')
				{
					$m_dragfix.play();
					$object5_block = 'a';
					$object5 = false;
					TweenMax.to(this.target, .1, {x: 174, y: -416});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-thermal", 0, {opacity:0});
						$('#game-object-1-thermal').removeClass("object-disable");
					});
				}
				else
					reload_object('5', this.target);
			}
			else if ($(this.target).hasClass("b"))
			{
				if( $object1_block != 'b' && $object2_block != 'b' && $object3_block != 'b' && $object4_block != 'b')
				{
					$m_dragfix.play();
					$object5_block = 'b';
					$object5 = false;
					TweenMax.to(this.target, .1, {x: 354.5, y: -765.5});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-thermal", 0, {opacity:0});
						$('#game-object-2-thermal').removeClass("object-disable");
					});
				}
				else
					reload_object('5', this.target);
			}
			else if ($(this.target).hasClass("c"))
			{
				if( $object1_block != 'c' && $object2_block != 'c' && $object3_block != 'c' && $object4_block != 'c')
				{
					$m_dragfix.play();
					$object5_block = 'c';
					$object5 = false;
					TweenMax.to(this.target, .1, {x: 901.5, y: -600.5});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-thermal", 0, {opacity:0});
						$('#game-object-3-thermal').removeClass("object-disable");
					});
				}
				else
					reload_object('5', this.target);
			}
			else if ($(this.target).hasClass("d"))
			{
				if( $object1_block != 'd' && $object2_block != 'd' && $object3_block != 'd' && $object4_block != 'd')
				{
					$m_dragfix.play();
					$object5_block = 'd';
					$object5 = false;
					TweenMax.to(this.target, .1, {x: 1255.5, y: -235.5});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-thermal", 0, {opacity:0});
						$('#game-object-4-thermal').removeClass("object-disable");
					});
				}
				else
					reload_object('5', this.target);
			}
			else if ($(this.target).hasClass("e"))
			{
				if( $object1_block != 'e' && $object2_block != 'e' && $object3_block != 'e' && $object4_block != 'e')
				{
					$m_dragfix.play();
					$object5_block = 'e';
					$object5 = true;
					TweenMax.to(this.target, .1, {x: 1615, y: -596});
					TweenLite.delayedCall(.1, function(){
						TweenMax.to("#game-object-all-thermal", 0, {opacity:0});
						$('#game-object-5-thermal').removeClass("object-disable");
					});
				}
				else
					reload_object('5', this.target);
			}
			else
				reload_object('5', this.target);
		}
	});

	// Show And Hide Objects

	function show_object(){
		$('#game-object-all-gear-fade').addClass("object-disable");
		$('#game-object-all-fan-fade').addClass("object-disable");
		$('#game-object-all-solar-fade').addClass("object-disable");
		$('#game-object-all-piston-fade').addClass("object-disable");
		$('#game-object-all-thermal-fade').addClass("object-disable");
		$('#game-object-all-gear').removeClass("object-disable");
		$('#game-object-all-fan').removeClass("object-disable");
		$('#game-object-all-solar').removeClass("object-disable");
		$('#game-object-all-piston').removeClass("object-disable");
		$('#game-object-all-thermal').removeClass("object-disable");
	}

	function hidden_object(number){
		if( number == 1 )
		{
			$('#game-object-all-fan').addClass("object-disable");
			$('#game-object-all-solar').addClass("object-disable");
			$('#game-object-all-piston').addClass("object-disable");
			$('#game-object-all-thermal').addClass("object-disable");
			if( $object2_block == false)
				$('#game-object-all-fan-fade').removeClass("object-disable");
			if( $object3_block == false)
				$('#game-object-all-solar-fade').removeClass("object-disable");
			if( $object4_block == false)
				$('#game-object-all-piston-fade').removeClass("object-disable");
			if( $object5_block == false)
				$('#game-object-all-thermal-fade').removeClass("object-disable");
		}
		else if( number == 2 )
		{
			$('#game-object-all-gear').addClass("object-disable");
			$('#game-object-all-solar').addClass("object-disable");
			$('#game-object-all-piston').addClass("object-disable");
			$('#game-object-all-thermal').addClass("object-disable");
			if( $object1_block == false)
				$('#game-object-all-gear-fade').removeClass("object-disable");
			if( $object3_block == false)
				$('#game-object-all-solar-fade').removeClass("object-disable");
			if( $object4_block == false)
				$('#game-object-all-piston-fade').removeClass("object-disable");
			if( $object5_block == false)
				$('#game-object-all-thermal-fade').removeClass("object-disable");
		}
		else if( number == 3 )
		{
			$('#game-object-all-gear').addClass("object-disable");
			$('#game-object-all-fan').addClass("object-disable");
			$('#game-object-all-piston').addClass("object-disable");
			$('#game-object-all-thermal').addClass("object-disable");
			if( $object1_block == false)
				$('#game-object-all-gear-fade').removeClass("object-disable");
			if( $object2_block == false)
				$('#game-object-all-fan-fade').removeClass("object-disable");
			if( $object4_block == false)
				$('#game-object-all-piston-fade').removeClass("object-disable");
			if( $object5_block == false)
				$('#game-object-all-thermal-fade').removeClass("object-disable");
		}
		else if( number == 4 )
		{
			$('#game-object-all-gear').addClass("object-disable");
			$('#game-object-all-fan').addClass("object-disable");
			$('#game-object-all-solar').addClass("object-disable");
			$('#game-object-all-thermal').addClass("object-disable");
			if( $object1_block == false)
				$('#game-object-all-gear-fade').removeClass("object-disable");
			if( $object2_block == false)
				$('#game-object-all-fan-fade').removeClass("object-disable");
			if( $object3_block == false)
				$('#game-object-all-solar-fade').removeClass("object-disable");
			if( $object5_block == false)
				$('#game-object-all-thermal-fade').removeClass("object-disable");
		}
		else if( number == 5 )
		{
			$('#game-object-all-gear').addClass("object-disable");
			$('#game-object-all-fan').addClass("object-disable");
			$('#game-object-all-solar').addClass("object-disable");
			$('#game-object-all-piston').addClass("object-disable");
			if( $object1_block == false)
				$('#game-object-all-gear-fade').removeClass("object-disable");
			if( $object2_block == false)
				$('#game-object-all-fan-fade').removeClass("object-disable");
			if( $object3_block == false)
				$('#game-object-all-solar-fade').removeClass("object-disable");
			if( $object4_block == false)
				$('#game-object-all-piston-fade').removeClass("object-disable");
		}
	}

	// Reload Dragged Location

	function reload_object(number, object){
		$m_dragfalse.play();

		if( number == 1 )
		{
			$object1_block = false;
			$object1 = false;
		}
		else if( number == 2 )
		{
			$object2_block = false;
			$object2 = false;
		}
		else if( number == 3 )
		{
			$object3_block = false;
			$object3 = false;
		}
		else if( number == 4 )
		{
			$object4_block = false;
			$object4 = false;
		}
		else if( number == 5 )
		{
			$object5_block = false;
			$object5 = false;
		}
		TweenMax.to(object, .4, {x: 0, y: 0});
	}

	//JS Load Return

	function sfx_check(){
		if($m_dragon.state() == 'loaded' && $m_dragfalse.state() == 'loaded' && $m_dragfix.state() == 'loaded' && $m_buttonclick.state() == 'loaded' && $m_startmachin.state() == 'loaded' && $m_noneloop.state() == 'loaded' && $m_gearon.state() == 'loaded' && $m_fanon.state() == 'loaded' && $m_rodsfx.state() == 'loaded' && $m_degreeon.state() == 'loaded' && $m_pistonon.state() == 'loaded' && $m_pipetop.state() == 'loaded' && $m_thermalon.state() == 'loaded' && $m_machinoff.state() == 'loaded' && $m_finish.state() == 'loaded')
		{
			$loadfp = true;
		}
		else
		{
			setTimeout(function(){sfx_check();}, 100);
		}

	}

	sfx_check();
	function game_loadetrue(){ return true; }
	
});