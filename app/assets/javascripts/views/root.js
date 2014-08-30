AirNZG.Views.Root = Backbone.View.extend({	
  template: JST['root'],
	
	tagName: "article",
	
	className: "root-content",
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		
		return this;
	}

});
