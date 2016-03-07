NSS Music History Exercise: Sixth Iteration

Instructions

Now is the time to make Music History a fully functional, single page, modular, asychronous, application.

Modular with Browserify

Using Browerify, you should create several modules for the application.
One module is responsible for loading songs from a JSON file and storing them in an array. This module should expose one method for getting the entire list of songs, and one method for adding a song to the array.
One module is responsible for making the filtering form work. Therefore, it will need to use methods from the previous module.
One module is responsible for showing the two views of the app (song list and song form).


Filtering

When the user selects an artist, only songs from that artist should appear.
When the user selects an album, only songs from that album should appear.


Adding Songs

The new music form should have a field for every key on a song object. We started with just Artist, Album, and Title, but you can add more if you wish.
The music form should be fully functional. When you click the Save Song button, a new object should be added to the array of songs. The DOM should also be immediately updated with the new song added.