$(function(){
	var g = new geo();
	var currLoc = new google.maps.LatLng(52.378878, 4.900477);
	var directionsDisplay = new google.maps.DirectionsRenderer();

	var displayMap = function(position){
		var mapOptions = {
		    zoom: 14,
		    center: currLoc
		};

		var map = new google.maps.Map(document.getElementById("map"), mapOptions);
		directionsDisplay.setMap(map);
		var marker = new google.maps.Marker({
		    position: currLoc,
		    map: map,
		    animation: google.maps.Animation.DROP,
		    title: "Current Location"
		});
	}

	var render = function (result, status){
		if (status == google.maps.DirectionsStatus.OK) {
			var parsedDistance = g.parseDistance(result);
			$('#txtDistance').text(parsedDistance.distance + " in " + parsedDistance.duration);
	    	directionsDisplay.setDirections(result);
	    }
	    else{
			$('#txtDistance').text('Destination address not found or there is no possible route to this destination.');
		}

		$('body').removeClass("loading"); 
	};

	g.getCurrentLocation(function(position){
		currLoc = position;
		displayMap(currLoc);
	}, 
	function(error){
		alert(error + " Lets assume you live at the Amsterdam Centraal Station.");
		displayMap(currLoc);
	});

	var s = new search();
	var initStatus = s.init();
	if(initStatus.error){
		alert(initStatus.message);
	}
	else{
	    s.autocomplete('txtAddress');
	}

	$('#btnSubmit').click(function(){
		var destination = $('#txtAddress').val();
		s.saveSearchQuery(destination);
		s.autocomplete('txtAddress');
	    $('body').addClass("loading");
		g.getDistance(currLoc, destination, $("input:radio[name='mode']:checked").val(), render);

	});

	// Submit on enter
    $("#txtAddress").keyup(function(event){
	    if(event.keyCode === 13){
	        $("#btnSubmit").click();
	    }
	});	
});