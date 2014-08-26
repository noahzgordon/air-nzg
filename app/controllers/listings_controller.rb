class ListingsController < ApplicationController
  def index
    listing_params = params[:listing]
    @listings = Listing

    if listing_params[:city]
      @listings = @listings.where(city: listing_params[:city])
    end

    if listing_params[:accomodates]
      @listings = @listings.where("accomodates >= ?", listing_params[:accomodates])
    end

    if listing_params[:start] && listing_params[:end]
      @listings = @listings.includes(:unavailable_ranges).select do |listing|
        listing.available_range?(listing_params[:start], listing_params[:end])
      end
    end

    @params = listing_params
    render :index
  end

  def show
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def listing_params
    params.require(:listing).permit(

    )
  end
end
