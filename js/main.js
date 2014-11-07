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
			 
		 //add filter menu:
		 $("#flickrfeedContent").append("<button id='filterMenuButton' class='button'>Filter</button>");
		 $("#flickrfeedContent").append("<header id='activeFilters'><p>Filters:</p></header>");

		 $("#flickrfeedContent").append("<header id='filterMenu' class='flickrTags'></header>");
		 
		 
		 
		 $("#filterMenuButton").click(function(){
			 $("#filterMenu").toggle();
		 });
		 
		 
		 
		 
		 
 		//iterate over jsonFlickrFeed JSON object and show the feed
				 
 		 var feedItem;
		 
		 //add each feed item:
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
		 }//end for



		 
  		//find the tags for a filter:
  		var s = $('#flickrfeed >.flickrFeedItem');	// s is an array of feed items
		
 		var mytags = "";
 		s.each(function(){mytags += " " + $(this).attr("data-tags")});	//grab all tags as string (seperated by spaces)
				
 		var tagsArr = mytags.trim().split(/\s+/);	//clean up the string and make into an array of tags
		
 		var tagHead = $("#filterMenu");

 		for (tagIndx in tagsArr) {
			
 			var tagButton = $("<button class='button tagfilter'>"+ tagsArr[tagIndx] + "</button>");
			
 			tagHead.append(tagButton);
			
 		}
		
		
		
		
		
		
 		$(".tagfilter").click(function(){
						
 		theFilterText = $(this).text();
		
		var newFilter = $("<div class='filter-container'> </div>");
		newFilter.append($("<span class='filter-text'>" + theFilterText + "</span>"));
		newFilter.append($("<span class='button filter-close-x'>x</span>"));
		
		// generated html looks like:
		//
		// <div class="filter-container">
		// 	<span class="filter-text">
		// 		nikon (e.g.)
		// 	</span>
		
		// 	<span class="filter-close-x">
		// 		x
		// 	</span>
		// </div>
		

		
		$("#activeFilters").append(newFilter);
		
		$(".filter-close-x").click(function(){
			$(this).parent().remove();
		});
		
		
 		performFilter(theFilterText);
		
		 
 	});
	

	
	
	performFilter("mountain"); //test initial filter

	
	
	 function performFilter(theFilterText){
	
	 	var s = $('#flickrfeed >.flickrFeedItem');
	 	s.each(function(){		
	
	 	if ($(this).attr("data-tags").match(theFilterText)) {
	 		// $(this) -> selected by filter
	 		$(this).show();	
	 		}
	 	else {
	 		//	$(this) -> not selected by filter		
	 		$(this).hide();
	 	}
	 	});
	 }
	

	}); //end click handler for "GET FLICKR FEED"
		 



});