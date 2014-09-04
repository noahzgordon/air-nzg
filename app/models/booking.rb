class Booking < ActiveRecord::Base
  belongs_to :user
  belongs_to :listing
  
  has_one :listing_owner, through: :listing, source: :user
  has_many :notifications, as: :notifiable, inverse_of: :notifiable, dependent: :destroy
  
  validates :start_date, :end_date, :user, :listing, presence: true
  validate :end_date_is_after_start_date, on: :create
  validate :start_date_is_not_past, on: :create
  validate :does_not_overlap_with_approved_request_or_unavailable_range, on: :create
  
  before_save :default_to_pending_status
  after_create :make_creation_notification
  
  enum status: [:pending, :denied, :approved]
  
  def approve!
    if self.pending?
      Booking.transaction do
        self.approved!
        overlapping_pending_requests.each { |request| request.deny! }
      end
    end
    
    finalize_booking
  end

  def deny!
    self.denied!
    finalize_booking
  end
  
  private

  def overlapping_requests
    if self.persisted?
      self.listing.bookings
        .where("id != ?", self.id)
        .where(<<-SQL, self.end_date, self.start_date)
        NOT (start_date > ? OR end_date < ?)
        SQL
    else
      self.listing.bookings
        .where(<<-SQL, self.end_date, self.start_date)
        NOT (start_date > ? OR end_date < ?)
        SQL
    end
  end
  
  def overlapping_unavailable_ranges
    self.listing.unavailable_ranges
      .where(<<-SQL, self.end_date, self.start_date)
      NOT (start_date > ? OR end_date < ?)
      SQL
  end

  def overlapping_pending_requests
    overlapping_requests.pending
  end

  def overlapping_approved_requests
    overlapping_requests.approved
  end

  def does_not_overlap_with_approved_request_or_unavailable_range
    if overlapping_approved_requests.any? || overlapping_unavailable_ranges.any?
      errors[:base] << "Home is unavailable for rental during the chosen range of dates."
    end
  end
  
  def default_to_pending_status
    self.status ||= "pending"
  end
  
  def end_date_is_after_start_date
    return if start_date.nil? || end_date.nil?
    errors.add(:end_date, "must be after start date.") if end_date <= start_date
  end
  
  def start_date_is_not_past
    return if start_date.nil?
    errors.add(:start_date, "must be a present or future date.") if start_date < Date.today
  end
  
  def finalize_booking
    if self.approved?
      notifications.create(event_id: 2, user_id: user.id)
    elsif self.denied?
      notifications.create(event_id: 3, user_id: user.id)
    end
  end
  
  def make_creation_notification
    notifications.create(event_id: 1, user_id: listing_owner.id)
  end
end
