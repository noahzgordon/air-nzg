AirNZG.Views.MessageForm = Backbone.View.extend({
	template: JST["conversations/message_form"],
	
	initialize: function(options) {
	},
	
	tagName: "form",
	
	className: "new-message-form",
	
	events: {
		"submit": "saveNewMessage"
	},
	
	saveNewMessage: function(event) {
		event.preventDefault();
		var view = this
		
		var data = $(event.currentTarget).serializeJSON();
		var message = new AirNZG.Models.Message(data)
		message.save({}, {
			success: function(model, response) {
				view.model.messages().add(message)
			},
			error: function(model, response) {
				AirNZG.Utils.renderErrors (response.responseJSON);
			}
		})
		
	},
	
	render: function() {
		var content = this.template({ conversation: this.model });
		this.$el.html(content);
		
		return this;
	}
});