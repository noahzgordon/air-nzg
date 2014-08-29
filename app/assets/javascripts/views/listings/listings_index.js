AirNZG.Views.ListingsIndex = Backbone.View.extend({
	
	initialize: function() {
		this.listenTo(this.collection, "add", this.render)
	},
	
	events: {
		"click .filter-form": "filterPage"
	},
	
	filterPage: function(event) {
		event.preventDefault();
		
		var data = $(event.currentTarget).serializeJSON();
		
		// REMEMBER: ask instructors if it's OK to NOT use strong params for get requests
		
		this.collection.fetch({
			data: data
		})
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
		
		return this;
	},
	
	renderList: function() {
		var listView = new AirNZG.Views.ListingsList({ collection: this.collection });
		
		$(".listings-list").html(listView.render().$el)
	}
});