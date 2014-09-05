window.AirNZG = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
		
		if (options.currentUserId > 0) {
			AirNZG.currentUser = new AirNZG.Models.User({id: options.currentUserId})
			AirNZG.currentUser.fetch({
				success: function() {
					AirNZG.headerView = new AirNZG.Views.HeaderNav();
					$("header").html(AirNZG.headerView.render().$el);
				}
			});
		} else {
			AirNZG.headerView = new AirNZG.Views.HeaderNav();
			$("header").html(AirNZG.headerView.render().$el);
		}
		
		AirNZG.users.fetch({
			success: function() {
				AirNZG.conversations.fetch({
					success: function() {
				    new AirNZG.Routers.App();
						Backbone.history.start({ root: "/" });
						$(".loading-main").hide();
					}
				});
			}
		});
  }
};