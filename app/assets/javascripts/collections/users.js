AirNZG.Collections.Users = Backbone.Collection.extend({
	url: "/api/users",
  model: AirNZG.Models.User,
	
  getOrFetch: function (id) {
     var users = this;

     var user;
     if (user = this.get(id)) {
       user.fetch();
     } else {
       user = new AirNZG.Models.User({ id: id });
       user.fetch({
         success: function () { users.add(user); }
       });
     }

     return user;
   }
});

AirNZG.users = new AirNZG.Collections.Users
