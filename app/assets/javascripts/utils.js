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
	
	popContactModal: function() {
		if (this.isSignedIn()) {
			var newView = new AirNZG.Views.ConversationForm();
			$(".modal-screen").addClass("active");
			$(".modal-card").addClass("active");
			$(".modal-card").html(newView.render().$el);
		} else {
			this.popSignInModal();
		}
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
		
		$(".error-bar").show();
		$(".error-bar").html(errorHtml);
		$(".error-bar").on("click", function(event) {
			$(event.currentTarget).fadeOut(1000);
		});
	}
}