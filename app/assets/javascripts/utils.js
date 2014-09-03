AirNZG.Utils = {
	
	deselectableRadios: function() {
		var wasChecked;
		
		this.$("input[type=radio]").on("mousedown", function(e1) {
			var $radio = $(e1.currentTarget);

			wasChecked = $radio.prop("checked")
		});

		this.$("input[type=radio]").on("click", function(e1) {
			var $radio = $(e1.currentTarget);

			if (wasChecked) {
				$radio.prop("checked", false);
			}
		});
	},
	
	isSignedIn: function() {
		return AirNZG.currentUser ? true : false
	},
	
	popSignInModal: function() {
		var signInView = new AirNZG.Views.SignIn();
		
		$(".modal-screen").addClass("active");
		$(".modal-card").addClass("active");
		$(".modal-card").html(signInView.render().$el)
	},
	
	escapeHTML: function(string) {
	  var entityMap = {
	    "&": "&amp;",
	    "<": "&lt;",
	    ">": "&gt;",
	    '"': '&quot;',
	    "'": '&#39;',
	    "/": '&#x2F;'
	  };
	 
	  return String(string).replace(/[&<>"'\/]/g, function (char) {
	     return entityMap[char];
	  });
	},

	flashNotice: function(html) {
		$(".notice-bar").show();
		$(".notice-bar").html(html);
		$(".notice-bar").delay(2000).fadeOut(3000);
	},
	
	renderErrors: function(errors) {
		var errorHtml = "<ul>"
		errors.forEach(function(error) {
			errorHtml += "<li>" + error + "</li>"
		})
		errorHtml += "</ul>"
		
		view.$(".error-bar").html(errorHtml)
	}
}