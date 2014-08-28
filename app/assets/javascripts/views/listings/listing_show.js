AirNZG.Views.ListingShow = Backbone.View.extend({
	
  template: JST['listings/show'],
	
	initialize: function(options) {
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.user(), "sync", this.render)
	},
	
	render: function() {
		
		console.log("Listing", this.model)
		console.log("User", this.model.user())
		
		var content = this.template({ 
			listing: this.model,
			user: this.model.user()
		});
		
		this.$el.html(content);
		
		return this;
	}

});
