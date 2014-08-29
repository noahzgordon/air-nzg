AirNZG.Views.ListingsIndex = Backbone.View.extend({
	
	initialize: function() {
		this.listenTo(this.collection, "sync", this.renderList),
		this.listenTo(this.collection, "sync", this.renderForm),
		this.listenTo(this.collection, "sync", this.updateMap)
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
		
		this.renderList();
		this.renderForm();
		
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
	
	showMap: function() {
		L.mapbox.accessToken = "pk.eyJ1IjoidG9ydHVnYS1tYW4iLCJhIjoiLTI5bEk0OCJ9.X62Suravr7Rij4PdYOizFQ"
		this.map = L.mapbox.map("map", "tortuga-man.jc47j4o8");
		
		// ap.setView(/* CITY LAT/LONG */)
	},
	
	updateMap: function() {
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
		
		L.mapbox.featureLayer(data).addTo(this.map);
	}
});