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