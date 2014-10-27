var objects = function (gardenFilter){

	//private function to populate local database with property data
	// var populateDatabase = function(database, url, startPage, success){

	// 		$.getJSON(url)
	// 		.done(function(data){
	// 			database.objects = data.Objects;
	// 			success(database);
	// 		})
	// 		.fail(function( jqxhr, textStatus, error ) {
	// 			var err = textStatus + ', ' + error;
	// 			console.log( "Request to fetch objects failed: " + err);
	// 		});
	// };

	// this.RetrieveObjectsInAmsterdam = function(gardenFilter, success){
	// 	var url = gardenFilter? config.apiUrl.objectsInAmsterdamWithGarden: config.apiUrl.objectsInAmsterdam;

	//  	$.getJSON(url)
	//  	.done(function(data){
	//         var objectDatabase = new database();
	// 		objectDatabase.objects = objectDatabase.objects.concat(data.Objects);
	// 		objectDatabase.totalPages = data.Paging.AantalPaginas;
	// 		objectDatabase.currentPage = data.Paging.HuidigePagina;
	// 		success(objectDatabase);
	// 	})
	// 	.fail(function( jqxhr, textStatus, error ) {
	// 		var err = textStatus + ', ' + error;
	// 		console.log( "Request to fetch objects failed: " + err);
	// 	});
	// };


	//private function to populate local database with property data
	var populateDatabase = function(database, url, startPage, progress, success){
		for(var page=startPage; page<=database.totalPages; page++){
			var pageUrl = url.replace('{page}', page);
		    pageUrl = httpGetJsonpUrl(pageUrl);
			$.getJSON(pageUrl)
				.always(function(){
					database.currentPage++;
					//When database is populated by data from all pages, call success callback
					if(database.currentPage >= database.totalPages){
						success(database);
					}
				})
				.done(function(data){
					database.objects = database.objects.concat(data.Objects);
					console.log( "Successfully processed page " + database.currentPage);				
					progress(database.currentPage/database.totalPages * 100);
				})
				.fail(function( jqxhr, textStatus, error ) {
					var err = textStatus + ', ' + error;
					console.log( "Request to fetch objects failed: " + err);
				})
		}
	};

		//public function to get properties in amsterdam
	var retrieveObjectsInAmsterdam = function(gardenFilter, progress, success){
		var url = gardenFilter? config.apiUrl.objectsInAmsterdamWithGarden
					: config.apiUrl.objectsInAmsterdam;
		var page1Url = url.replace('{page}', 1);
		page1Url = httpGetJsonpUrl(page1Url);

		$.getJSON(page1Url)
		.done(function(data){
			var objectDatabase = new database();
			objectDatabase.objects = objectDatabase.objects.concat(data.Objects);
			objectDatabase.totalPages = data.Paging.AantalPaginas;
			// objectDatabase.totalPages = 5;
			objectDatabase.currentPage = data.Paging.HuidigePagina;
			progress(1/objectDatabase.totalPages);
			populateDatabase(objectDatabase, url, 2, progress, success);
		})
		.fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ', ' + error;
			console.log( "Request to fetch objects failed: " + err);
		});
	};
    
    //private function to generate jsonp url to route through json.jit.su
	var httpGetJsonpUrl = function(url){
		return "http://jsonp.jit.su/?callback=?&url=" + encodeURIComponent(url);
    };

    //public function to get agent data with maximum properties
	this.topAgentsInAmsterdam = function(numberOfAgents, gardenFilter, progress, success){
		
		retrieveObjectsInAmsterdam(gardenFilter, progress, function(objsData){
			//Group data by agentId
			var groupedByAgents = _.groupBy(objsData.objects, function(object){return object.MakelaarId});
			var arrayList = [];

			//Convert key-value pair to array to be able to use _.sortBy
			$.each(groupedByAgents, function(key, value)
			{
				arrayList.push({agentId: key, agentName: value[0].MakelaarNaam, objects: value});
			});

			//sort data by number of properties per agent
			var sortedList = _.sortBy(arrayList, function(agents){ return -agents.objects.length; });

			//Take first x number of results
			success({agents: _.first(sortedList, numberOfAgents)});
		});
	};





};