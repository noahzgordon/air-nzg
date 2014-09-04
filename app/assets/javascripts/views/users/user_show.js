AirNZG.Views.UserShow = Backbone.View.extend({	
  template: JST['users/show'],
	
	initialize: function(options) {
		this.listenTo(this.model, "sync", this.render);
	},
	
	events: {
		"click .contact-link": "newMessage"
	}
	
	newMessage: function(event) {
		event.preventDefault();
		
		AirNZG.Utils.popContactModal(this.model.user().id);
	},
	
	render: function() {
		var content = this.template({ user: this.model });
		
		this.$el.html(content);
		
		return this;
	}

});
