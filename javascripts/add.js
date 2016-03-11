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