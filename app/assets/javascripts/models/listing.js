AirNZG.Models.Listing = Backbone.Model.extend({
	urlRoot: "/api/listings",
	
	user: function() {
		if (this.get("user_id")) {
			var user = AirNZG.users.getOrFetch(this.get("user_id"));
		} else {
			var user = new AirNZG.Models.User();
		}
		
		return user;
	},
	
	toJSON: function(){
    // namespace attributes for interpretation in Rails controller
    var attributes = _.clone(this.attributes);
    return { listing: attributes };
  }
});
