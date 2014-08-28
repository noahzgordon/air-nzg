window.AirNZG = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		AirNZG.users.fetch();
    new AirNZG.Routers.Listings();
		Backbone.history.start();
  }
};

$(document).ready(function(){
  AirNZG.initialize();
});
