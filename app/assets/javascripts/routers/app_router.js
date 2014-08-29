AirNZG.Routers.App = Backbone.Router.extend({
	
	routes: {
		"": "root",
		"sign_in": "signIn"
		"listings?:query": "listingsIndex",
		"listings/:id": "listingShow",
		"users/:id": "userShow"
	},
	
	root: function() {
		var rootView = new AirNZG.Views.Root();
		this._swapView(rootView);
	},
	
	signIn: function() {
		var signInView = new AirNZG.Views.SignIn();
		this._swapView(signInView)
	},
	
	listingsIndex: function(query) {
		var listings = new AirNZG.Collections.Listings();
		listings.fetch({ data: query });
		
		var indexView = new AirNZG.Views.ListingsIndex({ collection: listings })
		this._swapView(indexView)
	},
	
	listingShow: function(id) {
		var listing = new AirNZG.Models.Listing({ id: id });
		listing.fetch();
		
		var showView = new AirNZG.Views.ListingShow({ model: listing });
		this._swapView(showView);
	},
	
	userShow: function(id) {
		var user = AirNZG.users.getOrFetch(id);
		
		var showView = new AirNZG.Views.UserShow({ model: user });
		this._swapView(showView);
	},
	
	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		
		$("main").html(view.render().$el)
	}

});
