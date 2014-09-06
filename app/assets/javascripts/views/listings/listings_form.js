AirNZG.Views.ListingForm = Backbone.View.extend({
	
	newTemplate: JST["listings/new"],
	
	editTemplate: JST["listings/edit"],
	
	className: "form-container",
	
	events: {
		"click .save-button": "saveListing",
		"change #listing-pic": "fileHandlerSingle",
		"change #add-pics": "fileHandlerMultiple",
		"click .deactivate-button": "deleteListing"
	},
	
	saveListing: function(event) {
		event.preventDefault();
		$(".loading-main").css("display", "block");
		
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
	
	fileHandlerSingle: function(event) {
		event.preventDefault();
		
		var reader = new FileReader();
		var view = this;
		var file = event.currentTarget.files[0]
		
		reader.onloadend = function() {
			view.model.set($(event.currentTarget).attr("name"), this.result)
			$(event.currentTarget).attr("src", this.result); // updates preview
		}
		
		if (file) {
			reader.readAsDataURL(file); // use reader to read and set image
		} else {
			$(event.currentTarget).attr("src", "") // set preview string to empty
		}
	},
	
	fileHandlerMultiple: function(event) {
		event.preventDefault();
		
		var view = this;
		var files = event.currentTarget.files;
		
		console.log(files)
		
		if (files) {
			for (var i = 0; i < files.length; i++) {
				var reader = new FileReader();
				
				reader.onloadend = function() {
					if (!view.model.get("photos")) {
						view.model.set("photos", [])
					}
			
					view.model.attributes.photos.push(this.result)
					$(event.currentTarget).attr("src", view.model.get("photos")); // updates preview
					console.log(view.model.get("photos"))
				}
				
				reader.readAsDataURL(files[i])
			}
		} else {
			$(event.currentTarget).attr("src", "")
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