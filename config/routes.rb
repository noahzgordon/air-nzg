Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
  resources :users, except: [:index, :destroy]
  
  namespace :api, defaults: { format: :json } do
    resources :listings, except: [:new, :edit]
    resources :users, except: [:new, :edit, :destroy]
    
    resources :bookings, only: [:create, :update]
    
    get '/my_listings', to: 'listings#my_listings'
    get '/my_bookings', to: 'bookings#my_bookings'
  end

  resources :listings
  get 'my_listings', to: 'listings#my_listings'
  
  resources :bookings, only: [:create]
  get '/my_booking_requests', to: 'bookings#my_booking_requests'
  patch '/bookings/approve/:id', to: 'bookings#approve', as: 'approve_booking'
  patch '/bookings/deny/:id', to: 'bookings#deny', as: 'deny_booking'
  
  get 'auth/facebook/callback', to: 'oauth_callbacks#facebook'
  
  root to: "static_pages#home", as: "home"
end
