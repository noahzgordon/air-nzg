AirNZG.Views.ListingsList = Backbone.View.extend({
	
	template: JST["listings/list"],
	
	initialize: function() {
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "request", this.startLoading);
	},
	
	tagName: "section",
	
	className: "listings-list group",
	
	startLoading: function() {
		this.$el.html('<div class="loading-list">')
		console.log("LOADING")
	},
	
	render: function() {
		var content = this.template({ listings: this.collection });
		this.$el.html(content);
		
		return this;
	}
	
});