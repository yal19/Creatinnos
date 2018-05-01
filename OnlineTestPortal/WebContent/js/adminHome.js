adminHomeNamespace.getHtmlSuccess = function(response){
	$("#mainContent").empty();
	$('#mainContent').append($(response)[1].outerHTML);
	CommonNamespace.common();
	adminHomeNamespace.loadContents();
	CommonNamespace.stopLoader();
};

adminHomeNamespace.loadContents = function(){
	$("#newsSec").empty();
	$(".displaycont").empty();
	$('<span class="headerContent">Dashboard</span>'+
		'<button class="btn btn-success startBtn" id="addNewExam">Add New Exam</button>').appendTo(".displaycont");
	adminHomeNamespace.loadExamList();
	if(constants.ExamInfo.length > 0){
		for(var j=0; j < constants.events.length ; j++) {
			$('<div class="examList row">'+
					'<h5>' + constants.events[j].Event + '</h5>'+
					'<h5 class="greyed">' + constants.events[j].PostedOn + ' | ' + constants.events[j].PostedBy + '</h5>'+
				'</div>').appendTo("#newsSec");
		};
	}else{
		$('<h5 style="text-align:center;">No Data Available!</h5>').appendTo("#newsSec");
	}
	adminHomeNamespace.pageEvents();
};

adminHomeNamespace.loadExamList = function(){
	$("#ExamUpcoming").empty();
	var eventData = [];
	if(constants.ExamInfo.length > 0){
		for(var i=0; i < constants.ExamInfo.length ; i++) {
			var examDate = adminHomeNamespace.formatEventsCalDate(constants.ExamInfo[i].ExamStartDate,"disp") + " to " + adminHomeNamespace.formatEventsCalDate(constants.ExamInfo[i].ExamEndDate,"disp") + " | " + constants.ExamInfo[i].ExamDuration;
			var examAvailability = '<div class="examList row">';
			var progressClass = "";
			var symbolTitle = "";
			adminHomeNamespace.getDates(eventData,constants.ExamInfo[i].ExamStartDate,constants.ExamInfo[i].ExamEndDate);
			if(constants.ExamInfo[i].progress === "Y"){
				progressClass = "glyphicon glyphicon-ok-circle green";
				symbolTitle = "Completed";
			}else if(constants.ExamInfo[i].progress === "E"){
				progressClass = "glyphicon glyphicon-stop red";
				examAvailability = '<div class="examList row greyed">';
				symbolTitle = "Exam Over";
			}else{
				progressClass = "glyphicon glyphicon-exclamation-sign warning";
				symbolTitle = "In Complete";
			}
			
			var examCont = examAvailability +
			'<h4 class="examTitle col-md-7"><span title = "'+ symbolTitle +'" class="' + progressClass+ '"></span>' + constants.ExamInfo[i].ExamName + '</h4>'+
			'<h5 class="col-md-5" style="margin-top: 14px;">' + examDate + '</h5>'+
			'</div>';
			
			$(examCont).appendTo("#ExamUpcoming");
		};
	}else{
		$('<h5 style="text-align:center;">No Data Available!</h5>').appendTo("#ExamUpcoming");
	}
	

	               
	$(document).ready(function(){
		$("#calendar").zabuto_calendar({
			 today: true,
			data: eventData,
			 modal: true
		});
	});

};

adminHomeNamespace.getDates = function(eventData,startDate, stopDate) {
    var dt = new Date(startDate);
    var edt = new Date(stopDate);
    while (dt <= edt) {
    	var formatedDate = adminHomeNamespace.formatEventsCalDate(dt,"events");
    	var badgestate = "";
    	if(formatedDate === startDate){
    		badgestate = true;
    	}else{
    		badgestate = false;
    	}
    	var eventObj = {
    			date : formatedDate,
    			badge : badgestate,
    	};
    	eventData.push(eventObj);
        dt.setDate(dt.getDate() + 1);
    }
    return eventData;
};

adminHomeNamespace.formatEventsCalDate = function(date,mode){
	 var d = new Date(date),
     month = '' + (d.getMonth() + 1),
     day = '' + d.getDate(),
     year = d.getFullYear();

	 if (month.length < 2) month = '0' + month;
	 if (day.length < 2) day = '0' + day;
	
	 if(mode === "disp"){
		 return [day, month, year].join('/');
	 }else{
		 return [year, month, day].join('-');
	 }
};

adminHomeNamespace.pageEvents = function(){
	$("#addNewExam").off().click(function(){
		CommonNamespace.changeHref("#addNewExam");
		CommonNamespace.getContainer();
	});
	
	$("#searchUpExams").off().keyup(function(e) {
        if ($("#searchUpExams").val() != "") {
            if (e.keyCode === 13) {
                $("#searching").trigger("click");
            }
        } else {
        	adminHomeNamespace.loadExamList();
        }
    });

    $("#searching").off().click(function(e) {
        if ($("#searchUpExams").val() != "") {
            var val = $.trim($("#searchUpExams").val()).replace(/ +/g, ' ').toLowerCase();
            var $rows = $("#ExamUpcoming").find(".examList");
            $rows.filter(function(i, v) {
                var title = $(this).find(".examTitle").text().replace(/\s+/g, ' ').toLowerCase();
                if (title.indexOf(val) > -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
            if ($("#ExamUpcoming").find(".examList").length === 0) {
            	$('<h5 style="text-align:center;">No Data Available!</h5>').appendTo("#ExamUpcoming");
            }
        } else {
        	adminHomeNamespace.loadExamList();
        }
    });
};

adminHomeNamespace.getHtmlFailed = function(){
	$("#loginError").text("Some problem occured. Please try again later.");
	$("#loginError").show();
	CommonNamespace.stopLoader();
};