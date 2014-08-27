class Booking < ActiveRecord::Base
  belongs_to :user
  belongs_to :listing
  
  validates :start_date, :end_date, :user, :listing, presence: true
  validate :end_date_is_after_start_date
  validate :start_date_is_not_past
  
  before_save :default_to_pending_status
  
  def approve!
    self.status = "APPROVED"
    self.save!
  end
  
  def deny!
    self.status = "DENIED"
    self.save!
  end
  
  private
  
  def default_to_pending_status
    self.status ||= "PENDING"
  end
  
  def end_date_is_after_start_date
    return if start_date.nil? || end_date.nil?
    errors.add(:end_date, "must be after start date.") if end_date <= start_date
  end
  
  def start_date_is_not_past
    return if start_date.nil?
    errors.add(:start_date, "must be a present or future date.") if start_date < Date.today
  end
end
