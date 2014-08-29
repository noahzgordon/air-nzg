AirNZG.Views.ListingsIndex = Backbone.View.extend({
	
	initialize: function() {
		this.listenTo(this.collection, "sync", this.renderListings);
	},
	
});