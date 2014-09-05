AirNZG.Collections.Listings = Backbone.Collection.extend({
	url: "/api/listings",
  model: AirNZG.Models.Listing,
	
	parse: function(request) {
		console.log(request)
		this._params = request["params"];
		
		return request["listings"];
	},
	
	params: function() {
		if (this._params) {
			return this._params;
		} else {
			return {};
		}
	}
});
