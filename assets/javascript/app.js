var comedians = ["John Cleese", "Mike Myers", "Steve Martin", "Dan Aykroyd","Jimmy Fallon","Stephen Colbert", "Chris Rock", "Molly Shannon", "Tina Fey", "Bill Murray", "Will Ferrell","Alec Baldwin", "Melissa McCarthy", "Eddie Murphy"];

//construct buttons and display them on screen
function renderButtons() {
	//empty div to not have duplicates of buttons
    $(".buttons").empty();

    for (var i = 0; i < comedians.length; i++) {

        var comButton = $("<button class='btn btn-info'>");
        comButton.attr("data-name", comedians[i]);
        comButton.addClass("comedian");
        comButton.text(comedians[i]);
        $(".buttons").append(comButton);
    }
}
//run button function
renderButtons();

//click event for buttons
$(document).on("click", ".comedian", function(){
	//prevents the page to reload when enter is pressed
	event.preventDefault();

	//clear gifs div to only have one set of gifs displayed
	$(".gifs").html("");
	var comedian = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comedian + "&limit=10&rating=pg-13&api_key=dc6zaTOxFJmzC";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);
		for (var i=0; i < 10; i++) {
			var giphyDiv = $("<div class='display'>");
			var giphy = $("<img>");
			giphy.addClass("giphy");
			giphy.attr("src", response.data[i].images.fixed_height_still.url);
			giphy.attr("data-state", "still");
			giphy.attr("data-still", response.data[i].images.fixed_height_still.url);
			giphy.attr("data-animate", response.data[i].images.fixed_height.url);
			giphy.attr("alt", $(this).attr("data-name"));
			rating = $("<p>").text(response.data[i].rating);
			giphyDiv.append(rating);
			giphyDiv.append(giphy);
			$(".gifs").prepend(giphyDiv);		}
	})
});
//click evvent that changes animation state
$(document).on("click", ".giphy", function(){
	var state = $(this).attr("data-state");
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else{
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});

//click event that adds new button after user input
$("#add-comedian").on("click", function(){
	event.preventDefault();
	var newComedian = $("#movie-input").val().trim();
	if (newComedian === "") {
		alert("Please choose a comedian!");
	}else {
	comedians.push(newComedian);
	$("#movie-input").val("");
	renderButtons();
}
});
