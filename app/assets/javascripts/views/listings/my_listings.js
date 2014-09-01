AirNZG.Views.MyListings = Backbone.View.extend({
	
	template: JST["listings/my_listings"],
	
	initialize: function() {
		this.listenTo(this.collection, "sync", this.render);
	},
	
	render: function() {
		var content = this.template({ listings: this.collection });
		this.$el.html(content)
		
		return this;
	}
	
});