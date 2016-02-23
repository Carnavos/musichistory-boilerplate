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

