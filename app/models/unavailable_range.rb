class UnavailableRange < ActiveRecord::Base
  belongs_to :listing

  validates :start_date, :end_date, presence: true
  validate :end_date_is_after_start_date

  private

  def end_date_is_after_start_date
    errors.add(:end_date, "must be after start date.") if end_date <= start_date
  end
end
