window.AirNZG = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
		
		AirNZG.users.fetch({
			success: function(collection) {
				// sets a top-level current user property 
				if (options.currentUserId > 0) {
					AirNZG.currentUser = collection.getOrFetch(options.currentUserId)
				}
				
				// sets a top-level view for the header
				AirNZG.headerView = new AirNZG.Views.HeaderNav();
				$("header").html(AirNZG.headerView.render().$el);
			}
		});
		
    new AirNZG.Routers.App();
		Backbone.history.start({ root: "/" });
  }
};