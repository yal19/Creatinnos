instructionNamespace.getHtmlSuccess = function(response){
	$('#layoutContainer').empty();
	$('#layoutContainer').append($(response)[1].outerHTML);
	var countDownDate = new Date().getTime()+5000;
	$(document).ready(function(){
		myFunction();
		var timer=setInterval(function(){myFunction()},1000);
		function myFunction() {
			var now = new Date().getTime();
			var distance = countDownDate - now;
			console.log(distance);
			/*var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));*/
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			$("#timer").html(minutes + "m " + seconds + "s ");

			// If the count down is over, write some text 
			if (distance < 0) {
				clearInterval(timer);
				$("#timer").css({display:'none'});
				$("#startTest").css({display:'inline'});
			}
		}
		
		$("#startTest").off().click(function(){
		});
	});
	
	//Load Instructions
	for(var i = 0; i< constants.instructions.length; i++){
		$('<li><h4>' + constants.instructions[i] + '</h4></li>').appendTo("#addInstructions");
	}
	
	CommonNamespace.stopLoader();
};

instructionNamespace.getHtmlFailed = function(){
	$("#loginError").text("Some problem occured. Please try again later.");
	$("#loginError").show();
	CommonNamespace.stopLoader();
};