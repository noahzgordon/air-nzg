AirNZG.Views.ConversationShow = Backbone.View.extend({
	template: JST["conversations/show"],
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render)
	},
	
	render: function() {
		var content = this.template({ conversation: this.model });
		this.$el.html(content);
		
		var formView = new AirNZG.Views.MessageForm({ conversation: this.model });
		this.$(".new-message").append(formView.render().$el)
		
		return this;
	}
});