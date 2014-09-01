class Api::BookingsController < ApplicationController
  before_action :require_signed_in
  
  def my_bookings
    @bookings = current_user.booking_requests
    render json: @bookings, include: :user
  end
  
  def create
    @booking = current_user.bookings.new(booking_params)
    
    if @booking.save
      render json: @booking
    else
      render json: @booking.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def approve
    @booking = current_user.booking_requests.find(params[:id])
    @booking.approve!
    
    render json: @booking
  end
  
  def deny
    @booking = current_user.booking_requests.find(params[:id])
    @booking.deny!
    
    render json: @booking
  end
  
  private
  
  def booking_params
    params.require(:booking).permit(:start_date, :end_date, :listing_id)
  end
end
