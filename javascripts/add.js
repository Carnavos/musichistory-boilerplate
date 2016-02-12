var addLink = document.getElementById("link-add");
var addView = document.getElementById("add-view");

// DOM element variables
var songInput = document.getElementById("songInput");
var artistInput = document.getElementById("artistInput");
var albumInput = document.getElementById("albumInput");
var addButton = document.getElementById("addButton");


addLink.addEventListener("click", function() {
  listView.classList.add("hidden");

  addView.classList.add("visible");
  addView.classList.remove("hidden");

});