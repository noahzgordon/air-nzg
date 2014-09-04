AirNZG.Models.User = Backbone.Model.extend({
	urlRoot: "/api/users",
	
	toJSON: function(){
    // namespace attributes for interpretation in Rails controller
    var attributes = _.clone(this.attributes);
		
    return { user: attributes };
  }
});