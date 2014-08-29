AirNZG.Routers.App = Backbone.Router.extend({
	
	routes: {
		"listings/:id": "listingShow",
		"users/:id": "userShow"
	},
	
	listingShow: function(id) {
		var listing = new AirNZG.Models.Listing({ id: id });
		listing.fetch();
		
		var showView = new AirNZG.Views.ListingShow({
			model: listing
		});
		
		this._swapView(showView);
	},
	
	userShow: function(id) {
		var user = AirNZG.users.getOrFetch(id);
		
		var showView = new AirNZG.Views.UserShow({
			model: user
		});
		
		this._swapView(showView);
	},
	
	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		
		$("main").html(view.render().$el)
	}

});
