AirNZG.Views.ListingShow = Backbone.View.extend({
	
  template: JST['listings/show'],
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(AirNZG.users, "add", this.render);
	},
	
	render: function() {
		var user = AirNZG.users.getOrFetch(this.model.get("user_id"))
		
		var content = this.template({ 
			listing: this.model,
			user: user
		});
		this.$el.html(content);
		
		return this;
	}

});
