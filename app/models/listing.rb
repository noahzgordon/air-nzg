class Listing < ActiveRecord::Base
  belongs_to :user
  has_many :unavailable_ranges
  has_many :amenities
  has_many :bookings

  validates :title, presence: true, uniqueness: true
  validates :home_type, :room_type, :accomodates, :term, :city, :price,
             presence: true

  validates :home_type, inclusion: { in: %w(apartment house mansion cave),
                                     message: "Not a valid home type."}
  validates :room_type, inclusion: { in: %w(whole private shared),
                                     message: "Not a valid room type."}

  def available_range?(start_date, end_date)
    return false if self.unavailable_ranges
      .where.not("start_date >= ? AND end_date <= ?", start_date, end_date)
      .any?

    true
  end

end
