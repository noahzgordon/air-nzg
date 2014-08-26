class Amenity < ActiveRecord::Base
  belongs_to :listing

  validates :name, presence: true,
   inclusion: { in: [
     "Essentials",
     "Television",
     "Cable TV",
     "Air Conditioning",
     "Heat",
     "Kitchen",
     "Internet",
     "WiFi"
   ]}
end
