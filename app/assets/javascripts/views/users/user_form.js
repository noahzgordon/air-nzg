AirNZG.Views.UserForm = Backbone.View.extend({	
  editTemplate: JST['users/edit'],
	
	newTemplate: JST['users/new'],
	
	events: {
		"submit .user-form": "saveUser",
		"change #user-avatar": "fileHandler"
	},
	
	saveUser: function(event) {
		event.preventDefault();
		var view = this;
		
		var data = $(event.currentTarget).serializeJSON();
		
		this.model.save(data, {
			success: function(model, response) {
				console.log("Model after", model)
				Backbone.history.navigate("/", { trigger: true })
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
	
	fileHandler: 	function(event) {
		// SHOULD BE REFACTORED!
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
	
	render: function() {
		if (this.model.isNew()) {
			var content = this.newTemplate({ user: this.model })
		} else {
			var content = this.editTemplate({ user: this.model })
		}
		
		this.$el.html(content);
		
		return this;
	}

});
