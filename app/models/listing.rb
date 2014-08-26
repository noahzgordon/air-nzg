class Listing < ActiveRecord::Base
  belongs_to :user
  has_many :unavailable_ranges
  has_many :amenities

  validates :title, presence: true, uniqueness: true
  validates :home_type, :room_type, :accomodates, :term, :city, presence: true

  validates :home_type, inclusion: { in: %w(apartment house mansion cave),
                                     message: "Not a valid home type."}
  validates :room_type, inclusion: { in: %w(entire, private, shared),
                                     message: "Not a valid room type."}

end
