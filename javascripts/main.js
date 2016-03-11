'use strict';

// Delete, Read, Load


// import views handler module
let views = require("./views");
let Add = require("./add");
let Delete = require("./delete");
let Authenticate = require("./authentication");

let addButton = $("#addButton");

// Bring in the loader module
let loader = require('./load');

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

// runs loader promise which downloads current Firebase songs, then runs pagePopulate 
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


