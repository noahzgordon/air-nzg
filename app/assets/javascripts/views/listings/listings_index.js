AirNZG.Views.ListingsIndex = Backbone.View.extend({
	
	initialize: function() {
		this.listenTo(this.collection, "sync", this.renderList),
		this.listenToOnce(this.collection, "sync", this.renderForm),
		this.listenTo(this.collection, "sync", this.renderMap)
	},
	
  template: JST['listings/index'],
	
	events: {
		"mouseenter .listing-box": "markerCenter"
	},
	
	
	markerCenter: function(event) {
		var id = $(event.currentTarget).data("id");
		
		var listing = this.collection.get(id);
		var latLng = L.latLng(listing.escape("latitude"), listing.escape("longitude"));
		
		this.mapBox.panTo(latLng);
	},
	
	render: function() {
		var content = this.template({ listings: this.collection });
		this.$el.html(content)
		
		return this;
	},
	
	renderList: function() {
		var listView = new AirNZG.Views.ListingsList({ collection: this.collection });
		
		$("div.list").html(listView.render().$el)
	},
	
	renderForm: function() {
		var filterView = new AirNZG.Views.ListingsFilter({ collection: this.collection });
		
		$(".listing-params").html(filterView.render().$el)
	},
	
	showMap: function() {
		L.mapbox.accessToken = "pk.eyJ1IjoidG9ydHVnYS1tYW4iLCJhIjoiLTI5bEk0OCJ9.X62Suravr7Rij4PdYOizFQ"
		this.mapBox = L.mapbox.map("map", "tortuga-man.jc47j4o8");
		
		this.mapBox.featureLayer.on('click', function(e) {
        map.panTo(e.layer.getLatLng());
    });
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
	        coordinates: [listing.get("longitude"), listing.get("latitude")]
	      },
	      properties: {
	        title: listing.escape("title"),
	        description: listing.escape("description"),
					price: listing.escape("price"),
					id: listing.id,
	        'marker-color': '#00607d',
	        'marker-symbol': 'circle',
	        'marker-size': 'medium'
	      }
	    });
		});
		
		this.mapBox.featureLayer.setGeoJSON(data)
		
		this.mapBox.featureLayer.eachLayer(function(layer) {
			var content = 
	        '<p>' + layer.feature.properties.title + 
					' | $' + layer.feature.properties.price + '<\/p>' +
					'<p>' + layer.feature.properties.description + '<\/p>';
	    layer.bindPopup(content);
		})
	}
});