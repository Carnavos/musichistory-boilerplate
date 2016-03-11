'use strict';
// List View
let listLink = $("#link-list");
let listView = $("#list-view");

$(listLink).click(function(event) {
	// using "event" as a parameter in the function allows you to call preventDefault()!
  event.preventDefault();
  $(addView).addClass("hidden");

  $(listView).addClass("visible");
  $(listView).removeClass("hidden");
});


// Add View
let addLink = $("#link-add");
let addView = $("#add-view");

$(addLink).click(function(event) {
  event.preventDefault();
  $(listView).addClass("hidden");

  $(addView).addClass("visible");
  $(addView).removeClass("hidden");

});

// Add button switches view back to List
$("#addButton").click(() => {
	$(addView).addClass("hidden");
		$(listView).addClass("visible");
		$(listView).removeClass("hidden");
	});



