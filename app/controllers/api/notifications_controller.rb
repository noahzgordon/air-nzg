class Api::NotificationsController < ApplicationController
  before_action :require_signed_in

  def destroy
    @notification = current_user.notifications.find(params[:id])
    
    @notification.destroy
    
    render json: { 
      notifications: current_user.notifications, 
      num: current_user.notifications.size 
    }
  end
end
