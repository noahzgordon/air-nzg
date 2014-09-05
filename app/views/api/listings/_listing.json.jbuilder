json.(listing, :id, :title, :created_at, :updated_at, :user_id, :term, :city, 
               :accomodates, :description, :beds, :baths, :price, :home_type, 
               :room_type, :address, :latitude, :longitude)
               
if listing.cover_pic
  json.cover_pic listing.cover_pic.attachment.url
elsif !listing.photos.empty?
  json.cover_pic listing.photos.first.attachment.url
else
  json.cover_pic image_path("listing_missing.jpg")
end

json.pictures listing.photos do |photo|
  json.url photo.attachment.url
end
      
json.amenities listing.amenities

json.unavailable_ranges listing.unavailable_ranges, :start_date, :end_date