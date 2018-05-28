var CommonNamespace = {};
var loginNamespace = {};
var instructionNamespace = {};
var adminHomeNamespace = {};
var addNewExamNamespace = {};
var questionsNamespace = {};
var state = false;
CommonNamespace.getContainer = function() {
	CommonNamespace.startLoader();
	$(".menus").find('h4').css("color", "#E9F1F7");
	if(window.location.href.indexOf("#login") > 0 || window.location.href.indexOf("#") === -1){
		document.title = "Creatinnos | Login";
		$("#headerSec,.headerBlock").hide();
		
		CommonNamespace.ajaxGetRequest("view/login.html", '', '',
				loginNamespace.getHtmlSuccess, loginNamespace.getHtmlFailed);
	}else if(window.location.href.indexOf("#adminHome") > 0){
		document.title = "Creatinnos | Dashboard";
		$(".adminHomeMenu").css("color", "#e7dfc6");
		CommonNamespace.ajaxGetRequest("view/adminHome.html", '', '',
				adminHomeNamespace.getHtmlSuccess, adminHomeNamespace.getHtmlFailed);
	}else if(window.location.href.indexOf("#addNewExam") > 0){
		document.title = "Creatinnos | Add New Exam";
		$(".addNewExamMenu").css("color", "#e7dfc6");
		CommonNamespace.ajaxGetRequest("view/addNewExam.html", '', '',
				addNewExamNamespace.getHtmlSuccess, addNewExamNamespace.getHtmlFailed);
	}else if(window.location.href.indexOf("#questions") > 0){
		document.title = "Creatinnos | Add Questions";
		$(".addNewExamMenu").css("color", "#e7dfc6");
		CommonNamespace.ajaxGetRequest("view/questions.html", '', '',
				questionsNamespace.getHtmlSuccess, questionsNamespace.getHtmlFailed);
	}else if(window.location.href.indexOf("#instructions") > 0){
		document.title = "Creatinnos | Instructions";
		CommonNamespace.ajaxGetRequest("view/examInstruction.html", '', '',
				instructionNamespace.getHtmlSuccess, instructionNamespace.getHtmlFailed);
	}
	$(function(){
		$(".btn-pref .btn").click(function () {
		    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
		    $(this).removeClass("btn-default").addClass("btn-primary");   
		});
	});
	
	$(window).on('resize', function (){
		CommonNamespace.common();
	});
	CommonNamespace.pageEvents();
};

loginNamespace.getHtmlSuccess = function(response) {
	$('#mainContent').empty();
	$('#mainContent').append($(response)[1].outerHTML);
	if (CommonNamespace.isAvailable(localStorage.getItem("CTS_rememberMe")) && !$("#remember").is(':checked')) {
		  $("#remember").trigger('click');
		  $("#loginUser").val(localStorage.getItem('CTS_username'));
		  $("#loginPw").val(CommonNamespace.decrypt());
	}else{
		localStorage.removeItem('encrypt');
	}
	CommonNamespace.stopLoader();
	CommonNamespace.pageEvents();
};

