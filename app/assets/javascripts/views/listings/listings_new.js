AirNZG.Views.ListingNew = Backbone.View.extend({
	
	template: JST["listings/new"],
	
	className: "form-container",
	
	render: function() {
		var content = this.template({ listing: this.model });
		this.$el.html(content)
		
		return this;
	}
	
});