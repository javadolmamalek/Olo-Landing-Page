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

	$final_date = new Date("2020/03/18 23:59:59");
	$num1 = 0;
	$num2 = 0;
	$num3 = 9;
	$num4 = 0;
	$num5 = 9;
	$num6 = 0;
	$num7 = 9;
	$num8 = 9;
	$sto1 = null;
	$sto2 = null;
	$sto3 = null;
	$sto4 = null;
	$sto5 = null;
	$sto6 = null;
	$sto7 = null;
	$sto8 = null;
	$sto9 = null;

	// Error Lamps Function

	function lamp1(){
		$("#number-day-left-0, #number-day-left-1, #number-day-left-2, #number-day-left-3, #number-day-left-4, #number-day-left-5, #number-day-left-6, #number-day-left-7, #number-day-left-8, #number-day-left-9").addClass("object-disable");
		$("#number-day-left-"+$num1).removeClass("object-disable");
		if( $num1 == 9 )
			$num1 = 0;
		else
			$num1 ++;
		$sto1 = setTimeout(function(){lamp1();},300);
	}
	function lamp2(){
		$("#number-day-right-0, #number-day-right-1, #number-day-right-2, #number-day-right-3, #number-day-right-4, #number-day-right-5, #number-day-right-6, #number-day-right-7, #number-day-right-8, #number-day-right-9").addClass("object-disable");
		$("#number-day-right-"+$num2).removeClass("object-disable");
		if( $num2 == 9 )
			$num2 = 0;
		else
			$num2 ++;
		$sto2 = setTimeout(function(){lamp2();},100);
	}
	function lamp3(){
		$("#number-hour-left-0, #number-hour-left-1, #number-hour-left-2, #number-hour-left-3, #number-hour-left-4, #number-hour-left-5, #number-hour-left-6, #number-hour-left-7, #number-hour-left-8, #number-hour-left-9").addClass("object-disable");
		$("#number-hour-left-"+$num3).removeClass("object-disable");
		if( $num3 == 0 )
			$num3 = 9;
		else
			$num3 --;
		$sto3 = setTimeout(function(){lamp3();},200);
	}
	function lamp4(){
		$("#number-hour-right-0, #number-hour-right-1, #number-hour-right-2, #number-hour-right-3, #number-hour-right-4, #number-hour-right-5, #number-hour-right-6, #number-hour-right-7, #number-hour-right-8, #number-hour-right-9").addClass("object-disable");
		$("#number-hour-right-"+$num4).removeClass("object-disable");
		if( $num4 == 9 )
			$num4 = 0;
		else
			$num4 ++;
		$sto4 = setTimeout(function(){lamp4();},80);
	}
	function lamp5(){
		$("#number-minute-left-0, #number-minute-left-1, #number-minute-left-2, #number-minute-left-3, #number-minute-left-4, #number-minute-left-5, #number-minute-left-6, #number-minute-left-7, #number-minute-left-8, #number-minute-left-9").addClass("object-disable");
		$("#number-minute-left-"+$num5).removeClass("object-disable");
		if( $num5 == 0 )
			$num5 = 9;
		else
			$num5 --;
		$sto5 = setTimeout(function(){lamp5();},400);
	}
	function lamp6(){
		$("#number-minute-right-0, #number-minute-right-1, #number-minute-right-2, #number-minute-right-3, #number-minute-right-4, #number-minute-right-5, #number-minute-right-6, #number-minute-right-7, #number-minute-right-8, #number-minute-right-9").addClass("object-disable");
		$("#number-minute-right-"+$num6).removeClass("object-disable");
		if( $num6 == 9 )
			$num6 = 0;
		else
			$num6 ++;
		$sto6 = setTimeout(function(){lamp6();},150);
	}
	function lamp7(){
		$("#number-second-left-0, #number-second-left-1, #number-second-left-2, #number-second-left-3, #number-second-left-4, #number-second-left-5, #number-second-left-6, #number-second-left-7, #number-second-left-8, #number-second-left-9").addClass("object-disable");
		$("#number-second-left-"+$num7).removeClass("object-disable");
		if( $num7 == 0 )
			$num7 = 9;
		else
			$num7 --;
		$sto7 = setTimeout(function(){lamp7();},50);
	}
	function lamp8(){
		$("#number-second-right-0, #number-second-right-1, #number-second-right-2, #number-second-right-3, #number-second-right-4, #number-second-right-5, #number-second-right-6, #number-second-right-7, #number-second-right-8, #number-second-right-9").addClass("object-disable");
		$("#number-second-right-"+$num8).removeClass("object-disable");
		if( $num8 == 0 )
			$num8 = 9;
		else
			$num8 --;
		$sto8 = setTimeout(function(){lamp8();},90);
	}

	// Error Function

	$error = function(){
		$("#error-log").removeClass("object-disable");
		$("#timer-motor-red").removeClass("object-disable");
		$("#timer-motor-blue").removeClass("object-disable");
		lamp1();
		lamp2();
		lamp3();
		lamp4();
		lamp5();
		lamp6();
		lamp7();
		lamp8();
		new TimelineMax({repeat: -1}).to("#timer-motor-red", .1, {x:12, ease: Power0.easeNone}).to("#timer-motor-red", .1, {x:-12, ease: Power0.easeNone}).to("#timer-motor-red", .05, {x:0, ease: Power0.easeNone}).to("#timer-motor-red", .1, {y:12, ease: Power0.easeNone}).to("#timer-motor-red", .1, {y:-12, ease: Power0.easeNone}).to("#timer-motor-red", .05, {y:0, ease: Power0.easeNone});
		new TimelineMax({repeat: -1}).to("#timer-motor-blue", .1, {x:-12, ease: Power0.easeNone}).to("#timer-motor-blue", .1, {x:12, ease: Power0.easeNone}).to("#timer-motor-blue", .05, {x:0, ease: Power0.easeNone}).to("#timer-motor-blue", .1, {y:-12, ease: Power0.easeNone}).to("#timer-motor-blue", .1, {y:12, ease: Power0.easeNone}).to("#timer-motor-blue", .05, {y:0, ease: Power0.easeNone});
		new TimelineMax({repeat: -1}).to("#timer-motor", .1, {x:1, ease: Power0.easeNone}).to("#timer-motor", .1, {x:-1, ease: Power0.easeNone});
	}

	// Timer Function

	$timer = function(){
		$now_date = new Date();

		$delta = Math.abs($final_date - $now_date) / 1000;
		$days = Math.floor($delta / 86400);
		$delta -= $days * 86400;
		$hours = Math.floor($delta / 3600) % 24;
		$delta -= $hours * 3600;
		$minutes = Math.floor($delta / 60) % 60;
		$delta -= $minutes * 60;
		$seconds = $delta % 60;

		$days = parseInt($days);
		$hours = parseInt($hours);
		$minutes = parseInt($minutes);
		$seconds = parseInt($seconds);

		$arday = ($days+'').split('');
		$arhours = ($hours+'').split('');
		$arminute = ($minutes+'').split('');
		$arsecond = ($seconds+'').split('');

		$("#timer-log").removeClass("object-disable");

		$("#number-day-left-0, #number-day-left-1, #number-day-left-2, #number-day-left-3, #number-day-left-4, #number-day-left-5, #number-day-left-6, #number-day-left-7, #number-day-left-8, #number-day-left-9, #number-day-right-0, #number-day-right-1, #number-day-right-2, #number-day-right-3, #number-day-right-4, #number-day-right-5, #number-day-right-6, #number-day-right-7, #number-day-right-8, #number-day-right-9, #number-hour-left-0, #number-hour-left-1, #number-hour-left-2, #number-hour-left-3, #number-hour-left-4, #number-hour-left-5, #number-hour-left-6, #number-hour-left-7, #number-hour-left-8, #number-hour-left-9, #number-hour-right-0, #number-hour-right-1, #number-hour-right-2, #number-hour-right-3, #number-hour-right-4, #number-hour-right-5, #number-hour-right-6, #number-hour-right-7, #number-hour-right-8, #number-hour-right-9, #number-minute-left-0, #number-minute-left-1, #number-minute-left-2, #number-minute-left-3, #number-minute-left-4, #number-minute-left-5, #number-minute-left-6, #number-minute-left-7, #number-minute-left-8, #number-minute-left-9, #number-minute-right-0, #number-minute-right-1, #number-minute-right-2, #number-minute-right-3, #number-minute-right-4, #number-minute-right-5, #number-minute-right-6, #number-minute-right-7, #number-minute-right-8, #number-minute-right-9, #number-second-left-0, #number-second-left-1, #number-second-left-2, #number-second-left-3, #number-second-left-4, #number-second-left-5, #number-second-left-6, #number-second-left-7, #number-second-left-8, #number-second-left-9, #number-second-right-0, #number-second-right-1, #number-second-right-2, #number-second-right-3, #number-second-right-4, #number-second-right-5, #number-second-right-6, #number-second-right-7, #number-second-right-8, #number-second-right-9").addClass("object-disable");

		if( $days > 99 || $now_date > $final_date)
		{
			$("#number-day-left-0").removeClass("object-disable");
			$("#number-day-right-0").removeClass("object-disable");
			$("#number-hour-left-0").removeClass("object-disable");
			$("#number-hour-right-0").removeClass("object-disable");
			$("#number-minute-left-0").removeClass("object-disable");
			$("#number-minute-right-0").removeClass("object-disable");
			$("#number-second-left-0").removeClass("object-disable");
			$("#number-second-right-0").removeClass("object-disable");
		}
		else
		{
			if( $days <= 9 )
			{
				$("#number-day-left-0").removeClass("object-disable");
				if( $arday[0] == 0)
					$("#number-day-right-0").removeClass("object-disable");
				else if( $arday[0] == 1)
					$("#number-day-right-1").removeClass("object-disable");
				else if( $arday[0] == 2)
					$("#number-day-right-2").removeClass("object-disable");
				else if( $arday[0] == 3)
					$("#number-day-right-3").removeClass("object-disable");
				else if( $arday[0] == 4)
					$("#number-day-right-4").removeClass("object-disable");
				else if( $arday[0] == 5)
					$("#number-day-right-5").removeClass("object-disable");
				else if( $arday[0] == 6)
					$("#number-day-right-6").removeClass("object-disable");
				else if( $arday[0] == 7)
					$("#number-day-right-7").removeClass("object-disable");
				else if( $arday[0] == 8)
					$("#number-day-right-8").removeClass("object-disable");
				else if( $arday[0] == 9)
					$("#number-day-right-9").removeClass("object-disable");
			}
			else
			{
				if( $arday[0] == 0)
					$("#number-day-left-0").removeClass("object-disable");
				else if( $arday[0] == 1)
					$("#number-day-left-1").removeClass("object-disable");
				else if( $arday[0] == 2)
					$("#number-day-left-2").removeClass("object-disable");
				else if( $arday[0] == 3)
					$("#number-day-left-3").removeClass("object-disable");
				else if( $arday[0] == 4)
					$("#number-day-left-4").removeClass("object-disable");
				else if( $arday[0] == 5)
					$("#number-day-left-5").removeClass("object-disable");
				else if( $arday[0] == 6)
					$("#number-day-left-6").removeClass("object-disable");
				else if( $arday[0] == 7)
					$("#number-day-left-7").removeClass("object-disable");
				else if( $arday[0] == 8)
					$("#number-day-left-8").removeClass("object-disable");
				else if( $arday[0] == 9)
					$("#number-day-left-9").removeClass("object-disable");
				if( $arday[1] == 0)
					$("#number-day-right-0").removeClass("object-disable");
				else if( $arday[1] == 1)
					$("#number-day-right-1").removeClass("object-disable");
				else if( $arday[1] == 2)
					$("#number-day-right-2").removeClass("object-disable");
				else if( $arday[1] == 3)
					$("#number-day-right-3").removeClass("object-disable");
				else if( $arday[1] == 4)
					$("#number-day-right-4").removeClass("object-disable");
				else if( $arday[1] == 5)
					$("#number-day-right-5").removeClass("object-disable");
				else if( $arday[1] == 6)
					$("#number-day-right-6").removeClass("object-disable");
				else if( $arday[1] == 7)
					$("#number-day-right-7").removeClass("object-disable");
				else if( $arday[1] == 8)
					$("#number-day-right-8").removeClass("object-disable");
				else if( $arday[1] == 9)
					$("#number-day-right-9").removeClass("object-disable");
			}

			if( $hours <= 9 )
			{
				$("#number-hour-left-0").removeClass("object-disable");
				if( $arhours[0] == 0)
					$("#number-hour-right-0").removeClass("object-disable");
				else if( $arhours[0] == 1)
					$("#number-hour-right-1").removeClass("object-disable");
				else if( $arhours[0] == 2)
					$("#number-hour-right-2").removeClass("object-disable");
				else if( $arhours[0] == 3)
					$("#number-hour-right-3").removeClass("object-disable");
				else if( $arhours[0] == 4)
					$("#number-hour-right-4").removeClass("object-disable");
				else if( $arhours[0] == 5)
					$("#number-hour-right-5").removeClass("object-disable");
				else if( $arhours[0] == 6)
					$("#number-hour-right-6").removeClass("object-disable");
				else if( $arhours[0] == 7)
					$("#number-hour-right-7").removeClass("object-disable");
				else if( $arhours[0] == 8)
					$("#number-hour-right-8").removeClass("object-disable");
				else if( $arhours[0] == 9)
					$("#number-hour-right-9").removeClass("object-disable");
			}
			else
			{
				if( $arhours[0] == 0)
					$("#number-hour-left-0").removeClass("object-disable");
				else if( $arhours[0] == 1)
					$("#number-hour-left-1").removeClass("object-disable");
				else if( $arhours[0] == 2)
					$("#number-hour-left-2").removeClass("object-disable");
				else if( $arhours[0] == 3)
					$("#number-hour-left-3").removeClass("object-disable");
				else if( $arhours[0] == 4)
					$("#number-hour-left-4").removeClass("object-disable");
				else if( $arhours[0] == 5)
					$("#number-hour-left-5").removeClass("object-disable");
				else if( $arhours[0] == 6)
					$("#number-hour-left-6").removeClass("object-disable");
				else if( $arhours[0] == 7)
					$("#number-hour-left-7").removeClass("object-disable");
				else if( $arhours[0] == 8)
					$("#number-hour-left-8").removeClass("object-disable");
				else if( $arhours[0] == 9)
					$("#number-hour-left-9").removeClass("object-disable");
				if( $arhours[1] == 0)
					$("#number-hour-right-0").removeClass("object-disable");
				else if( $arhours[1] == 1)
					$("#number-hour-right-1").removeClass("object-disable");
				else if( $arhours[1] == 2)
					$("#number-hour-right-2").removeClass("object-disable");
				else if( $arhours[1] == 3)
					$("#number-hour-right-3").removeClass("object-disable");
				else if( $arhours[1] == 4)
					$("#number-hour-right-4").removeClass("object-disable");
				else if( $arhours[1] == 5)
					$("#number-hour-right-5").removeClass("object-disable");
				else if( $arhours[1] == 6)
					$("#number-hour-right-6").removeClass("object-disable");
				else if( $arhours[1] == 7)
					$("#number-hour-right-7").removeClass("object-disable");
				else if( $arhours[1] == 8)
					$("#number-hour-right-8").removeClass("object-disable");
				else if( $arhours[1] == 9)
					$("#number-hour-right-9").removeClass("object-disable");
			}

			if( $minutes <= 9 )
			{
				$("#number-minute-left-0").removeClass("object-disable");
				if( $arminute[0] == 0)
					$("#number-minute-right-0").removeClass("object-disable");
				else if( $arminute[0] == 1)
					$("#number-minute-right-1").removeClass("object-disable");
				else if( $arminute[0] == 2)
					$("#number-minute-right-2").removeClass("object-disable");
				else if( $arminute[0] == 3)
					$("#number-minute-right-3").removeClass("object-disable");
				else if( $arminute[0] == 4)
					$("#number-minute-right-4").removeClass("object-disable");
				else if( $arminute[0] == 5)
					$("#number-minute-right-5").removeClass("object-disable");
				else if( $arminute[0] == 6)
					$("#number-minute-right-6").removeClass("object-disable");
				else if( $arminute[0] == 7)
					$("#number-minute-right-7").removeClass("object-disable");
				else if( $arminute[0] == 8)
					$("#number-minute-right-8").removeClass("object-disable");
				else if( $arminute[0] == 9)
					$("#number-minute-right-9").removeClass("object-disable");
			}
			else
			{
				if( $arminute[0] == 0)
					$("#number-minute-left-0").removeClass("object-disable");
				else if( $arminute[0] == 1)
					$("#number-minute-left-1").removeClass("object-disable");
				else if( $arminute[0] == 2)
					$("#number-minute-left-2").removeClass("object-disable");
				else if( $arminute[0] == 3)
					$("#number-minute-left-3").removeClass("object-disable");
				else if( $arminute[0] == 4)
					$("#number-minute-left-4").removeClass("object-disable");
				else if( $arminute[0] == 5)
					$("#number-minute-left-5").removeClass("object-disable");
				else if( $arminute[0] == 6)
					$("#number-minute-left-6").removeClass("object-disable");
				else if( $arminute[0] == 7)
					$("#number-minute-left-7").removeClass("object-disable");
				else if( $arminute[0] == 8)
					$("#number-minute-left-8").removeClass("object-disable");
				else if( $arminute[0] == 9)
					$("#number-minute-left-9").removeClass("object-disable");
				if( $arminute[1] == 0)
					$("#number-minute-right-0").removeClass("object-disable");
				else if( $arminute[1] == 1)
					$("#number-minute-right-1").removeClass("object-disable");
				else if( $arminute[1] == 2)
					$("#number-minute-right-2").removeClass("object-disable");
				else if( $arminute[1] == 3)
					$("#number-minute-right-3").removeClass("object-disable");
				else if( $arminute[1] == 4)
					$("#number-minute-right-4").removeClass("object-disable");
				else if( $arminute[1] == 5)
					$("#number-minute-right-5").removeClass("object-disable");
				else if( $arminute[1] == 6)
					$("#number-minute-right-6").removeClass("object-disable");
				else if( $arminute[1] == 7)
					$("#number-minute-right-7").removeClass("object-disable");
				else if( $arminute[1] == 8)
					$("#number-minute-right-8").removeClass("object-disable");
				else if( $arminute[1] == 9)
					$("#number-minute-right-9").removeClass("object-disable");
			}

			if( $seconds <= 9 )
			{
				$("#number-second-left-0").removeClass("object-disable");
				if( $arsecond[0] == 0)
					$("#number-second-right-0").removeClass("object-disable");
				else if( $arsecond[0] == 1)
					$("#number-second-right-1").removeClass("object-disable");
				else if( $arsecond[0] == 2)
					$("#number-second-right-2").removeClass("object-disable");
				else if( $arsecond[0] == 3)
					$("#number-second-right-3").removeClass("object-disable");
				else if( $arsecond[0] == 4)
					$("#number-second-right-4").removeClass("object-disable");
				else if( $arsecond[0] == 5)
					$("#number-second-right-5").removeClass("object-disable");
				else if( $arsecond[0] == 6)
					$("#number-second-right-6").removeClass("object-disable");
				else if( $arsecond[0] == 7)
					$("#number-second-right-7").removeClass("object-disable");
				else if( $arsecond[0] == 8)
					$("#number-second-right-8").removeClass("object-disable");
				else if( $arsecond[0] == 9)
					$("#number-second-right-9").removeClass("object-disable");
			}
			else
			{
				if( $arsecond[0] == 0)
					$("#number-second-left-0").removeClass("object-disable");
				else if( $arsecond[0] == 1)
					$("#number-second-left-1").removeClass("object-disable");
				else if( $arsecond[0] == 2)
					$("#number-second-left-2").removeClass("object-disable");
				else if( $arsecond[0] == 3)
					$("#number-second-left-3").removeClass("object-disable");
				else if( $arsecond[0] == 4)
					$("#number-second-left-4").removeClass("object-disable");
				else if( $arsecond[0] == 5)
					$("#number-second-left-5").removeClass("object-disable");
				else if( $arsecond[0] == 6)
					$("#number-second-left-6").removeClass("object-disable");
				else if( $arsecond[0] == 7)
					$("#number-second-left-7").removeClass("object-disable");
				else if( $arsecond[0] == 8)
					$("#number-second-left-8").removeClass("object-disable");
				else if( $arsecond[0] == 9)
					$("#number-second-left-9").removeClass("object-disable");
				if( $arsecond[1] == 0)
					$("#number-second-right-0").removeClass("object-disable");
				else if( $arsecond[1] == 1)
					$("#number-second-right-1").removeClass("object-disable");
				else if( $arsecond[1] == 2)
					$("#number-second-right-2").removeClass("object-disable");
				else if( $arsecond[1] == 3)
					$("#number-second-right-3").removeClass("object-disable");
				else if( $arsecond[1] == 4)
					$("#number-second-right-4").removeClass("object-disable");
				else if( $arsecond[1] == 5)
					$("#number-second-right-5").removeClass("object-disable");
				else if( $arsecond[1] == 6)
					$("#number-second-right-6").removeClass("object-disable");
				else if( $arsecond[1] == 7)
					$("#number-second-right-7").removeClass("object-disable");
				else if( $arsecond[1] == 8)
					$("#number-second-right-8").removeClass("object-disable");
				else if( $arsecond[1] == 9)
					$("#number-second-right-9").removeClass("object-disable");
			}
		}

		$sto9 = setTimeout(function(){$timer();},1000);
	}
	
	//Load Timer

	if( Cookies.get('finish') == 'true' && Cookies.get('on') == 'true' )
	{
		$timer();
	}
	else
	{
		$error();
	}

	//JS Load Return
	
	function timer_loadetrue(){ return true; }

});