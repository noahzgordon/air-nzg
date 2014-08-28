window.AirNZG = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new AirNZG.Routers.Listings();
		Backbone.history.start();
  }
};

$(document).ready(function(){
  AirNZG.initialize();
});
