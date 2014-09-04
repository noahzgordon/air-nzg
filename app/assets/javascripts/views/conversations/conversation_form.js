AirNZG.Views.ConversationForm = Backbone.View.extend({
	template: JST["conversations/form"],
	
	tagName: "section",
	
	className: "new-conversation",
	
	events: {
		"submit .convo-form": "newConversation",
		"click .exit": "exitView"
	},
	
	exitView: function(event) {
		$(".modal-screen").removeClass("active");
		$(".modal-card").removeClass("active");
		$(".modal-card").empty();
	},
	
	newConversation: function(event) {
		event.preventDefault();
		var view = this
		
		var data = $(event.currentTarget).serializeJSON();
		
		var convo = AirNZG.conversations.create(data, {
			success: function(model, response) {
				AirNZG.Utils.flashNotice("Message sent!");
				view.exitView();
			},
			error: function(model, response) {
				AirNZG.Utils.renderErrors(response.responseJSON);
			}
		})
		
	},
	
	render: function() {
		var content = this.template({ conversation: this.model });
		this.$el.html(content);
		
		return this;
	}
});