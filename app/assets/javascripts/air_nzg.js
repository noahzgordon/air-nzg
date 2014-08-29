window.AirNZG = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		AirNZG.users.fetch();
    new AirNZG.Routers.App();
		Backbone.history.start();
  }
};

$(document).ready(function(){
  AirNZG.initialize();
});
