AirNZG.Views.HeaderNav = Backbone.View.extend({	
  signedInTemplate: JST['header_signed_in'],
	
	signedOutTemplate: JST['header_signed_out'],
	
	tagName: "nav",
	
	className: "nav-wrapper group",
	
	render: function() {
		if (AirNZG.Utils.isSignedIn()) {
			var content = this.signedInTemplate();
		} else {
			var content = this.signedOutTemplate();
		}
		
		this.$el.html(content);
		
		return this;
	}

});
