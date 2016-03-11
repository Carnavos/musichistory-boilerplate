'use strict';

function Authenticate (callback) {

	let $formLogin = $('#login-form');
	let $formLost = $('#lost-form');
	let $formRegister = $('#register-form');
	let $divForms = $('#div-forms');
	let $modalAnimateTime = 300;
	let $msgAnimateTime = 150;
	let $msgShowTime = 2000;

	$("form").submit(function () {
	    switch(this.id) {
	        case "login-form":
	            let loginEmail = $('#login_email').val();
	            let loginPassword = $('#login_password').val();
	            if (loginEmail === "ERROR") {
	                msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
	            } else {
	                msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
	                // Log in user after successful email/pw validation
	                logIn(loginEmail, loginPassword);
	            }
	            return false;
	            break;
	        case "lost-form":
	            let $ls_email = $('#lost_email').val();
	            if ($ls_email === "ERROR") {
	                msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
	            } else {
	                msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
	            }
	            return false;
	            break;
	        case "register-form":
	            let registerUsername = $('#register_username').val();
	            let registerEmail = $('#register_email').val();
	            let registerPassword = $('#register_password').val();
	            if (registerUsername === "ERROR") {
	                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
	            } else {
	                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
	                // User Creation after validation (will log them in afterwards)
	                userCreate(registerEmail, registerPassword);
	            }
	            return false;
	            break;
	        default:
	            return false;
	    }
	    return false;
	});

	$('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister); });
	$('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
	$('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
	$('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
	$('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
	$('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });

	function modalAnimate ($oldForm, $newForm) {
	    let $oldH = $oldForm.height();
	    let $newH = $newForm.height();
	    $divForms.css("height",$oldH);
	    $oldForm.fadeToggle($modalAnimateTime, function(){
	        $divForms.animate({height: $newH}, $modalAnimateTime, function(){
	            $newForm.fadeToggle($modalAnimateTime);
	        });
	    });
	}

	function msgFade ($msgId, $msgText) {
	    $msgId.fadeOut($msgAnimateTime, function() {
	        $(this).text($msgText).fadeIn($msgAnimateTime);
	    });
	}

	function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
	    let $msgOld = $divTag.text();
	    msgFade($textTag, $msgText);
	    $divTag.addClass($divClass);
	    $iconTag.removeClass("glyphicon-chevron-right");
	    $iconTag.addClass($iconClass + " " + $divClass);
	    setTimeout(function() {
	        msgFade($textTag, $msgOld);
	        $divTag.removeClass($divClass);
	        $iconTag.addClass("glyphicon-chevron-right");
	        $iconTag.removeClass($iconClass + " " + $divClass);
		}, $msgShowTime);
	}


	// AUTHENTICATION 

	// Declare variable for Firebase database
	let myFirebase = new Firebase("https://burning-heat-2902.firebaseio.com/");


	function userCreate (userEmail, userPassword) {
		console.log(`userCreate init`);
		console.log(`userEmail: `, userEmail);
		console.log(`userPassword: `, userPassword);

		myFirebase.createUser({
		  email    : userEmail,
		  password : userPassword
		}, function(error, userData) {
		  if (error) {
		    console.log("Error creating user:", error);
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);
				// Automatically sign user in upon account creation
				logIn(userEmail, userPassword);
		  }
		});

	}

	$("#signOut").click(() => {
		signOut();
	});

	function signOut () {
		myFirebase.unauth();
		console.log(`Log Out Successful`);
    $("#signOut").hide();
    $("#logIn").show();
	}

	// Authentication event listener, always checking for authentication and will log message when user logs in/out and times out
	myFirebase.onAuth(function(authData) {
	  if (authData) {
	    console.log("Authenticated with uid:", authData.uid);
	    // callback argument passed via larger Authenticate function
    	$("#signOut").show();
	    $("#logIn").hide();
	    callback();
	  } else {
	    console.log("Client unauthenticated.");
	    // Toggle modal when user unathenticated/no log-in
	    $("#login-modal").modal();
	  }
	});

	function logIn (userEmail, userPassword) {
		myFirebase.authWithPassword({
		  email    : userEmail,
		  password : userPassword
		}, function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		    // toggle modal out
		    $("#login-modal").modal('hide');
        $("#logIn").hide();
		  }
		});
	}

} // End Authenticate

module.exports = Authenticate;