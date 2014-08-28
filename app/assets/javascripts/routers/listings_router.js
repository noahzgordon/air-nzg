AirNZG.Routers.Listings = Backbone.Router.extend({
	
	routes: {
		"listings/:id": "listingShow"
	},
	
	listingShow: function(id) {
		var listing = new AirNZG.Models.Listing({ id: id });
		listing.fetch();
		
		var showView = new AirNZG.Views.ListingShow({
			model: listing
		});
		
		this._swapView(showView);
	},
	
	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view
		
		$("main").html(view.render().$el)
	}

});
