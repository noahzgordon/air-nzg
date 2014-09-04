AirNZG.Collections.Conversations = Backbone.Collection.extend({
	url: "/api/conversations",
  model: AirNZG.Models.Conversation
});

AirNZG.conversations = new AirNZG.Collections.Conversations();