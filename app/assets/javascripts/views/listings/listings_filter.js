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
		
		return this;
	}
	
});