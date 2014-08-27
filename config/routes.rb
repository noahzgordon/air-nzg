Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
  resources :users, except: [:show, :index, :destroy]

  resources :listings
  get 'my_listings', to: 'listings#my_listings'
  
  resources :bookings, only: [:create]
  get 'my_booking_requests', to: 'bookings#my_booking_requests'
  patch '/bookings/approve/:id', to: 'bookings#approve', as: 'approve_booking'
  patch '/bookings/deny/:id', to: 'bookings#deny', as: 'deny_booking'

  root to: "static_pages#home", as: "home"
end
