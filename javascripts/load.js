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