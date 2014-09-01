AirNZG.Views.MyBookings = Backbone.View.extend({
	
	template: JST["bookings/my_bookings"],
	
	initialize: function() {
		this.listenTo(this.collection, "change", this.render);
	},
	
	events: {
		"click .approve": "approveBooking",
		"click .deny": "denyBooking"
	},
	
	approveBooking: function(event) {
		var id = $(event.currentTarget).data("id");
		var booking = this.collection.getOrFetch(id);
		
		booking.save({ approved: true });
	},
	
	denyBooking: function(event) {
		var id = $(event.currentTarget).data("id");
		var booking = this.collection.get("id");
		
		booking.save({ denied: true });
	},
	
	render: function() {
		var content = this.template({ bookings: this.collection });
		this.$el.html(content)
		
		return this;
	}
	
});