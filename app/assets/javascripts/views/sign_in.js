AirNZG.Views.SignIn = Backbone.View.extend({	
  template: JST['sign_in'],
	
	tagName: "section",
	
	className: "auth-modal",
	
	events: {
		"click .exit": "exitView",
		"submit .user-form": "signInUser"
	},
	
	exitView: function(event) {
		$(".modal-screen").removeClass("active");
		$(".modal-card").removeClass("active");
		$(".modal-card").empty();
	},
	
	signInUser: function(event) {
		event.preventDefault();
		var data = $(event.currentTarget).serializeJSON();
		var view = this
		
		$.ajax({
			url: "api/session",
			type: "POST",
			data: data,
			success: function(user) {
				AirNZG.currentUser = new AirNZG.Models.User({ id: user.id });
				AirNZG.currentUser.fetch({
					success: function() {
						AirNZG.headerView.render();
						AirNZG.conversations.fetch();
						view.exitView();
						AirNZG.Utils.flashNotice("Welcome back!");
					}
				});
			},
			
			error: function(data) {
				AirNZG.Utils.renderErrors(data.responseJSON, view);
			}
		})
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		
		return this;
	}

});
