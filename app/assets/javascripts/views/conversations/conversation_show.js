AirNZG.Views.ConversationShow = Backbone.View.extend({
	template: JST["conversations/show"],
	
	initialize: function() {
		this.listenTo(this.model.messages(), "add", this.render)
	},
	
	render: function() {
		var content = this.template({ conversation: this.model });
		this.$el.html(content);
		
		var formView = new AirNZG.Views.MessageForm({ model: this.model });
		this.$(".new-message").html(formView.render().$el)
		
		return this;
	}
});