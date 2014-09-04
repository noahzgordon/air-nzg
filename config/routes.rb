Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    
    resources :listings, except: [:new, :edit]
    resources :users, except: [:new, :edit, :destroy]
    
    resources :bookings, only: [:create, :update]
    
    resources :notifications, only: [:destroy]
    
    get '/my_listings', to: 'listings#my_listings'
    get '/my_bookings', to: 'bookings#my_bookings'
    
    resources :conversations, only: [:index, :show, :create, :update]
  end
  
  get 'auth/facebook/callback', to: 'oauth_callbacks#facebook'
  
  root to: "static_pages#home", as: "home"
end
