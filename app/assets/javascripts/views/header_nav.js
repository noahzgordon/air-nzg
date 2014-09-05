AirNZG.Views.HeaderNav = Backbone.View.extend({	
  signedInTemplate: JST['header_signed_in'],
	
	signedOutTemplate: JST['header_signed_out'],
	
	tagName: "nav",
	
	className: "nav-wrapper group",
	
	events: {
		"click .sign-out-link": "signOut",
		"click .sign-in-link": "signIn",
		"click .notif": "deleteNotification"
	},
	
	signOut: function(event) {
		event.preventDefault();
		$.ajax({
			url: "api/session",
			type: "DELETE",
			success: function(data) {
				AirNZG.currentUser = undefined;
				AirNZG.headerView.render();
				AirNZG.Utils.flashNotice("Successfully signed out.");
				Backbone.history.navigate("/", { trigger: true })
			}
		})
	},
	
	signIn: function(event) {
		event.preventDefault();
		AirNZG.Utils.popSignInModal();
	},
	
	deleteNotification: function() {
		var id = $(event.target).data("id")
		
		$.ajax({
			url: "api/notifications/" + id,
			type: "DELETE",
			success: function(data) {
				AirNZG.currentUser.set("notifications", data.notifications);
				AirNZG.currentUser.set("notification_num", data.num);
				AirNZG.headerView.render();
			}
		});
	},
	
	render: function() {
		if (AirNZG.Utils.isSignedIn()) {
			var content = this.signedInTemplate({ user: AirNZG.currentUser });
			
			if (AirNZG.currentUser.limited) {
				// The only way currentUse could have this attribute is if someone attempted
				// to hack the site using the console.
				$(".body").html("<h1>Oops, something went wrong ;)</h1>")
			}
		} else {
			var content = this.signedOutTemplate();
		}
		
		
		
		this.$el.html(content);
		
		return this;
	}

});
