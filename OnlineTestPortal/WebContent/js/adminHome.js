adminHomeNamespace.getHtmlSuccess = function(response){
	$('#layoutContainer').empty();
	$('#layoutContainer').append($(response)[1].outerHTML);
	$(document).ready(function(){
		$("#calendar").zabuto_calendar();
	});
	CommonNamespace.stopLoader();
};

adminHomeNamespace.getHtmlFailed = function(){
	$("#loginError").text("Some problem occured. Please try again later.");
	$("#loginError").show();
	CommonNamespace.stopLoader();
};