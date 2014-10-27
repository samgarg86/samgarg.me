function search(){
	this.init = function(){
		if(typeof(Storage)==="undefined"){
			return {
				error: true,
				message: 'Your browser does not support HTML5 storage, no search available.'
			}
		}

		if(localStorage.getItem("searchQueries") === null){
			localStorage.searchQueries = '';
		}

		return {
			error: false,
			message: ''
		}
	};

	this.saveSearchQuery = function(query){
		if(localStorage.searchQueries.length === 0){
			localStorage.searchQueries = query;
		}
		else if(localStorage.searchQueries.indexOf(query) === -1){
			localStorage.searchQueries = localStorage.searchQueries + '^' + query;			
		}
	};

	this.autocomplete = function(elementId){
	    $( "#" + elementId).autocomplete({
	    	source: localStorage.searchQueries.split('^')
	    });	
	};
}