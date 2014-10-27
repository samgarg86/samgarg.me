var utils = function(){}

// static function to generate jsonp url to route through json.jit.su
utils.httpGetJsonpUrl = function(url){
	return "http://jsonp.jit.su/?callback=?&url=" + encodeURIComponent(url);
};