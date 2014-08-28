json.(listing, :id, :title, :created_at, :updated_at, :user_id, :term, :city, 
               :accomodates, :description, :beds, :baths, :price, :home_type, 
               :room_type, :address, :latitude, :longitude)
      
json.amenities listing.amenities, :name

json.unavailable_ranges listing.unavailable_ranges, :start_date, :end_date