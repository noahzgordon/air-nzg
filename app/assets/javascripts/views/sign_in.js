AirNZG.Views.SignIn = Backbone.View.extend({	
  template: JST['sign_in'],
	
	tagName: "section",
	
	className: "auth-modal",
	
	events: {
		"click .exit": "exitView",
		"submit .user-form": "signInUser"
	},
	
	exitView: function(event) {
		console.log("blurred!");
		this._closeModal();
		history.back();
	},
	
	signInUser: function(event) {
		event.preventDefault();
		var data = $(event.currentTarget).serializeJSON();
		var view = this
		
		$.ajax({
			url: "/session",
			type: "POST",
			data: data,
			success: function() {
				view._closeModal();
				history.back();
			}
			
		})
		console.log(data);
		
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		
		return this;
	},
	
	_closeModal: function() {
		$(".modal-screen").removeClass("active");
		$(".modal-card").removeClass("active");
	}

});
