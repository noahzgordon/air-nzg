AirNZG.Views.Root = Backbone.View.extend({	
  template: JST['root'],
	
	tagName: "article",
	
	className: "root-content",
	
	events: {
		"submit .listing-search": "executeQuery"
	},
	
	executeQuery: function(event) {
		event.preventDefault();
		var queryString = $(event.currentTarget).serialize()

		Backbone.history.navigate("#/listings?" + queryString, { trigger: true })	
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		
		AirNZG.Utils.deselectableRadios.call(this);
		
		return this;
	}

});
