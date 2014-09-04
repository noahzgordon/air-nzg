AirNZG.Views.ConversationsIndex = Backbone.View.extend({
	template: JST["conversations/index"],
	
	render: function() {
		var content = this.template({ conversations: this.collection });
		this.$el.html(content)
		
		return this;
	}
});