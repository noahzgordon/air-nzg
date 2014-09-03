AirNZG.Views.ListingShow = Backbone.View.extend({
	
  template: JST['listings/show'],
	
	initialize: function(options) {
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.user(), "sync", this.render)
	},
	
	events: {
		"submit .request-form": "newBooking"
	},
	
	newBooking: function(event) {
		
		if (AirNZG.Utils.isSignedIn()) {
			event.preventDefault();
		
			var formData = $(event.target).serializeJSON();
			var booking = new AirNZG.Models.Booking();
		
			booking.save(formData, {
				success: function(model, response) {
					Backbone.history.navigate("/", { trigger: true })
				},
				error: function(model, response) {
				
					// if (response.status === 401) {
					// 	Backbone.history.navigate("#/sign_in")
					// }
				
					$(".error-bar").html(response.responseText);
				}
			});
		} else {
			AirNZG.Utils.popSignInModal();
		}
	},
	
	render: function() {
		
		var content = this.template({ 
			listing: this.model,
			user: this.model.user()
		});
		
		this.$el.html(content);
		
		return this;
	}

});
