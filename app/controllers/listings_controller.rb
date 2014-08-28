class ListingsController < ApplicationController
  before_action :require_signed_in, only: [:new, :create, :edit, :update]
  
  def index
    listing_params = params[:listing]
    @listings = Listing.all

    if listing_params[:city] && listing_params[:city] != ""
      @listings = @listings.where(city: listing_params[:city])
    end

    if listing_params[:accomodates] && listing_params[:accomodates] != ""
      @listings = @listings.where("accomodates >= ?", listing_params[:accomodates])
    end

    if listing_params[:room_type] && listing_params[:room_type] != ""
      @listings = @listings.where(room_type: listing_params[:room_type])
    end

    if listing_params[:low_price] && listing_params[:high_price] &&
       listing_params[:low_price] != "" && listing_params[:high_price] != ""
      @listings = @listings.where(
        "price >= ? AND price <= ?",
        listing_params[:low_price],
        listing_params[:high_price]
      )
    end

    if listing_params[:start] && listing_params[:end] &&
       listing_params[:start] != "" && listing_params[:start] != ""
      @listings = @listings.includes(:unavailable_ranges).select do |listing|
        listing.available_range?(listing_params[:start], listing_params[:end])
      end
    end

    @params = listing_params
    render :index
  end

  def show
    @listing = Listing.find(params[:id])
    render :show
  end

  def new
    @listing = current_user.listings.new
    render :new
  end

  def create
    @listing = current_user.listings.new(listing_params)

    if @listing.save
      flash[:notice] = "Listing created. Now tell the world more!"
      redirect_to edit_listing_url(@listing)
    else
      flash.now[:errors] = @listing.errors.full_messages
      render :new
    end
  end

  def edit
    @listing = current_user.listings.find(params[:id])
    render :edit
  end

  def update
    @listing = current_user.listings.find(params[:id])

    if @listing.update(listing_params)
      flash[:notice] = "Listing updated!"
      redirect_to edit_listing_url(@listing)
    else
      flash[:errors] = @listing.errors.full_messages
      render :edit
    end
  end

  def destroy
  end
  
  def my_listings
    @listings = current_user.listings
    render :my_listings
  end

  private

  def listing_params
    params.require(:listing).permit(
      :title,
      :city,
      :home_type,
      :room_type,
      :accomodates,
      :term,
      :price,
      :address
    )
  end
end
