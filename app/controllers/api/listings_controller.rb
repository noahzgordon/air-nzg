class Api::ListingsController < ApplicationController
  before_action :require_signed_in, only: []
  
  def index
    @listings = Listing.all

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
        listing_params[:low_price],
        listing_params[:high_price]
      )
    end

    if params[:start].present? && params[:end].present?
      @listings = @listings.includes(:unavailable_ranges).select do |listing|
        listing.available_range?(_params[:start], params[:end])
      end
    end

    @params = params

    render :index
  end
  
  def show
    @listing = Listing.find(params[:id])
    render :show
  end

  # def new
  #   @listing = current_user.listings.new
  #   render :new
  # end
  #
  # def create
  #   @listing = current_user.listings.new(listing_params)
  #
  #   if @listing.save
  #     flash[:notice] = "Listing created. Now tell the world more!"
  #     redirect_to edit_listing_url(@listing)
  #   else
  #     flash.now[:errors] = @listing.errors.full_messages
  #     render :new
  #   end
  # end
  #
  # def edit
  #   @listing = current_user.listings.find(params[:id])
  #   render :edit
  # end
  #
  # def update
  #   @listing = current_user.listings.find(params[:id])
  #
  #   if @listing.update(listing_params)
  #     flash[:notice] = "Listing updated!"
  #     redirect_to edit_listing_url(@listing)
  #   else
  #     flash[:errors] = @listing.errors.full_messages
  #     render :edit
  #   end
  # end
  #
  # def destroy
  # end
  #
  # def my_listings
  #   @listings = current_user.listings
  #   render :my_listings
  # end
end
