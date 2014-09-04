AirNZG.Routers.App = Backbone.Router.extend({
	
	routes: {
		"": "root",
		"listings?:query": "listingsIndex",
		"listings/new": "listingNew",
		"listings/:id": "listingShow",
		"listings/:id/edit": "listingEdit",
		
		"users/new": "userNew",
		"users/:id": "userShow",
		"users/:id/edit": "userEdit",
		
		"sign_in": "signIn",
		"sign_up": "signUp",
		
		"my_listings": "myListings",
		"my_booking_requests": "myBookings",
		
		"conversations": "conversationsIndex",
		"conversations/:id": "conversationShow"
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
		if (this._requireSignIn()) { return null; }
		
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
		if (this._requireSignIn()) { return null; }
		
		var listing = new AirNZG.Models.Listing({ id: id });
		var router = this;
		
		listing.fetch({
			success: function() {
				var editView = new AirNZG.Views.ListingForm({ model: listing });
				router._swapView(editView);
			}
		});
	},
	
	userShow: function(id) {
		var user = AirNZG.users.getOrFetch(id);
		
		var showView = new AirNZG.Views.UserShow({ model: user });
		this._swapView(showView);
	},
	
	userNew: function() {
		var user = new AirNZG.Models.User();
		
		var newView = new AirNZG.Views.UserForm({ model: user });
		this._swapView(newView);
	},
	
	userEdit: function(id) {
		if (this._requireSignIn()) { return null; }
		
		var user = new AirNZG.Models.User({ id: id });
		var router = this;
		
		user.fetch({
			success: function() {
				var editView = new AirNZG.Views.UserForm({ model: user });
				router._swapView(editView);
			}
		});
	},
	
	myListings: function() {
		if (this._requireSignIn()) { return null; }
		
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
		if (this._requireSignIn()) { return null; }
		
		var bookings = new AirNZG.Collections.MyBookings;
		var router = this;
		
		bookings.fetch({
			success: function() {
				var bookingsView = new AirNZG.Views.MyBookings({ collection: bookings })
				router._swapView(bookingsView);
			}
		});
	},
	
	conversationsIndex: function() {
		if (this._requireSignIn()) { return null; }
		
		var router = this;
	
		AirNZG.conversations.fetch({
			success: function() {
				var indexView = new AirNZG.Views.ConversationsIndex({ 
					collection: AirNZG.conversations
				})
				
				router._swapView(indexView);
			}
		})
	},
	
	conversationShow: function(id) {
		if (this._requireSignIn()) { return null; }
		
		var router = this
		
		AirNZG.conversations.fetch({
			success: function() {
				var conversation = AirNZG.conversations.findByUserId(parseInt(id))

				var showView = new AirNZG.Views.ConversationShow({ model: conversation })
				router._swapView(showView);
			}
		})
		
	},
	
	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		
		$(".notice-bar").delay(2000).fadeOut(3000)
		$(".error-bar").delay(500).fadeOut(1000);
		
		$("main").html(view.render().$el)
	},
	
	_requireSignIn: function() {
		if (!AirNZG.Utils.isSignedIn()) {
			AirNZG.Utils.popSignInModal();
			AirNZG.Utils.flashNotice("You need to sign in to do that!")
			return true;
		} else {
			return false
		}
	}

});
