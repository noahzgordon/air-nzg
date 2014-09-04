AirNZG.Views.MessageForm = Backbone.View.extend({
	template: JST["conversations/message_form"],
	
	tagName: "form",
	
	className: "new-message-form",
	
	events: {
		"submit": "saveNewMessage",
		"click .exit": "exitView"
	},
	
	saveNewMessage: function(event) {
		event.preventDefault();
		var view = this
		
		var data = $(event.currentTarget).serializeJSON();
		var message = new AirNZG.Models.Message(data)
		message.save({}, {
			success: function(model, response) {
				view.model.messages().add(message);
				view.exitView();
			},
			error: function(model, response) {
				AirNZG.Utils.renderErrors (response.responseJSON);
			}
		})
		
	},
	
	exitView: function(event) {
		$(".modal-screen").removeClass("active");
		$(".modal-card").removeClass("active");
		$(".modal-card").empty();
	},
	
	render: function() {
		var content = this.template({ conversation: this.model });
		
		this.$el.html(content);
		
		return this;
	}
});