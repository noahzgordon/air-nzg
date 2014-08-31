AirNZG.Views.ListingsFilter = Backbone.View.extend({
	
	template: JST["listings/filter"],
	
	initialize: function() {
	},
	
	events: {	
		"submit": "filterPage"
	},
	
	filterPage: function(event) {
		event.preventDefault();
		
		var data = $(event.currentTarget).serializeJSON();
		
		this.collection.fetch({
			data: data
		})
	},
	
	tagName: "form",
	
	className: "filter-form",
	
	render: function() {
		var content = this.template({ listings: this.collection });
		this.$el.html(content)
		
		var $slider = this.$(".price-slider").slider({ values: [1, 10000], range: true })
		
		this.$(".price-low").html($slider.slider("values")[0])
		this.$(".price-high").html($slider.slider("values")[1])
		
		console.log($slider.slider("values")[0])
		
		// use .slider("values") to get the vals of both handles
		// use .slider( "values", #, # ) to set the values initially
		// use "slide" or "stop" event to change listings on every movement
		
		return this;
	}
	
});