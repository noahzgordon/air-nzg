window.AirNZG = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
		// sets a top-level current user property 
		AirNZG.users.fetch({
			success: function(collection) {
				AirNZG.currentUser = collection.getOrFetch(options.currentUserId)
			}
		});
		
    new AirNZG.Routers.App();
		Backbone.history.start({ root: "/" });
  }
};


