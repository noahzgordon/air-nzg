AirNZG.Collections.Messages = Backbone.Collection.extend({
	url: "/api/messages",
  model: AirNZG.Models.Message,
	comparator: function(modelA, modelB) {
		return (modelA.get("created_at") > modelB.get("created_at")) ? -1 : 1
	}
});