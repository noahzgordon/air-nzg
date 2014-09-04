AirNZG.Views.ConversationShow = Backbone.View.extend({
	template: JST["conversations/show"],
	
	render: function() {
		var content = this.template({ conversation: this.model });
		this.$el.html(content)
		
		return this;
	}
});