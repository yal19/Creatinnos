adminHomeNamespace.getHtmlSuccess = function(response){
	$("#mainContent").empty();
	$('#mainContent').append($(response)[1].outerHTML);
	CommonNamespace.common();
	$(document).ready(function(){
		$("#calendar").zabuto_calendar();
	});
	adminHomeNamespace.loadContents();
	CommonNamespace.stopLoader();
};

adminHomeNamespace.loadContents = function(){
	$("#newsSec").empty();
	$("#ExamUpcoming").empty();
	$(".displaycont").empty();
	$('<span class="headerContent">Dashboard</span>'+
		'<button class="btn btn-warning startBtn" id="addNewExam">Add New Exam</button>').appendTo(".displaycont");
	for(var i=0; i < constants.ExamInfo.length ; i++) {
		var examDate = constants.ExamInfo[i].ExamStartDate + " to " + constants.ExamInfo[i].ExamEndDate + " | " + constants.ExamInfo[i].ExamDuration;
		var examCont = '<div class="examList row">'+
		'<h4>' + constants.ExamInfo[i].ExamName + '</h4>'+
		'<div class="col-md-6 noPaddingStart">'+
			'<p>' + examDate + '</p>'+
		'</div>';
		var examProgress = "";
		if(constants.ExamInfo[i].progress === 100){
			examProgress = '<div class="col-md-6 noPaddingStart">'+
			'<div class="progress">'+
			  '<div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="' + constants.ExamInfo[i].progress + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + constants.ExamInfo[i].progress + '%">'+
			    '<span class="sr-only">' + constants.ExamInfo[i].progress + '% Complete</span>'+
			  '</div>'+
			'</div>'+
			'</div>'+
			'</div>';
		}else if(constants.ExamInfo[i].progress === 0){
			examProgress = "";
			examCont = '<div class="examList row greyed">'+
			'<h4>' + constants.ExamInfo[i].ExamName + '</h4>'+
			'<div class="col-md-6 noPaddingStart">'+
				'<p>' + examDate + '</p>'+
			'</div>';
		}else{
			examProgress = '<div class="col-md-6 noPaddingStart">'+
			'<div class="progress">'+
			  '<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="' + constants.ExamInfo[i].progress + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + constants.ExamInfo[i].progress + '%">'+
			    '<span class="sr-only">' + constants.ExamInfo[i].progress + '% Complete</span>'+
			  '</div>'+
			'</div>'+
			'</div>'+
			'</div>';
		}
		$(examCont + examProgress).appendTo("#ExamUpcoming");
	};
	
	for(var j=0; j < constants.events.length ; j++) {
		$('<div class="examList row">'+
				'<h5>' + constants.events[j].Event + '</h5>'+
				'<div class="col-md-6 noPaddingStart">'+
					'<p>' + constants.events[j].PostedBy + ' | ' + constants.events[j].PostedOn + '</p>'+
				'</div>'+
			'</div>').appendTo("#newsSec");
	};
	adminHomeNamespace.pageEvents();
};

adminHomeNamespace.pageEvents = function(){
	
};

adminHomeNamespace.getHtmlFailed = function(){
	$("#loginError").text("Some problem occured. Please try again later.");
	$("#loginError").show();
	CommonNamespace.stopLoader();
};