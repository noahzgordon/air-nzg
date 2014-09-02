AirNZG.Views.ListingNew = Backbone.View.extend({
	
	template: JST["listings/new"],
	
	className: "form-container",
	
	events: {
		"submit .listing-new-form": "newListing"
	},
	
	newListing: function(event) {
		event.preventDefault();
		var data = $(event.currentTarget).serializeJSON()
		
		this.model.save(data, {
			success: function(model, response) {
				console.log("saved!")
				Backbone.history.navigate("/listings/" + model.id + "/edit", { trigger: true })
			},
			
			error: function(model, response) {
				var errorHtml = "<ul>"
				response.responseJSON.forEach(function(error) {
					errorHtml += "<li>" + error + "</li>"
				})
				errorHtml += "</ul>"
				
				this.$(".error-bar").html(errorHtml)
			}
		});
	},
	
	render: function() {
		var content = this.template({ listing: this.model });
		this.$el.html(content)
		
		return this;
	}
	
});