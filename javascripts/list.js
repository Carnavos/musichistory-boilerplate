var listLink = document.getElementById("link-list");
var listView = document.getElementById("list-view");

listLink.addEventListener("click", function(event) {
	// using "event" as a parameter in the function allows you to call preventDefault()!
  event.preventDefault();
  addView.classList.add("hidden");

  listView.classList.add("visible");
  listView.classList.remove("hidden");
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
var songsData;
var songsData2;

function songsLoad(callback) {
	var songsRequest = new XMLHttpRequest();
	songsRequest.open("GET", "songlist.json");
	songsRequest.send();

	songsRequest.addEventListener("load", function(){
		console.log("songs load log");
		songsData = JSON.parse(this.responseText).songs;
		callback();
	});
};

function songsLoad2(callback) {
	var songsRequest2 = new XMLHttpRequest();
	songsRequest2.open("GET", "songlist2.json");
	songsRequest2.send();

	songsRequest2.addEventListener("load", function(){
		console.log("songs 2 load log");
		songsData2 = JSON.parse(this.responseText).songs;
		callback();
	});
};

// container filler variable
var songsContent = '';
var songsContent2 = '';

// First DOM Populate Function (called as argument to songsLoad) 
function firstPopulate() {
	console.log("firstPopulate Run");
	for (var i = 0; i < songsData.length; i++) {
		var currentSong = songsData[i];
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

	listView.innerHTML = songsContent;
	// Add to page
	// Add events with "more" button
	addEvents();
};

// Run
songsLoad(firstPopulate);

// Second Populate only as an event
function secondPopulate() {
	console.log("secondPopulate Run");
	for (var i = 0; i < songsData2.length; i++) {
		var currentSong = songsData2[i];
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
	listView.innerHTML += songsContent2;

	// Add events
	addEvents();
	
};

function addEvents() {
	// Delete buttons section
	var deleteButtons = document.querySelectorAll(".deleteButton");
	console.log("deleteButtons: ", deleteButtons);
	for (var i = 0; i < deleteButtons.length; i++) {
		var currentButton = deleteButtons[i];
		currentButton.addEventListener("click", function(event){
			console.log("delete attempt");
			console.log("event.target.parentNode: ", event.target.parentNode);
			event.target.parentNode.remove();
		}); 	
	};

	// More button section
	var moreButton = document.getElementById('moreButton');
	if (moreButton) { // Only works if More button still on page
		moreButton.addEventListener("click", function(event){
			songsLoad2(secondPopulate);
			moreButton.remove();
		});
	}
}; 

// 	Part One

// Read from local JSON file with an XHR.
// Loop over results and inject into Music History list view.
// Add delete button DOM to each row and, when it is clicked, delete the entire row in the DOM.

// Part Two

// Take your music and split it into two JSON file instead of them all living on one file.
// Add a button at the bottom of your music list and label it "More >".
// Load the songs from the first list and inject the DOM into the document as you've already done.
// When the user clicks that button, load the songs from the second JSON file and append them to the bottom of the existing music, but before the More button.