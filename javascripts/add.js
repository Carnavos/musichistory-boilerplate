var addLink = $("#link-add");
var addView = $("#add-view");

// DOM element variables
var songInput = $("#songInput");
var artistInput = $("#artistInput");
var albumInput = $("#albumInput");
var addButton = $("#addButton");


$(addLink).click(function() {
  $(listView).addClass("hidden");

  $(addView).addClass("visible");
  $(addView).removeClass("hidden");

});