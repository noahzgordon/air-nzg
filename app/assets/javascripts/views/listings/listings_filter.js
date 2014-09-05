AirNZG.Views.ListingsFilter = Backbone.View.extend({
	
	template: JST["listings/filter"],
	
	initialize: function() {
	},
	
	events: {	
		"click input[type=radio]": "filterPage",
		"blur input[type=date]": "filterPage",
		"click .expander": "toggleExpansion"
	},
	
	filterPage: function(event) {
		var data = this.$el.serializeJSON();
		
		data["low_price"] = this.$(".price-slider").slider("values")[0];
		data["high_price"] = this.$(".price-slider").slider("values")[1];
		
		this.collection.fetch({
			data: data
		})
	},
	
	updatePriceValues: function(event) {
		this.$(".price-low").html("$" + this.$(".price-slider").slider("values")[0])
		this.$(".price-high").html("$" + this.$(".price-slider").slider("values")[1])
	},
	
	toggleExpansion: function(event) {
		
	},
	
	className: "filter-form",
	
	tagName: "form",
	
	render: function() {
		var content = this.template({ listings: this.collection });
		this.$el.html(content)
		
		var view = this;
		var $slider = this.$(".price-slider").slider({ 
			min: 0,
			max: 5000, 
			values: [1, 5000],
			range: true,
			step: 100,
			stop: function(event, ui) {
				view.updatePriceValues(event);
				view.filterPage(event);
			},
			slide: function(event, ui) {
				view.updatePriceValues(event);
			}
		 })
		
		this.$(".price-low").html("$" + $slider.slider("values")[0])
		this.$(".price-high").html("$" + $slider.slider("values")[1])
		
		AirNZG.Utils.deselectableRadios.call(this);
		return this;
	}
	
});