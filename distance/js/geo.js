function geo(){
	this.getDistance = function(origin, destination, mode, successHandle){
		var service = new google.maps.DirectionsService();
		service.route(
		  {
		    origin: origin,
		    destination: destination,
		    travelMode: mode,
		    unitSystem: google.maps.UnitSystem.METRIC,
		    durationInTraffic: false,
		    avoidHighways: false,
		    avoidTolls: false
		  }, successHandle);


	};

	this.parseDistance = function(distanceJson){
			return {
				'distance': distanceJson.routes[0].legs[0].distance.text,
				'duration': distanceJson.routes[0].legs[0].duration.text,
				'error': false
			}

	};

	this.getCurrentLocation = function(callback, errorHandler){
		if (navigator.geolocation)
		    {
				navigator.geolocation.getCurrentPosition(function(position){
					callback(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
		        },
		        function(error){
			        switch(error.code) 
	    			{
					    case error.PERMISSION_DENIED:
					      errorHandler("User denied the request for Geolocation.");
					      break;
					    case error.POSITION_UNAVAILABLE:
					      errorHandler("Location information is unavailable.");
					      break;
					    case error.TIMEOUT:
					      errorHandler("The request to get user location timed out.");
					      break;
					    case error.UNKNOWN_ERROR:
					      errorHandler("An unknown error occurred.");
					      break;
					}
		        });
			}
	        else {
	        	alert("This app is not supported by your browser.");
	        }
	}
}