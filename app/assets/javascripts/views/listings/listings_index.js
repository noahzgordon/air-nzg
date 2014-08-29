AirNZG.Views.ListingsIndex = Backbone.View.extend({
	
	initialize: function() {
		this.listenTo(this.collection, "sync", this.renderList),
		this.listenTo(this.collection, "sync", this.renderForm),
		this.listenTo(this.collection, "sync", this.renderMap)
	},
	
  template: JST['listings/index'],
	
	render: function() {
		var content = this.template({ listings: this.collection });
		this.$el.html(content)
		
		this.$(".price-slider").append
		this.$(".price-slider").slider({ values: [1, 10000], range: true })
		
		// use .slider("values") to get the vals of both handles
		// use .slider( "values", #, # ) to set the values initially
		// use "slide" or "stop" event to change listings on every movement
		
		return this;
	},
	
	renderList: function() {
		var listView = new AirNZG.Views.ListingsList({ collection: this.collection });
		
		$(".listings-list").html(listView.render().$el)
	},
	
	renderForm: function() {
		var filterView = new AirNZG.Views.ListingsFilter({ collection: this.collection });
		
		$(".listing-params").html(filterView.render().$el)
	},
	
	renderMap: function() {
		L.mapbox.accessToken = "pk.eyJ1IjoidG9ydHVnYS1tYW4iLCJhIjoiLTI5bEk0OCJ9.X62Suravr7Rij4PdYOizFQ"
		this.mapBox = L.mapbox.map("map", "tortuga-man.jc47j4o8");
		
		var map = this.mapBox
		L.mapbox.geocoder("mapbox.places-city-v1").query(this.collection.params().city, function(err, data) {
			if (data.lbounds) {
        map.fitBounds(data.lbounds);
	    } else if (data.latlng) {
        map.setView([data.latlng[0], data.latlng[1]], 13);
	    }
		});
		
		var data = [];
		
		this.collection.each(function(listing) {
			data.push({
	      type: 'Feature',
	      geometry: {
	        type: 'Point',
	        coordinates: [listing.get("longitude"), listing.get("latitude")]
	      },
	      properties: {
	        name: listing.get("name"),
	        address: listing.get("street"),
	        'marker-color': '#00607d',
	        'marker-symbol': 'circle',
	        'marker-size': 'medium'
	      }
	    });
		});
		
		this.mapBox.featureLayer.setGeoJSON(data)
	}
});