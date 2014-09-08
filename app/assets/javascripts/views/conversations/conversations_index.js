AirNZG.Views.ConversationsIndex = Backbone.View.extend({
	template: JST["conversations/index"],
	
	className: "convos",
	
	render: function() {
		var content = this.template({ conversations: this.collection });
		this.$el.html(content)
		
		return this;
	}
});