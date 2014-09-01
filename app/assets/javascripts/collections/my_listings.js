AirNZG.Collections.MyListings = Backbone.Collection.extend({
	url: "/api/my_listings",
  model: AirNZG.Models.Listing
});
