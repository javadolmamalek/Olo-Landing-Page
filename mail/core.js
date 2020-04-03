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

	$('#EmailForm').submit(function() {
		event.preventDefault();
		var email = $('#email').val();

		if(document.getElementById("email").value != '')
		{
			$("#EmailForm, .error").removeClass("active");
			$(".loading").addClass("active");
			$.post("./mail",{email: email}, function(result) {
				if(result.success)
				{
					$('#email').val('');
					$(".error").html(result.data);
				}
				else
				{
					$(".error").html(result.data);
				}
				$("#EmailForm, .loading").removeClass("active");
				$(".error").addClass("active");
			});
		}
	});

	$(".error").on("click","#back", function(){
		event.preventDefault();
		$(".error, .loading").removeClass("active");
		$("#EmailForm").addClass("active");
	});

});
