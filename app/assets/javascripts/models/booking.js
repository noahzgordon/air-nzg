AirNZG.Models.Booking = Backbone.Model.extend({
	urlRoot: "/api/bookings",
	
	parse: function(response) {
		console.log(response)
		
		return response;
	}
});
