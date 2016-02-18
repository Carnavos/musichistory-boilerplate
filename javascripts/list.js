$(document).ready(function(){

	var listLink = $("#link-list");
	var listView = $("#list-view");

	$(listLink).click(function(event) {
		// using "event" as a parameter in the function allows you to call preventDefault()!
	  event.preventDefault();
	  $(addView).addClass("hidden");

	  $(listView).addClass("visible");
	  $(listView).removeClass("hidden");
	});

	// In the navigation bar, make sure you have two links labeled "List Music", and "Add Music".
	// Add a DOM element that contains some input fields for the user to enter in the name of a song, 
		// the artist for the song, and the album. You do not need to enclose them in a <form> element because we're not actually submitting this form anywhere.
	// Add a <button> element at the bottom of the input fields labeled "Add".
	// The input fields and the add button make up the Add Music View.
	// The existing view - the combination of the filter form and the song list - will be referred to as the List Music View.
	// The Add Music View should not appear when the user first visits your page. 
		// The song list with the corresponding filter form should be visible.
	// When the user clicks on "Add Music" in the navigation bar, the List Music View should be hidden, 
		// and the Add Music View should be shown (see example wireframe).
	// When the user clicks on "List Music" in the naviation bar, the Add Music View should be hidden, 
		// and the List Music View should be shown (see example wireframe).

	// Once the user fills out the song form and clicks the add button, you should collect all values from the input fields, 
		// add the song to your array of songs, and update the song list in the DOM.

	// Declare global (normally IIFE) data storage variable
	// var songsData;
	// var songsData2;

	// Refactored songsLoad to take url argument, only need one now
	function songsLoad(callback, url) {
		$.ajax({
			url: url
		}).done(function(data){
			// passes array one level deep to callback
			var songsData = data.songs;
			callback(songsData);
		});
	};

	// First DOM Populate Function (called as argument to songsLoad) 
	function firstPopulate(parsedData) {
		console.log("firstPopulate Run");
		var songsContent = '';
		for (var i = 0; i < parsedData.length; i++) {
			var currentSong = parsedData[i];
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
		songsContent += `<button class="btn btn-default" id="moreButton" type="button">More >>></button>`;

		$(listView).append(songsContent);
		// Add to page
		// Add events with "more" button
		addEvents();
	};

	// Run
	songsLoad(firstPopulate, "songlist.json");

	// Second Populate only as an event
	function secondPopulate(parsedData) {
		console.log("secondPopulate Run");
		var songsContent2 = '';
		for (var i = 0; i < parsedData.length; i++) {
			var currentSong = parsedData[i];
			console.log("currentSong: ", currentSong);

			songsContent2 += `<div class="row">`; // Open row

			songsContent2 += `<div class="col-sm-3">Song Name: ${currentSong.name}</div>`;
			songsContent2 += `<div class="col-sm-3">Artist: ${currentSong.artist}</div>`;
			songsContent2 += `<div class="col-sm-3">Album: ${currentSong.album}</div>`;

			// Delete button
			songsContent2 += `<button class="btn btn-default deleteButton col-sm-1" type="button">Delete</button>`;
			
			songsContent2 += `</div>`; // Close row

		};

		// Add to page
		$(listView).append(songsContent2);

		// Add events
		addEvents();
		
	};

	function addEvents() {
		// Delete Button class event handler
		$(document).on('click', '.deleteButton', function() {
			this.parentNode.remove(); // target parent node via this
		});

		// Refactored More Button
		$(document).on('click', '#moreButton', function(){
				songsLoad(secondPopulate, "songlist2.json");
				this.remove();
		});

	};
// end jQuery document ready function	
}); 

