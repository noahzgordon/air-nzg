AirNZG.Views.ConversationShow = Backbone.View.extend({
	template: JST["conversations/show"],
	
	initialize: function() {
		this.listenTo(AirNZG.conversations, "newMessage", this.render)
	},
	
	events: {
		"click .new-message": "popNewMessageModal"
	},
	
	popNewMessageModal: function() {
		AirNZG.Utils.popContactModal(this.model.get("user_id"));
	},
	
	render: function() {
		var content = this.template({ conversation: this.model });
		this.$el.html(content);
		
		return this;
	}
});