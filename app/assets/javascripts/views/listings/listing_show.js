AirNZG.Views.ListingShow = Backbone.View.extend({
	
  template: JST['listings/show'],
	
	initialize: function(options) {
		this.listenTo(this.model, "sync", this.render);
	},
	
	events: {
		"submit .request-form": "newBooking",
		"click .contact-link": "newMessage"
	},
	
	newBooking: function(event) {
		event.preventDefault();
		
		if (AirNZG.Utils.isSignedIn()) {
			var formData = $(event.target).serializeJSON();
			var booking = new AirNZG.Models.Booking();
		
			booking.save(formData, {
				success: function(model, response) {
					AirNZG.Utils.flashNotice("Your request has been sent to the listing owner.")
					Backbone.history.navigate("/", { trigger: true })
				},
				error: function(model, response) {
					AirNZG.Utils.renderErrors(response.responseJSON);
				}
			});
		} else {
			AirNZG.Utils.popSignInModal();
		}
	},
	
	newMessage: function(event) {
		event.preventDefault();
		
		AirNZG.Utils.popContactModal(this.model.user().id);
	},
	
	render: function() {
		console.log(this.model)
		
		
		var content = this.template({ 
			listing: this.model,
			user: this.model.user()
		});
		
		this.$el.html(content);
		
		this.setUpCarousel();
		
		return this;
	},
	
	setUpCarousel: function() {
		$(".jcarousel").jcarousel({
			animation: {
				duration: 500,
				easing: 'linear'
			},
			transitions: true,
			wrap: 'circular'
		})
		
    $('.jcarousel-prev').jcarouselControl({
        target: '-=1'
    });

    $('.jcarousel-next').jcarouselControl({
        target: '+=1'
    });
		
		$('.jcarousel-pagination').jcarouselPagination({});
		
		$('.jcarousel-pagination').on('jcarouselpagination:active', 'a', function(event) {
			$(event.target).addClass("active")
		});
		
		$('.jcarousel-pagination').on('jcarouselpagination:inactive', 'a', function() {
		  $(event.target).removeClass("active")
		});
	}

});
