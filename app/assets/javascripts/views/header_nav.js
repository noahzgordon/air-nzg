AirNZG.Views.HeaderNav = Backbone.View.extend({	
  signedInTemplate: JST['header_signed_in'],
	
	signedOutTemplate: JST['header_signed_out'],
	
	tagName: "nav",
	
	className: "nav-wrapper group",
	
	events: {
		"click .sign-out-link": "signOut",
		"click .sign-in-link": "signIn"
	},
	
	signOut: function(event) {
		event.preventDefault();
		$.ajax({
			url: "api/session",
			type: "DELETE",
			success: function(data) {
				AirNZG.currentUser = undefined;
				$("header").html(AirNZG.headerView.render().$el);
			}
		})
	},
	
	signIn: function(event) {
		event.preventDefault();
		AirNZG.Utils.popSignInModal();
	},
	
	render: function() {
		if (AirNZG.Utils.isSignedIn()) {
			var content = this.signedInTemplate({ user: AirNZG.currentUser });
		} else {
			var content = this.signedOutTemplate();
		}
		
		this.$el.html(content);
		
		return this;
	}

});
