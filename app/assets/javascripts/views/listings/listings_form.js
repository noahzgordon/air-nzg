AirNZG.Views.ListingForm = Backbone.View.extend({
	
	newTemplate: JST["listings/new"],
	
	editTemplate: JST["listings/edit"],
	
	className: "form-container",
	
	events: {
		"click .save-button": "saveListing",
		"change #listing-pic": "fileHandler",
		"click .deactivate-button": "deleteListing"
	},
	
	saveListing: function(event) {
		event.preventDefault();
		var view = this;
		
		var data = this.$(".listing-form").serializeJSON();
		
		this.model.save(data, {
			success: function(model, response) {
				AirNZG.Utils.flashNotice("Listing updated!")
				Backbone.history.navigate("/listings/" + model.id, { trigger: true })
			},
			
			error: function(model, response) {
				AirNZG.Utils.renderErrors(response.responseJSON);
			}
		});
	},
	
	fileHandler: function(event) {
		var view = this;
		var imageFile = event.currentTarget.files[0];
		var reader = new FileReader();
		
		reader.onloadend = function() {
			view.model.set($(event.currentTarget).attr("name"), this.result)
			$(event.currentTarget).attr("src", this.result); // updates preview
		}
		
		if (imageFile) {
			reader.readAsDataURL(imageFile); // use reader to read and set image
		} else {
			$(event.currentTarget).attr("src", "") // set preview string to empty
		}
	},
	
	deleteListing: function(event) {
		event.preventDefault();
		
		this.model.destroy({
			success: function() {
				AirNZG.Utils.flashNotice("Listing deactivated.")
				Backbone.history.navigate("/", { trigger: true });
			}
		});
	},
	
	render: function() {
		if (this.model.isNew()) {
			var content = this.newTemplate({ listing: this.model })
		} else {
			var content = this.editTemplate({ listing: this.model })
		}

		this.$el.html(content)
		
		return this;
	}
	
});