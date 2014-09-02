AirNZG.Routers.App = Backbone.Router.extend({
	
	routes: {
		"": "root",
		"listings?:query": "listingsIndex",
		"listings/new": "listingNew",
		"listings/:id": "listingShow",
		"listings/:id/edit": "listingEdit",
		
		"users/:id": "userShow",
		"users/:id/edit": "userEdit",
		
		"sign_in": "signIn",
		"sign_up": "signUp",
		
		"my_listings": "myListings",
		"my_booking_requests": "myBookings"
	},
	
	root: function() {
		var rootView = new AirNZG.Views.Root();
		this._swapView(rootView);
	},
	
	listingsIndex: function(query) {
		var listings = new AirNZG.Collections.Listings();
		listings.fetch({ data: query });
		
		var indexView = new AirNZG.Views.ListingsIndex({ collection: listings })
		this._swapView(indexView)
		
		indexView.showMap();
	},
	
	listingNew: function() {
		var listing = new AirNZG.Models.Listing();
		
		var newView = new AirNZG.Views.ListingForm({ model: listing });
		this._swapView(newView);
	},
	
	listingShow: function(id) {
		var listing = new AirNZG.Models.Listing({ id: id });
		listing.fetch();
		
		var showView = new AirNZG.Views.ListingShow({ model: listing });
		this._swapView(showView);
	},
	
	listingEdit: function(id) {
		var listing = new AirNZG.Models.Listing({ id: id });
		var router = this;
		
		listing.fetch({
			success: function() {
				var newView = new AirNZG.Views.ListingForm({ model: listing });
				router._swapView(newView);
			}
		});
	},
	
	userShow: function(id) {
		var user = AirNZG.users.getOrFetch(id);
		
		var showView = new AirNZG.Views.UserShow({ model: user });
		this._swapView(showView);
	},
	
	myListings: function() {
		var listings = new AirNZG.Collections.MyListings;
		var router = this;
		
		listings.fetch({
			success: function() {
				var listingsView = new AirNZG.Views.MyListings({ collection: listings })
				router._swapView(listingsView);
			}
		});
	},
	
	myBookings: function() {
		var bookings = new AirNZG.Collections.MyBookings;
		var router = this;
		
		bookings.fetch({
			success: function() {
				var bookingsView = new AirNZG.Views.MyBookings({ collection: bookings })
				router._swapView(bookingsView);
			}
		});
	},
	
	signIn: function() {
		var signInView = new AirNZG.Views.SignIn();
		
		$(".modal-screen").addClass("active");
		$(".modal-card").addClass("active");
		$(".modal-card").html(signInView.render().$el)
	},
	
	signUp: function() {
		
	},
	
	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		
		$("main").html(view.render().$el)
	}

});
