AirNZG.Collections.Conversations = Backbone.Collection.extend({
	url: "/api/conversations",
  model: AirNZG.Models.Conversation,
	
  findByUserId: function(id) {
  	var conversation;
		
		this.each(function(model) {
  		if (model.get("user_id") == id) {
  			conversation = model
				return false;
  		}
  	})
		
		return conversation;
  }
});

AirNZG.conversations = new AirNZG.Collections.Conversations();