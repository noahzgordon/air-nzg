AirNZG.Models.Conversation = Backbone.Model.extend({
	messages: function() {
		this._messages = this._messages || new AirNZG.Collections.Messages([], {
			conversation: this
		})
		
		return this._messages;
	},
	
	parse: function(response) {
		if (response["messages"]) {
			this.messages().set(response["messages"]);
			delete response["messages"];
		}
		
		return response;
	}
});
