'use strict';

$(document).ready(() => {

	let listLink = $("#link-list");
	let listView = $("#list-view");

	$(listLink).click(function(event) {
		// using "event" as a parameter in the function allows you to call preventDefault()!
	  event.preventDefault();
	  $(addView).addClass("hidden");

	  $(listView).addClass("visible");
	  $(listView).removeClass("hidden");
	});

	let addLink = $("#link-add");
	let addView = $("#add-view");

	// DOM element variables
	let songInput = $("#songInput");
	let artistInput = $("#artistInput");
	let albumInput = $("#albumInput");
	let addButton = $("#addButton");


	$(addLink).click(function() {
	  $(listView).addClass("hidden");

	  $(addView).addClass("visible");
	  $(addView).removeClass("hidden");

	});

	// Refactored songsLoad to take url argument, only need one now
	function songsLoad(callback) {
		$.ajax({
			url: "songlist.json"
		}).done((data) =>{
			// passes array one level deep to callback
			let songsData = data.songs;
			callback(songsData);
		});
	};

	// First DOM Populate Function (called as argument to songsLoad) 
	function pagePopulate(parsedData) {
		console.log("pagePopulate Run");
		let songsContent = '';
		for (let i = 0; i < parsedData.length; i++) {
			let currentSong = parsedData[i];
			console.log("currentSong: ", currentSong);

			songsContent += `<div class="row">`; // Open row

			songsContent += `<div class="col-sm-3">Song Name: ${currentSong.name}</div>`;
			songsContent += `<div class="col-sm-3">Artist: ${currentSong.artist}</div>`;
			songsContent += `<div class="col-sm-3">Album: ${currentSong.album}</div>`;

			// Delete button
			songsContent += `<button class="btn btn-default deleteButton col-sm-1" type="button">Delete</button>`;
			
			songsContent += `</div>`; // Close row

		};

		// More button
		// songsContent += `<button class="btn btn-default" id="moreButton" type="button">More >>></button>`;

		$(listView).append(songsContent);
		// Add to page
		// Add events with "more" button
		addEvents();
	};

	// Run
	songsLoad(pagePopulate);

	// Second Populate only as an event
	// function secondPopulate(parsedData) {
	// 	console.log("secondPopulate Run");
	// 	let songsContent2 = '';
	// 	for (let i = 0; i < parsedData.length; i++) {
	// 		let currentSong = parsedData[i];
	// 		console.log("currentSong: ", currentSong);

	// 		songsContent2 += `<div class="row">`; // Open row

	// 		songsContent2 += `<div class="col-sm-3">Song Name: ${currentSong.name}</div>`;
	// 		songsContent2 += `<div class="col-sm-3">Artist: ${currentSong.artist}</div>`;
	// 		songsContent2 += `<div class="col-sm-3">Album: ${currentSong.album}</div>`;

	// 		// Delete button
	// 		songsContent2 += `<button class="btn btn-default deleteButton col-sm-1" type="button">Delete</button>`;
			
	// 		songsContent2 += `</div>`; // Close row

	// 	};

	// 	// Add to page
	// 	$(listView).append(songsContent2);

	// 	// Add events
	// 	addEvents();
		
	// };

	function addEvents() {
		// Delete Button class event handler
		$(document).on('click', '.deleteButton', function() {
			this.parentNode.remove(); // target parent node via this
		});

		// // Refactored More Button
		// $('#moreButton').click(function() {
		// 		songsLoad(secondPopulate, "songlist2.json");
		// 		this.remove();
		// });

	};
// end jQuery document ready function	
}); 

