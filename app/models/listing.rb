class Listing < ActiveRecord::Base
  belongs_to :user
  has_many :unavailable_ranges
  has_many :bookings
  has_many :photos
  
  before_save :default_amenities
  
  validates :title, presence: true, uniqueness: true
  validates :home_type, :room_type, :accomodates, :term, :city, :price, :address,
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
  
  def amenities
    amen_arr = []
    
    amen_arr << "Essentials" if self.essentials
    amen_arr << "Television" if self.tv
    amen_arr << "Cable TV" if self.cable
    amen_arr << "Air Conditioning" if self.ac
    amen_arr << "Heat" if self.heat
    amen_arr << "Kitchen" if self.kitchen
    amen_arr << "Wired Internet" if self.internet
    amen_arr << "WiFi" if self.wifi
    
    amen_arr
  end
  
  def cover_pic
    photos.where(cover: true).first
  end
  
  # def cover_pic=(photo)
#
#   end
  
  private
  
  def default_amenities
    self.essentials ||= false
    self.tv ||= false
    self.cable ||= false
    self.ac ||= false
    self.heat ||= false
    self.kitchen ||= false
    self.internet ||= false
    self.wifi ||= false
    
    nil
  end
end