CommonNamespace.pageEvents = function(){
	$("#login").off().click(function(){
		var userName = $("#loginUser").val();
		var password = $("#loginPw").val();
		if(userName !== "" && password !== "") {
			CommonNamespace.startLoader();
			$("#loginError").hide();
			CommonNamespace.checkLogin(userName, password);
		}else{
			if(userName === "" && password === "") {
				$("#loginError").text("Please fill in all required fields");
			}else{
				if(userName === ""){
					$("#loginError").text("Please Enter Username");
				}else if(password === ""){
					$("#loginError").text("Please Enter Password");
				}
				$("#loginError").show();
			}
		}
	});
	
	$("#register").off().click(function(){
		var regUserName = $("#regUserName").val();
		var phone_no = $("#phone_no").val();
		var email = $("#email").val();
		var company_name = $("#company_name").val();
		var regPw = $("#regPw").val();
		var regPwConfirm = $("#regPwConfirm").val();
		if(regUserName !== "" && phone_no !== "" && email !== "" & company_name !== "" && regPw !== "" && regPwConfirm !== "") {
			var valid = 'true';
			var phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
			var pwRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
			if(validateEmail(email)){
				if(regPw === regPwConfirm){
					if(pwRegex.test(regPw)){
						if(phoneRegex.test(phone_no)){
							valid = 'true';
						}else{
							valid = 'false';
							$("#regError").text("Enter a valid Phone Number");
							$("#regError").show();
						}
					}else{
						valid = 'false';
						$("#regError").text("The password must be 6 to 16 characters in length. Must contain at least one letter and one number and a special character");
						$("#regError").show();
					}
					
				}else{
					valid = 'false';
					$("#regError").text("Password does not matches.");
					$("#regError").show();
				}
			}else{
				valid = 'false';
				$("#regError").text("Please enter a valid email address");
				$("#regError").show();
			}
			if(valid === "true"){
				CommonNamespace.startLoader();
				$("#regError").hide();
				var data = {
						"userName" : regUserName,
						"password" : regPw,
						"email" : email,
						"phoneNumber" : phone_no,
						"companyName" : company_name,
				};
				$.ajaxSetup({
			        cache: false
			    });
			    $.ajax({
			        url: constants.doRegister,
			        type: 'POST',
			        contentType: 'application/json',
			        data: JSON.stringify(data),
			        dataType: 'JSON',
			        success: function(response){
			        	if(response.ResponseMessage == "Registered Successfully"){
			        		CommonNamespace.checkLogin(regUserName, regPw);
			        	}else{
			        		$("#regError").text(response.ResponseMessage);
			        		$("#regError").show();
			        	}
			        	CommonNamespace.stopLoader();
			        },
			        error: function(){
			        	$("#regError").text("Some problem occured. Please try again later.");
			        	$("#regError").show();
			        	CommonNamespace.stopLoader();
			        }
			    });
			}
		}else{
			if(regUserName === "" && phone_no === "" && email === "" && company_name === "" && regPw === "" && regPwConfirm === "") {
				$("#regError").text("Please fill in all required fields");
			}else{
				msg = "";
				(regUserName === "") ? msg = msg + " Username" :  msg = "";
				(phone_no === "") ?  (msg === "" ) ? msg = msg + " Phone" : msg = msg + ", Phone" : msg = "";
				(email === "") ?  (msg === "" ) ? msg = msg + " Email" : msg = msg + ", Email" : msg = "";
				(company_name === "") ?  (msg === "" ) ? msg = msg + " Company" : msg = msg + ", Company" : msg = "";
				(regPw === "") ?  (msg === "" ) ? msg = msg + " Password" : msg = msg + ", Password" : msg = "";
				(regPwConfirm === "") ?  (msg === "" ) ? msg = msg + " Confirm Password" : msg = msg + ", Confirm Password" : msg = "";
				$("#regError").text("Please Enter" + msg);
			}
			$("#regError").show();
		}
	});
	
	function validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}
	
	$("#logout").off().click(function(){
		state = false;
		$("#menuSec").animate({
			'marginLeft':'-280px'
		});
		CommonNamespace.changeHref("#login");
		CommonNamespace.getContainer();
	});
	
	$("#sideMenus").off().click(function(){
		if(state){
			$("#menuSec").animate({
				'marginLeft':'-280px'
			});
		}else{
			$("#menuSec").animate({
				'marginLeft':'0px'
			});
		}
		state = state ? false : true;
		return state;
	});
	
	$(".menus").off().click(function(){
		var selectedMenu = $(this).find('h4').text().trim();
		if(selectedMenu === "Home") {
			CommonNamespace.changeHref("#adminHome");
		}else if(selectedMenu === "Add New Exam") {
			CommonNamespace.changeHref("#addNewExam");
			localStorage.setItem("CRT_AddNew", "new");
		}
		state = false;
		$(this).find('h4').css("color", "#E9F1F7");
		$(this).css("color", "#e7dfc6");
		$("#menuSec").animate({
			'marginLeft':'-280px'
		});
		CommonNamespace.getContainer();
	});
	
	$("#forgotPW").off().click(function(){
		$(".modal-body").empty();
		$(".modal-title").text("Forgot Password");
		$('<div class="row"><div class="col-md-12"><input type="text" class="form-control formFields col-md-10" id="forgotPwEmail" placeholder = "Enter your Email id">'+
				'<button class="btn btn-success col-md-2" style="margin:0px 10px;" id="sendForgotPwReq">Submit</button></div></div>').appendTo(".modal-body");
		$("#myModal").modal('show');
	});
};

