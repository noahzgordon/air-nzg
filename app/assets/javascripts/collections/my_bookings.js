AirNZG.Collections.MyBookings = Backbone.Collection.extend({
	url: "/api/my_bookings",
  model: AirNZG.Models.Booking,
	
  getOrFetch: function (id) {
     var bookings = this;
		 
		 var booking = this.get(id)
     if (!booking) {
       booking = new AirNZG.Models.Booking({ id: id });
       booking.fetch({
         success: function () { bookings.add(booking); }
       });
     }

     return booking;
   }
});
