AirNZG.Views.MyBookings = Backbone.View.extend({
	
	template: JST["listings/my_bookings"],
	
	initialize: function() {
		this.listenTo(this.collection, "sync", this.render);
	},
	
	render: function() {
		var content = this.template({ listings: this.collection });
		this.$el.html(content)
		
		return this;
	}
	
});