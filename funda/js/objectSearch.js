var objectSearch = function (progress, render){

    //private function to fetch properties
	var retrieveObjectsInAmsterdam = function(url, success){
		var page1Url = url.replace('{page}', 1);
		page1Url = utils.httpGetJsonpUrl(page1Url);

		$.getJSON(page1Url)
		.done(function(data){
			var objectDatabase = new database();
			objectDatabase.objects = objectDatabase.objects.concat(data.Objects);
			objectDatabase.totalPages = data.Paging.AantalPaginas;
			// objectDatabase.totalPages = 2;
			objectDatabase.currentPage = data.Paging.HuidigePagina;
			progress(1/objectDatabase.totalPages * 100);
			objectDatabase.fill(url, 2, progress, success);
		})
		.fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ', ' + error;
			console.log( "Request to fetch objects failed: " + err);
		});
	};

    //private function to get makelaar data with maximum objects
	var topAgents = function(numberOfAgents, url){
		retrieveObjectsInAmsterdam(url, function(objsData){
			//Group data by agentId
			var groupedByAgents = _.groupBy(objsData.objects, function(object){return object.MakelaarId});
			var arrayList = [];

			//Convert key-value pair to array to be able to use _.sortBy
			$.each(groupedByAgents, function(key, value)
			{

				var makelaarNaam = value[0].MakelaarNaam ? value[0].MakelaarNaam : "";
				makelaarNaam = makelaarNaam.length <= 18 ? makelaarNaam : makelaarNaam.substring(0,18) + '..';

				arrayList.push({agentId: key, agentName: makelaarNaam, objects: value});
			});

			//sort data by number of properties per agent
			var sortedList = _.sortBy(arrayList, function(agents){ return -agents.objects.length; });

			//Take first x number of results
			render({agents: _.first(sortedList, numberOfAgents)});
		});
	};	

	// public search functions
	this.topMakelaarsWhoSoldObjects = function(numberOfAgents){
		topAgents(numberOfAgents, config.apiUrl.soldObjectsInAmstelveen);
	}
	this.topMakelaarsWithObjectsWithGardens = function(numberOfAgents){
		topAgents(numberOfAgents, config.apiUrl.objectsInAmstelveenWithGarden);
	}
    this.topMakelaarsOverall = function(numberOfAgents){
		topAgents(numberOfAgents, config.apiUrl.objectsInAmstelveen);
	}
};