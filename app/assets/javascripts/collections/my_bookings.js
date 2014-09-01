AirNZG.Collections.MyBookings = Backbone.Collection.extend({
	url: "/api/my_bookings",
  model: AirNZG.Models.Booking
});
