AirNZG.Views.MyBookings = Backbone.View.extend({
	
	template: JST["bookings/my_bookings"],
	
	initialize: function() {
		this.listenTo(this.collection, "sync", this.render);
	},
	
	render: function() {
		var content = this.template({ bookings: this.collection });
		this.$el.html(content)
		
		return this;
	}
	
});