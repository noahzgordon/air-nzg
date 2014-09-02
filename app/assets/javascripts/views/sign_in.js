AirNZG.Views.SignIn = Backbone.View.extend({	
  template: JST['sign_in'],
	
	tagName: "section",
	
	className: "auth-modal",
	
	events: {
		"submit .user-form": "newSession"
	},
	
	newSession: function(event) {
		// event.preventDefault();
		// var data = $(event.currentTarget).serializeJSON();
		//
		// console.log(data)
		
		// $.ajax({
		// 	url: "/session",
		// 	type: "POST",
		// 	data: data,
		// 	success: function(response) {
		// 		console.log("success!");
		// 	},
		// 	error: function(response) {
		// 		console.log("failure!");
		// 	}
		// })
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		
		return this;
	}

});
