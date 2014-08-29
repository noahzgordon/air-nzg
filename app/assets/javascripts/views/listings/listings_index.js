AirNZG.Views.ListingsIndex = Backbone.View.extend({
	
	initialize: function() {
		this.listenTo(this.collection, "sync", this.renderListings);
	},
	
	events: {
		"click .filter-form": "filterPage"
	},
	
	filterPage: function(event) {
		event.preventDefault();
		
		var data = {};
		
		data.term = $("#listing-term").val();
		data.city = $("#listing-city").val();
		data.accomodates = $("#listing-accomodates").val()
		data.start = $("#listing-start").val();
		data.end = $("#listing-end").val();
		data.room_type = $("input[name=room_type]:checked").val();
		data.low_price = $("#listing-low-price").val();
		data.high_price = $("#listing-high-price").val();
		
		this.collection.fetch({
			data: data
		})
	},
	
  template: JST['listings/index'],
	
	render: function() {
		console.log(this.collection)
		
		var content = this.template({ listings: this.collection });
		this.$el.html(content)
		
		return this;
	},
	
	renderListings: function() {
		
	}
});