##AirNZG!

A cloned version of the popular apartment listing site, Airbnb. This application is built entirely with Backbone.js on a Rails foundation. Each page is loaded and populated with content dynamically after the initial HTTP GET request to the site's root url. Data is fetched from and persisted through the client via a Rails API, and most of the data logic is handles server-side in the Rails controllers.

###Features
+ Listings can be filtered by a list of parameters and are dynamically re-rendered when those parameters are changed.
+ The app integrates with Mapbox's javascript API to serve up geolocation data that is interactive and re-renders along with listings.
+ Visitors can browse listings without signing in; when an action requires sign-in a sign-in form is rendered as a modal, allowing the visitor to maintain their place on the site.
+ Use of Omniauth allows users to sign in through Facebook.
+ Users can maintain their own listings and upload a number of photos, which will be displayed on their listing's show page as an image carousel.
+ Notifications are automatically sent to users and rendered when another user triggers an action which requires their response.
+ Users can selectively approve or deny booking requests; when one length of time is approved, all conflicting requests are denied and other users cannot request bookings for conflicting dates. These conflicts are displayed on the bookings show page.