CommonNamespace.checkLogin = function(userName, password) {
	var data = {
			"userName" : userName,
			"password" : password
	};
	
    var rememberMe = false;
    if ($("#remember").is(':checked')) {
        CommonNamespace.encrypt(password);
        rememberMe = true;
    }
    localStorage.setItem('CTS_username', userName);
    localStorage.setItem('CTS_rememberMe', rememberMe);
	
	$.ajaxSetup({
        cache: false
    });
    $.ajax({
        url: constants.doLogin,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'JSON',
        success: function(response){
        	if(response.ResponseMessage == "Login Success"){
    			$("#loginError").hide();
    			localStorage.setItem("CTS_username",userName.substring(userName.substring(0).toUpperCase(), userName.length));
    			CommonNamespace.changeHref("#adminHome");
    			CommonNamespace.getContainer();
    		}else{
    			$("#loginError").text("Invalid Username/Password");
    			$("#loginError").show();
    			CommonNamespace.stopLoader();
    		}
        },
        error: function(){
        	$("#loginError").text("Some problem occured. Please try again later.");
        	$("#loginError").show();
        	CommonNamespace.stopLoader();
        }
    });
};


CommonNamespace.formatEventsCalDate = function(date,mode){
	 var d = new Date(date),
     month = '' + (d.getMonth() + 1),
     day = '' + d.getDate(),
     year = d.getFullYear();

	 if (month.length < 2) month = '0' + month;
	 if (day.length < 2) day = '0' + day;
	
	 if(mode === "disp"){
		 return [day, month, year].join('-');
	 }else{
		 return [year, month, day].join('-');
	 }
};

//Function to handle ajax GET request
CommonNamespace.ajaxGetRequest = function(requestUrl, dataType, param,
    successFunction, errorFunction) {
    $.ajaxSetup({
        cache: false
    });
    $.ajax({
        url: requestUrl,
        type: 'GET',
        dataType: dataType,
        data: param,
        beforeSend: CommonNamespace.startLoader(),
        success: successFunction,
        error: errorFunction
    });
};

CommonNamespace.ajaxPostRequest = function(requestUrl, contentType, data, dataType, successFunction, errorFunction) {
    $.ajaxSetup({
        cache: false
    });
    $.ajax({
        url: requestUrl,
        type: 'POST',
        contentType: contentType,
        data: data,
        dataType: dataType,
        success: successFunction,
        error: errorFunction
    });
};

CommonNamespace.encrypt = function(password) {
    var encryptedString = '';
    var encrypt = [];
    for (var i = 0; i < password.length; i++) {
        var data = password.charCodeAt(i) + 10;
     encrypt.push(data);
        encryptedString = encryptedString + "" + data;
    }
    localStorage.setItem("encrypt", JSON.stringify(encrypt.reverse()));
    return encryptedString;
};
CommonNamespace.decrypt = function() {
    var encrypt = JSON.parse(localStorage.getItem("encrypt")).reverse();
    var decrypt = '';
    $.each(encrypt, function(key, value) {
        decrypt = decrypt + String.fromCharCode(value - 10);
    });
    return decrypt;
};
CommonNamespace.isAvailable = function(data) {
   if (data === undefined || data === 'undefined' || data === null || data === 'null' || data === false || data === "false")
	   return false;
   else if (data === true || data === "true")
       return true;
   else
       return true;
};
//change Href
CommonNamespace.changeHref = function(pageHash) {
    window.location.hash = pageHash;
};

//Function to start the loader
CommonNamespace.startLoader = function() {
    $(".section-loader").css("display", "block");
};
//Function to stop the loader
CommonNamespace.stopLoader = function() {
    $(".section-loader").css("display", "none");
};

//Function to stop the loader
CommonNamespace.common = function() {
	$("#userId").text(localStorage.getItem("CTS_username").toUpperCase());
	$('<span class="caret"></span>').appendTo("#userId");
	$("#headerSec,.headerBlock").show();
	var layoutHeight  = $(window).height() - ($("#headerSec").outerHeight() + $(".headerBlock").outerHeight());
	$("#layoutContainer").height(layoutHeight);
	$(".menuSection").height(layoutHeight);
	
};
