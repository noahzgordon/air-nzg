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
	
	$("form.listing-search").on("submit", executeQuery);
	
	function executeQuery(event) {
		event.preventDefault();
		
		var queryString = $(event.currentTarget).serialize()
		
		Backbone.history.navigate("#/listings?" + queryString)	
	}
});
