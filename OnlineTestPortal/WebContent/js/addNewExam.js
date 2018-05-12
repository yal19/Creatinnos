addNewExamNamespace.getHtmlSuccess = function(response){
	$("#mainContent").empty();
	$('#mainContent').append($(response)[1].outerHTML);
	CommonNamespace.common();
	$(".displaycont").empty();
	$('<span class="headerContent">Add New Exam</span>').appendTo(".displaycont");
	 $(function () {
		 $('.datepicker').datepicker({
			 format: 'DD/MM/YYYY'
		 });
	  });
	CommonNamespace.stopLoader();
	addNewExamNamespace.pageEvents();
};

addNewExamNamespace.pageEvents = function(){
	$("#addNewInst").off().click(function(){
		var valid = true;
		$(".instTextArea").each(function(){
			if($(this).val() !== ""){
				if(valid) valid= true;
			}else{
				valid = false;
			}
		});
		if(valid){
			$(".addNewErrors").hide();
			$('<div class="appendDiv row"><label class="col-md-4 col-xs-6"></label>'+
					'<textarea class="formFields col-xs-4 form-control instTextArea" rows="2"></textarea>'+
					'<button class="btn btn-danger btn-xs addRemoveBtn deleteRow"><span class="glyphicon glyphicon-remove"></span></button></div>').appendTo("#instSec");
		}else{
			$(".addNewErrors").show();
			$(".addNewErrors").html("Please add a Instruction.");
		}
		
		$(".deleteRow").off().click(function(){
			$(".addNewErrors").hide();
			$(this).parent().remove();
		});
	});
	
	$("#addNewExamination").off().click(function(){
		CommonNamespace.changeHref("#questions");
		CommonNamespace.getContainer();
	});
};

addNewExamNamespace.getHtmlFailed = function(){
	$("#loginError").text("Some problem occured. Please try again later.");
	$("#loginError").show();
	CommonNamespace.stopLoader();
};