AirNZG.Collections.Conversations = Backbone.Collection.extend({
	url: "/api/conversations",
  model: AirNZG.Models.Conversation,
	
  getOrFetch: function (id) {
     var convos = this;
		 var convo = this.get(id);
     if (!convo) {
       convo = new AirNZG.Models.Conversation({ id: id });
       convo.fetch({
         success: function () { convos.add(convo); }
       });
     }

     return convo;
   }
});

AirNZG.conversations = new AirNZG.Collections.Conversations();