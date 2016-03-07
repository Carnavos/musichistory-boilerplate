(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

let songsData = [];

let loader = {

	songsLoad(callback) {
		$.ajax({
			url: "songlist.json"
		}).done((data) =>{
			// passes array one level deep to callback
			songsData = data.songs;
			// ES6 arrow function to repeat loader for every song in the parsed data
			callback(songsData);
		});
	},

	getSongs() {
		return songsData;
	},

	addSong(song) {
		songsData.push(song);
		console.log("songsData: ", songsData);
	},

	// Map/remake songsData private array without deleted song
	deleteSong(songName) {
		// use ES6 filter/arrow to pass back only those that don't match with deleted song name
		songsData = songsData.filter((song) => song.name !== songName);
		console.log("songsData: ", songsData);
		console.log("song deleted");
	}
}

// export the object with three methods inside
module.exports = loader;
},{}],2:[function(require,module,exports){
'use strict';

$(document).ready(() => {

	// import views handler module
	let views = require("./views");

	// DOM element variables
	let songInput = $("#songInput");
	let artistInput = $("#artistInput");
	let albumInput = $("#albumInput");
	let addButton = $("#addButton");

	// Bring in the loader module
	let loader = require('./load');

	// individual page populator used as callback for each song in loader
	function pagePopulate(songArray) {
		console.log("pagePopulate Run");
		songArray.forEach((song) => {
			let songContent = '';

			songContent += `<div class="row">` + // Open row
												`<div class="col-sm-3 songName">${song.name}</div>` +
												`<div class="col-sm-3 songArtist">${song.artist}</div>` +
												`<div class="col-sm-3 songAlbum">${song.album}</div>` +
												`<div class="col-sm-1 songAlbum">${song.year}</div>` +
												// Delete Button
												`<button class="btn btn-default deleteButton col-sm-1" type="button">Delete</button>` +
											`</div>`; // Close row

			// Add to page
			$("#list-view").append(songContent);
		});

		// Add events to page
		addEvents();
	};

	// function addSong

	function addEvents() {
		// Delete Button class event handler
		$(document).on('click', '.deleteButton', function() {
			$(this).parent().remove(); // target parent node via this
			let deleteName = $(this).siblings('.songName').html();
			console.log("deleteName: ", deleteName);
			loader.deleteSong(deleteName);
		});
	};

	// initial loader module with callback
	loader.songsLoad(pagePopulate);

// end jQuery document ready function	
}); 


},{"./load":1,"./views":3}],3:[function(require,module,exports){
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

},{}]},{},[2])


//# sourceMappingURL=bundle.js.map
