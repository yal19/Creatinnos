var CommonNamespace = {};
var loginNamespace = {};
var instructionNamespace = {};

CommonNamespace.getContainer = function() {
	CommonNamespace.startLoader();
	if(window.location.href.indexOf("#login") > 0){
		document.title = "Creatinnos | Login";
		CommonNamespace.ajaxGetRequest("view/login.html", '', '',
				loginNamespace.getHtmlSuccess, loginNamespace.getHtmlFailed);
	}else if(window.location.href.indexOf("#instruction") > 0){
		document.title = "Creatinnos | Instructions";
		CommonNamespace.ajaxGetRequest("view/examInstruction.html", '', '',
				instructionNamespace.getHtmlSuccess, instructionNamespace.getHtmlFailed);
	}
	$(function(){
	    $('.button-checkbox').each(function(){
			var $widget = $(this),
				$button = $widget.find('button'),
				$checkbox = $widget.find('input:checkbox'),
				color = $button.data('color'),
				settings = {
						on: {
							icon: 'glyphicon glyphicon-check'
						},
						off: {
							icon: 'glyphicon glyphicon-unchecked'
						}
				};

			$button.on('click', function () {
				$checkbox.prop('checked', !$checkbox.is(':checked'));
				$checkbox.triggerHandler('change');
				updateDisplay();
			});

			$checkbox.on('change', function () {
				updateDisplay();
			});

			function updateDisplay() {
				var isChecked = $checkbox.is(':checked');
				// Set the button's state
				$button.data('state', (isChecked) ? "on" : "off");

				// Set the button's icon
				$button.find('.state-icon')
					.removeClass()
					.addClass('state-icon ' + settings[$button.data('state')].icon);

				// Update the button's color
				if (isChecked) {
					$button
						.removeClass('btn-default')
						.addClass('btn-' + color + ' active');
				}
				else
				{
					$button
						.removeClass('btn-' + color + ' active')
						.addClass('btn-default');
				}
			}
			function init() {
				updateDisplay();
				// Inject the icon if applicable
				if ($button.find('.state-icon').length == 0) {
					$button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
				}
			}
			$(".btn-pref .btn").click(function () {
			    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
			    // $(".tab").addClass("active"); // instead of this do the below 
			    $(this).removeClass("btn-default").addClass("btn-primary");   
			});
			init();
		});
	});
};

loginNamespace.getHtmlSuccess = function(response) {
	$('#layoutContainer').empty();
	$('#layoutContainer').append($(response)[1].outerHTML);
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
};

CommonNamespace.checkLogin = function(userName, password) {
	var data = {
			"userName" : userName,
			"password" : password
	};
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
    			CommonNamespace.changeHref("#instruction");
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
