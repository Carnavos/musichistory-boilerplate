(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// ADD SONG
function songAdd () {
	return new Promise((resolve, reject) => {
		
		let newSong = {
			"name": $("#songInput").val(),
			"artist": $("#artistInput").val(),
			"album": $("#albumInput").val()
		};

		// add song to Firebase
		$.ajax({
			url: "https://burning-heat-2902.firebaseio.com/songs.json",
			method: "POST",
			data: JSON.stringify(newSong)
		}).done(function(songData){
			// resolve statement with unused argument (will load anyways without specific song data)
			resolve(songData);
		});

	});

}

module.exports = songAdd;
},{}],2:[function(require,module,exports){
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
		  }
		});

		// Automatically sign user in upon account creation
		logIn(userEmail, userPassword);
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
	    	// callback();
		  }
		});
	}

} // End Authenticate

module.exports = Authenticate;
},{}],3:[function(require,module,exports){
'use strict';
},{}],4:[function(require,module,exports){
'use strict';

function songsLoad(callback) {
	return new Promise ((resolve, reject) => {
	$.ajax({
		url: "https://burning-heat-2902.firebaseio.com/songs/.json"
		// method: "GET"
	}).done((dataObject) =>{
		console.log(`songsData loaded object: `, dataObject);
		// changing to object pass instead of array
		resolve(dataObject);
	});
	// alternate method to for in
	// Object.keys(songList).forEach((key) => { });
	});
}


// export the object with three methods inside
module.exports = songsLoad;
},{}],5:[function(require,module,exports){
'use strict';

// Delete, Read, Load


// import views handler module
let views = require("./views");
let Add = require("./add");
let Delete = require("./delete");
let Authenticate = require("./authentication");

// jquery module
// let $ = require("jquery");

// DOM element variables
// let songInput = $("#songInput");
// let artistInput = $("#artistInput");
// let albumInput = $("#albumInput");
let addButton = $("#addButton");

// Bring in the loader module
let loader = require('./load');

// // Declare variable for Firebase database
// let myFirebase = new Firebase("https://burning-heat-2902.firebaseio.com/");


// function userCreate (userEmail, userPassword) {
// 	// let userEmail = $("#userEmail").val();
// 	// let userPassword = $("#userPassword").val();
// 	myFirebase.createUser({
// 	  email    : userEmail,
// 	  password : userPassword
// 	}, function(error, userData) {
// 	  if (error) {
// 	    console.log("Error creating user:", error);
// 	  } else {
// 	    console.log("Successfully created user account with uid:", userData.uid);
// 	  }
// 	});
// };

// // Authentication event listener, always checking for authentication and will log message when user logs in/out and times out
// myFirebase.onAuth(function(authData) {
//   if (authData) {
//     console.log("Authenticated with uid:", authData.uid);
//   } else {
//     console.log("Client unauthenticated.")
//     readLoad();
//   }
// });

// Runs Authenticate, then loads content
Authenticate(readLoad);

function songPopulate (id, songObject) {

	let songContent = '';

	songContent += `<div class="row">` + // Open row
										`<div class="col-sm-3 songName">${songObject.name}</div>` +
										`<div class="col-sm-3 songArtist">${songObject.artist}</div>` +
										`<div class="col-sm-3 songAlbum">${songObject.album}</div>` +
										`<div class="col-sm-1 songAlbum">${songObject.year}</div>` +
										// Delete Button (uses ${song} as a data "id" in song deletion function)
										`<button id="${id}" class="btn btn-default deleteButton col-sm-1" type="button">Delete</button>` +
									`</div>`; // Close row

	// Add to page
	$("#list-view").append(songContent);
	
}

// currently iterates over most recent songs data object and populates to page
// need to remake to only populate one at a time
function pagePopulate(songsObject) {
	console.log("pagePopulate Run");
	console.log(`songsObject: `, songsObject);
	// empty page content to default row headers before reloading database objects
	$("#list-view").html(`<div class="row">
      <div class="col-sm-3">Name</div>
      <div class="col-sm-3">Artist</div>
      <div class="col-sm-3">Album</div>
      <div class="col-sm-3">Year</div>
    </div>`);
	// for in loop to iterate over object keys
	// using bracket notation since dot notation won't allow access to property names stored in a variable
	for (let song in songsObject) {
		songPopulate(song, songsObject[song]);
	}

	// Add events to page
	addEvents();
}

// function addSong

function addEvents() {

	// DELETE SONG event handler
	$(document).on('click', '.deleteButton', function() {
		$(this).parent().remove(); // target parent node via this
		let deleteName = $(this).siblings('.songName').html();
		console.log("deleteName: ", deleteName);
		// loader.deleteSong(deleteName);

		// delete from Firebase
		let songKey = $(this).attr("id");
		$.ajax({
			url: `https://burning-heat-2902.firebaseio.com/songs/${songKey}/.json`,
			method: "DELETE"
		}).done(() => {
			console.log(`Song Deleted! Time 2 Reload! `);
		});
	});
}



function readLoad () {
	console.log(`readLoad init`);
	// initial loader promise
	loader().then(
		// success
		function(dataObject) {
			console.log(`data/promise loaded`);
			pagePopulate(dataObject);
		},

		// failure
		function(dataObject) {
			console.log(`data failure`, dataObject);
		}
	);
}

$("#addButton").click(function(){
	Add().then(
		// success
		function(songObject) {
			console.log(`data/promise loaded: `, songObject);
			// pagePopulate(dataObject);
			// after add song to database, reGET from database and repopulate page
			readLoad();
		},

		// failure
		function(songObject) {
			console.log(`data failure:`, songObject);
		}

	);

	// clear out the add fields for another song
	$("#songInput").val(``);
	$("#artistInput").val(``);
	$("#albumInput").val(``);

});

// init command, attempting authentication before page load
// readLoad();



},{"./add":1,"./authentication":2,"./delete":3,"./load":4,"./views":6}],6:[function(require,module,exports){
'use strict';
// List View
let listLink = $("#link-list");
let listView = $("#list-view");

$(listLink).click(function(event) {
	// using "event" as a parameter in the function allows you to call preventDefault()!
  event.preventDefault();
  $(addView).addClass("hidden");

  $(listView).addClass("visible");
  $(listView).removeClass("hidden");
});


// Add View
let addLink = $("#link-add");
let addView = $("#add-view");

$(addLink).click(function(event) {
  event.preventDefault();
  $(listView).addClass("hidden");

  $(addView).addClass("visible");
  $(addView).removeClass("hidden");

});

// Add button switches view back to List
$("#addButton").click(() => {
	$(addView).addClass("hidden");
		$(listView).addClass("visible");
		$(listView).removeClass("hidden");
	});




},{}]},{},[5])


//# sourceMappingURL=bundle.js.map
