AirNZG.Collections.Messages = Backbone.Collection.extend({
  model: AirNZG.Models.Message,
	comparator: function(modelA, modelB) {
		return (modelA.get("created_at") > modelB.get("created_at")) ? -1 : 1
	}
});