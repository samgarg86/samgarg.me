$(function() {
	// Render data using mustache template
	function renderObjects(data){
		var template = $('#objectTemplate').html();
		var html = Mustache.to_html(template, data);
	    $('#objects').html(html);
	    $('body').removeClass("loading");
    }

    // Update progress bar
    function progress(percent){
    	$('progress').val(percent);
    }

    // start search
    function menuClick(menuItem){
    	$(".handler#handler-left").attr('checked', false); 
	    $('body').addClass("loading");
	    $('#menu ul li a').removeClass('active');
	    menuItem.addClass('active');
	    $('#objects').empty();

    }

    // click events
	var objs = new objectSearch(progress, renderObjects);
	$('#all').click(function(){
		menuClick($(this));
    	objs.topMakelaarsOverall(20);
    	return false;
	});
	$('#sold').click(function(){
	    menuClick($(this));
    	objs.topMakelaarsWhoSoldObjects(20);
    	return false;
	});
	$('#garden').click(function(){
	    menuClick($(this));
    	objs.topMakelaarsWithObjectsWithGardens(20);
    	return false;
	});

	// start
	$('body').addClass("loading");
	objs.topMakelaarsOverall(20, false);
});