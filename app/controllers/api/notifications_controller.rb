class Api::NotificationsController < ApplicationController
  before_action :require_signed_in

  def destroy
    @notification = current_user.notifications.find(params[:id])
    
    @notification.destroy
    
    notif_objects = []
    
    current_user.notifications.each do |notification|
      notif_objects << {
        text: notification.text,
        url: notification.url,
        id: notification.id
      }
    end
    
    render json: {
      notifications: notif_objects,
      num: current_user.notifications.size 
    }
  end
end
