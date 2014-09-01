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
		
		return this;
	},
	
	renderList: function() {
		var listView = new AirNZG.Views.ListingsList({ collection: this.collection });
		
		$(".listings-list").html(listView.render().$el)
	},
	
	renderForm: function() {
		var filterView = new AirNZG.Views.ListingsFilter({ collection: this.collection });
		
		console.log("rendering form...")
		
		$(".listing-params").html(filterView.render().$el)
	},
	
	showMap: function() {
		L.mapbox.accessToken = "pk.eyJ1IjoidG9ydHVnYS1tYW4iLCJhIjoiLTI5bEk0OCJ9.X62Suravr7Rij4PdYOizFQ"
		this.mapBox = L.mapbox.map("map", "tortuga-man.jc47j4o8");
	},
	
	renderMap: function() {
		var map = this.mapBox
		
		if (this.collection.params().city) { 
			L.mapbox.geocoder("mapbox.places-city-v1").query(this.collection.params().city, function(err, data) {
				if (data.lbounds) {
	        map.fitBounds(data.lbounds);
		    } else if (data.latlng) {
	        map.setView([data.latlng[0], data.latlng[1]], 13);
		    }
			});
		}
		
		var data = [];
		
		this.collection.each(function(listing) {
			
			data.push({
	      type: 'Feature',
	      geometry: {
	        type: 'Point',
	        coordinates: [listing.get("latitude"), listing.get("longitude")]
	      },
	      properties: {
	        title: listing.get("title"),
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