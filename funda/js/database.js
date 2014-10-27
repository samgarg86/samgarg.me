var database = function(){
	this.objects = [];
	this.totalPages = 0;
	this.currentPage = 0;
	var me = this;

	// public function to populate local database with property data
	this.fill = function(url, startPage, progress, success){
		for(var page=startPage; page<=me.totalPages; page++){
			var pageUrl = url.replace('{page}', page);
		    pageUrl = utils.httpGetJsonpUrl(pageUrl);
			$.getJSON(pageUrl)
				.always(function(){
					me.currentPage++;
					progress(me.currentPage/me.totalPages * 100);
					//When database is populated by data from all pages, call success callback
					if(me.currentPage >= me.totalPages){
						success(me);
					}
				})
				.done(function(data){
					me.objects = me.objects.concat(data.Objects);
					console.log( "Successfully processed page " + me.currentPage);
				})
				.fail(function(jqxhr, textStatus, error ) {
					var err = textStatus + ', ' + error;
					console.log( "Request to fetch objects failed: " + err);
				})
		}
	};
};