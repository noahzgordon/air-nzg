AirNZG.Views.ListingShow = Backbone.View.extend({
	
  template: JST['listings/show'],
	
	initialize: function(options) {
		this.listenTo(this.model, "sync", this.render);
	},
	
	events: {
		"submit .request-form": "newBooking"
	},
	
	newBooking: function(event) {
		event.preventDefault();
		
		if (AirNZG.Utils.isSignedIn()) {
			var formData = $(event.target).serializeJSON();
			var booking = new AirNZG.Models.Booking();
		
			booking.save(formData, {
				success: function(model, response) {
					AirNZG.Utils.flashNotice("Your request has been sent to the listing owner.")
					Backbone.history.navigate("/", { trigger: true })
				},
				error: function(model, response) {
					var errorHtml = "<ul>"
					response.responseJSON.forEach(function(error) {
						errorHtml += "<li>" + error + "</li>"
					})
					errorHtml += "</ul>"
			
					$(".error-bar").html(errorHtml)
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
