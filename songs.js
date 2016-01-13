var songElement = document.getElementById("song");
var songContent = songElement.innerHTML;
console.log(songContent);

var songs = [];

songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";

// Each student must add one song to the beginning and the end of the array.
songs.push("Can You Take Me Higher > by Creed"); //End
songs.unshift("My Own Prison > by Creed"); // Beginning

// Log current array
console.log(songs);

for (var i = 0; i < songs.length; i++) {
	// Loop over the array and remove any words or characters that obviously don't belong.
	songs[i] = songs[i].replace(/>/g, "-").replace(/!/g, "").replace(/\*/g, "").replace(/\(/g, "").replace(/@/g, "");
	// Students must find and replace the > character in each item with a - character.
	// Test log the replacement
	console.log("fixed: ", songs[i]);
	songContent += "<p>" + songs[i] + "</p>";
	// console.log(songContent);
};

console.log(songContent);

songElement.innerHTML = songContent;
// Must add each string to the DOM in index.html in the main content area.
