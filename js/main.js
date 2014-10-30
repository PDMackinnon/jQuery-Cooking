$(function(){
	
	
	//make the tab buttons show and hide divs as required:
	
	$(".tab-button").click(function(){
		$(".tab-button").removeClass("tab-button-selected"); //remove from all - no buttons selectd
		$(this).addClass("tab-button-selected");				//add to this - just this button selected
		
		//deal with tab button 1 case
		if ($(this).attr('id') == "tab-button1") {
			
			$('#panel1').show("slow");	//did click on tab 1 so show it...
		} 
		else
		{
			$('#panel1').hide("slow"); // did not click on tab 1 - so hide it
		}
		
		
		//deal with tab button 2 case
		if ($(this).attr('id') == "tab-button2") {
			
			$('#article2').show("slow");	//did click on tab 2 so show it
		} 
		else
		{
			$('#article2').hide(1200);	// did not click on tab 2 - so hide it
		}
		
		
		//deal with tab button 3 case
		if ($(this).attr('id') == "tab-button3") {
			
			$('#flickrfeed').show("fast");	//did click on tab 3 so show it
		} 
		else
		{
			$('#flickrfeed').hide("fast");	// did not click on tab 3 - so hide it
		}
		
		
		
	});
	

	
	// make the "+" button do something:
	$("#plus").click(function(){
		
		$(".del").hide();  // make sure edit mode is off....
		
		
		//new version here animates with slideDown() so we see now content arrive
		//note that css of the class .thing is initially display:none for this to work

			var container=$("<div class='thing'></div>");
			
			var nameInput = $("#panel1Input").val();
		
			container.append("<p><button class='button del'> x </button> hello there! " + nameInput+"</p>");

			container.appendTo($("#panel1")).slideDown(300);

		// version below just appends the new div... no animation:
		
		// $("#panel1").append(function(){
		//
		// 	var container=$("<div class='thing'></div>");
		//
		// 	var nameInput = $("#panel1Input").val();
		//
		// 	container.append("<p><button class='button del'> x </button> hello there! " + nameInput+"</p>");
		// 	return container;
		// });
		
	});
	
	
	
	//make the edit button do somethig - enter edit mode:
	$("#edit").click(function(){
		$(".del").toggle();
		
		$(".del").click(function(){
						
			//delete this entry
		//	$(this).parent().parent().remove();  //parent is <p> then grand-parent is <div class="thing">
			
			$(this).parent().parent().slideUp(400,function(){this.remove()});  //parent is <p> then grand-parent is <div class="thing">
																				// callback removes this
			
		});	
	});
	
	$("#flickrGet").click(function(){
		
		//iterate over jsonFlickrFeed JSON object and show the feed
				 
		 var feedItem;
		 
		 var allTags = "";
		 for (feedItem in jsonFlickrFeed.items) {
			 allTags += jsonFlickrFeed.items[feedItem].tags;
		 }
		$("#flickrfeed").append("<header class='flickrTags'>" + allTags +"</header>");
		 
		 
		 for (feedItem in jsonFlickrFeed.items) {
			 		 	
			 var container = $("<div class='flickrFeedItem'></div>");
			 
			 container.attr("data-title",jsonFlickrFeed.items[feedItem].title);
			 container.attr("data-tags",jsonFlickrFeed.items[feedItem].tags);
			 container.attr("data-author_id",jsonFlickrFeed.items[feedItem].author_id);
			 
			 container.append(jsonFlickrFeed.items[feedItem].description);
			 
			 
			 if(jsonFlickrFeed.items[feedItem].tags != "") {
			 var tags = $("<footer class='flickrTags'></footer>");
			 tags.append(jsonFlickrFeed.items[feedItem].tags);
			 container.append(tags);
		 }
			 
			 $("#flickrfeed").append(container);
		 }
		 
		 
		 //TODO:
		 //prepend the tags for filter funcgion:
		 
 		//find the tags for a filter:
 		var s = $('#flickrfeed >.flickrFeedItem');
		
		var mytags = "";
		s.each(function(){mytags += $(this).attr("data-tags")});
		var tagsArr = mytags.split(" ");
		
		//turn each tag into a small button to perfom filter such as :-
		
		s.each(function(){		
		//filter test for "mountain"
		
		if ($(this).attr("data-tags").match("mountain")) {
			// $(this) -> selected by filter
			$(this).show();	
			}
		else {
			//	$(this) -> not selected by filter		
			$(this).hide();
		}
		});
		 
	});
	
	
		
	
});
