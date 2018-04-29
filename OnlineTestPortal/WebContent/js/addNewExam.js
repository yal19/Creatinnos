addNewExamNamespace.getHtmlSuccess = function(response){
	$("#mainContent").empty();
	$('#mainContent').append($(response)[1].outerHTML);
	CommonNamespace.common();
	$(".displaycont").empty();
	$('<span class="headerContent">Add New Exam</span><span class="timer" id="timer"></span>').appendTo(".displaycont");
	 $(function () {
		 $('.datepicker').datepicker({
			 format: 'DD/MM/YYYY'
		 });
	  });
	CommonNamespace.stopLoader();
};

addNewExamNamespace.getHtmlFailed = function(){
	$("#loginError").text("Some problem occured. Please try again later.");
	$("#loginError").show();
	CommonNamespace.stopLoader();
};