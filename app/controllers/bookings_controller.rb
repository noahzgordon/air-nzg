class BookingsController < ApplicationController
  def create
    @booking = current_user.bookings.new(booking_params)
    
    if @booking.save
      flash[:notice] = "Your request has been sent to the listing owner."
      redirect_to listings_url(listing: {
        city: @booking.listing.city,
        term: @booking.listing.term,
        accomodates: @booking.listing.accomodates
      })
    else
      flash[:errors] = @booking.errors.full_messages
      redirect_to :back
    end
  end
  
  def my_booking_requests
    @bookings = current_user.booking_requests
    render :my_booking_requests
  end
  
  def approve
    @booking = current_user.booking_requests.find(params[:id])
    @booking.approve!
    
    redirect_to my_booking_requests_url
  end
  
  def deny
    @booking = current_user.booking_requests.find(params[:id])
    @booking.deny!
    
    redirect_to my_booking_requests_url
  end
  
  private
  
  def booking_params
    params.require(:booking).permit(:start_date, :end_date, :listing_id)
  end
end
