AirNZG.Views.ListingForm = Backbone.View.extend({
	
	newTemplate: JST["listings/new"],
	
	editTemplate: JST["listings/edit"],
	
	className: "form-container",
	
	events: {
		"submit .listing-form": "saveListing",
		"change #listing-pic": "fileSelect"
	},
	
	saveListing: function(event) {
		event.preventDefault();
		var view = this;
		var data = $(event.currentTarget).serializeJSON();
		
		console.log(data)
		
		this.model.save(data, {
			success: function(model, response) {
				Backbone.history.navigate("/listings/" + model.id, { trigger: true })
			},
			
			error: function(model, response) {
				var errorHtml = "<ul>"
				response.responseJSON.forEach(function(error) {
					errorHtml += "<li>" + error + "</li>"
				})
				errorHtml += "</ul>"
				
				view.$(".error-bar").html(errorHtml)
			}
		});
	},
	
	fileSelect: function(event) {
		var view = this;
		var imageFile = event.currentTarget.files[0];
		var reader = new FileReader();
		
		
		
		reader.onloadend = function() {
			view.model.set("cover_pic", this.result)
			view.$("#listing-pic").attr("src", this.result); // updates preview
		}
		
		if (imageFile) {
			reader.readAsDataURL(imageFile); // use reader to read and set image
		} else {
			view.$("#listing-pic").attr("src", "") // set preview string to empty
		}
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