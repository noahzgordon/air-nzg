class Api::ListingsController < ApplicationController
  before_action :require_signed_in, only: [:my_listings, :create, :update, :destroy]
  
  wrap_parameters false
  
  def index
    @listings = Listing.includes(:unavailable_ranges).all

    if params[:city].present?
      @listings = @listings.where(city: params[:city])
    end

    if params[:accomodates].present?
      @listings = @listings.where("accomodates >= ?", params[:accomodates])
    end

    if params[:room_type].present?
      @listings = @listings.where(room_type: params[:room_type])
    end

    if params[:low_price].present? && params[:high_price].present?
      @listings = @listings.where(
        "price >= ? AND price <= ?",
        params[:low_price],
        params[:high_price]
      )
    end
    
    if params[:term].present?
      @listings = @listings.where(term: params[:term])
    end
    
    if params[:home_type].present?
      @listings = @listings.where(home_type: params[:home_type])
    end
    
    [:essentials, :tv, :cable, :ac, :heat, :kitchen, :internet, :wifi].each do |amenity|
      if params[amenity].present? && params[amenity]
        @listings = @listings.where(amenity => true)
      end
    end
    
    if params[:start].present? && params[:end].present?
      @listings = @listings.includes(:unavailable_ranges).select do |listing|
        listing.available_range?(params[:start], params[:end])
      end
    end

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
      :title, :city, :home_type, :room_type,
      :accomodates, :price, :term, :address, :description, :cover_pic, 
      :essentials, :tv, :cable, :ac, :heat, :kitchen, :internet, :wifi
    )
  end

end
