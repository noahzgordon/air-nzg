class Notification < ActiveRecord::Base
  
  include Rails.application.routes.url_helpers
  
  EVENTS = {
      1 => :new_booking_request,
      2 => :booking_approved,
      3 => :booking_denied,
      4 => :new_message
    }

  belongs_to :user, inverse_of: :notifications, counter_cache: true
  belongs_to :notifiable, inverse_of: :notifications, polymorphic: true
  
  validates :notifiable, :user, presence: true
  validates :event_id, inclusion: { in: EVENTS }
  
  def url
    case self.event_name
    when :new_booking_request
      my_booking_requests_url
    when :booking_approved
      approving_user = self.notifiable.listing_owner
      user_url(approving_user)
      # or message them?
    when :booking_denied
      '#'
    when :new_message
      '#'
    end
  end

  def text
    case self.event_name
    when :new_booking_request
      listing = self.notifiable.listing
      requesting_user = self.notifiable.user

      "#{requesting_user.fname} has requested to rent your listing #{listing.title}"
    when :booking_approved
      listing = self.notifiable.listing
      approving_user = self.notifiable.listing_owner
      
      "#{approving_user.fname} has approved your request to rent #{listing.title}. Contact them now!"
    when :booking_denied
      listing = self.notifiable.listing
      approving_user = self.notifiable.listing_owner
      
      "#{approving_user.fname} has denied your request to rent #{listing.title}."
    when :new_message
      "You have a new message from #{self.notifiable.sender}"
    end
  end
  
  def event_name
    EVENTS[self.event_id]
  end

  def default_url_options
    options = {}
    options[:host] = Rails.env.production? ? "appacademy.io" : "localhost:3000"
    options
  end
end
