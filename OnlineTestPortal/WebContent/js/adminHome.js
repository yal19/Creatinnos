adminHomeNamespace.getHtmlSuccess = function(response){
	$('#layoutContainer').empty();
	$('#layoutContainer').append($(response)[1].outerHTML);
	
	CommonNamespace.startLoader();
	var date = new Date(), y = date.getFullYear(), m = date.getMonth();
	var firstDay = new Date(y, m, 1);
	var dd = firstDay.getDate();
	var mm = firstDay.getMonth()+1; //January is 0!

	var yyyy = firstDay.getFullYear();
	if(dd<10){
	    dd='0'+dd;
	} 
	if(mm<10){
	    mm='0'+mm;
	} 
	firstDay = yyyy + '-' + mm + '-' + dd;
	var lastDay = new Date(y, m + 1, 0);
	var dd = lastDay.getDate();
	var mm = lastDay.getMonth()+1; //January is 0!

	var yyyy = lastDay.getFullYear();
	if(dd<10){
	    dd='0'+dd;
	} 
	if(mm<10){
	    mm='0'+mm;
	} 
	lastDay = yyyy + '-' + mm + '-' + dd;
	var eve = [];
	 for(var i=0;i<constants.ExamInfo.length;i++){
		 var examName = constants.ExamInfo[i].ExamName;
		 var examStart = constants.ExamInfo[i].ExamStartDate;
		 var examEnd = constants.ExamInfo[i].ExamEndDate;
		 var examTime = constants.ExamInfo[i].ExamTime;
		 var eveObj = {
				 examName: examName,
				 examStart:  examStart,
				 examEnd:  examEnd,
				 examTime : examTime,
		 }
		 eve.push(eveObj);
	 }
	 
	 $('.calView').show();
	 $('.page-head').show();
	 var tglmoment = "";
	 var calHeight = $(".scrollable-area").height() - 10;
	 
		 $("#eve").empty();
		 $('<li class="listEve"><span id="eveTitle" style="font-size: 20px;color:#FFF">No Events</span></li>').appendTo("#eve");
	    $('#calendar').fullCalendar({
	    	height: calHeight,
	    	selectable: true,
	       select: function(start, end, jsEvent, view) {
	    	  $("#selected-day").text(start.format('dddd'));
	 		  $("#selected-date").text(start.format('DD MMMM YYYY'));
	 		  $(".events").show();
	 		  CalenderNamespace.calEvents();	
	       },
	       events: eve,
	    });
	    
	    $(".force-padding").height($("#calendar").height()-92);
		   tglmoment = $('#calendar').fullCalendar('getDate');
		   var day = tglmoment.format('dddd');
		   var today = tglmoment.format('DD MMMM YYYY');
		   var i=0;
		   $('#calendar').fullCalendar('clientEvents', function(event) {
		    	if(today == moment(event.examStart).format('DD MMMM YYYY')){
		    		$("#eveTitle").text("Events");
		    		$('<li class="list eventsClick" id="listing-'+i+'"><div class="timeline-content"><div class="hiddenCont attList"></div><div class="hiddenCont bodyLink"></div><div class="hiddenCont location"></div><p class="push-bit"><a class="eveLink" target="_blank"><strong>'+ moment(event.examStart).format('HH:mmt') + " - " + moment(event.examEnd).format('HH:mmt') + " : " + event.examName+'</strong></a></p></div></li>').appendTo("#eve");
		    		$("#listing-"+i+" .bodyLink").empty();
		    		$("#listing-"+i+" .bodyLink").html(event.examTime);
		    		i++;	
		    	}
	    });
		   
		   $("#selected-day").text(day);
		   $("#selected-date").text(today);
		  
		   $('#calender-next').click(function() {
			   $(".events").hide();
			    $('#calendar').fullCalendar('next');
				   var nday  = $('#calendar').fullCalendar('getDate');
				   var day = nday.format('dddd');
				   var today = nday.format('DD MMMM YYYY');
					   $("#selected-day").text(day);
					   $("#selected-date").text(today);
			});
		   
		  $('#calender-prev').click(function() {
			  $(".events").hide();
			    $('#calendar').fullCalendar('prev');
			    var nday  = $('#calendar').fullCalendar('getDate');
				   var day = nday.format('dddd');
				   var today = nday.format('DD MMMM YYYY');
				   $("#selected-day").text(day);
				   $("#selected-date").text(today);
			});
		  
			 $('#month').click(function() {
				 	$(".viewbtn").removeClass("active");
				 	$(this).addClass("active");
				    $('#calendar').fullCalendar( 'changeView', "month" )
				});
			 
			$('#agendaWeek').click(function() {
				$(".viewbtn").removeClass("active");
				$(this).addClass("active");
			    $('#calendar').fullCalendar( 'changeView', "agendaWeek" )
			});
			
			$('#agendaDay').click(function() {
				$(".viewbtn").removeClass("active");
				$(this).addClass("active");
			    $('#calendar').fullCalendar( 'changeView', "agendaDay" )
			});
	CommonNamespace.stopLoader();
};

adminHomeNamespace.getHtmlFailed = function(){
	$("#loginError").text("Some problem occured. Please try again later.");
	$("#loginError").show();
	CommonNamespace.stopLoader();
};