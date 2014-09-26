class Api::ListingsController < ApplicationController
  before_action :require_signed_in, only: [:my_listings, :create, :update, :destroy]
  
  wrap_parameters false
  
  def index
    @listings = Listing.find_by_params_hash(params)
    @params = params

    render :index
  end

  def my_listings
    @listings = current_user.listings
    render json: @listings
  end
  
  def show
    @listing = Listing.find(params[:id])
    render :show
  end

  def create
    @listing = current_user.listings.new(listing_params)
    
    @listing.latitude, @listing.longitude = Geocoder.coordinates(
      "#{listing_params[:address]}, #{listing_params[:city]}, United States"
    )

    if @listing.save
      render json: @listing
    else
      render json: @listing.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def update
    @listing = current_user.listings.find(params[:id])
    
    @listing.latitude, @listing.longitude = Geocoder.coordinates(
      "#{listing_params[:address]}, #{listing_params[:city]}, United States"
    ) if listing_params[:address]

    if @listing.update(listing_params)
      render json: @listing
    else
      render json: @listing.errors.full_messages, status: :unprocessable_entity
    end
  end
  

  def destroy
    @listing = current_user.listings.find(params[:id])
    
    @listing.destroy
    
    render json: @listing
  end

  
  private
  
  def listing_params
    params.require(:listing).permit(
      :title, :city, :home_type, :room_type, :accomodates, :price, 
      :term, :address, :description, :essentials, :tv, :cable, :ac,
      :heat, :kitchen, :internet, :wifi, :new_cover_pic, 
      new_photos: [], new_unavail_range: []
    )
  end

end
