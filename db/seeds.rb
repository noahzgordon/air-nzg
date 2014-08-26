# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

u1 = User.create!(
  fname: "Bruce",
  lname: "Wayne",
  email: "bruce@wayneenterprises.com",
  password: "batman"
)

l1 = u1.listings.create!(
  title: "Stately Wayne Manor",
  home_type: "mansion",
  room_type: "private",
  accomodates: 1,
  term: "long",
  city: "New York",
  price: 10_000_000
)

l1.amenities.create!([
  { name: "Television" },
  { name: "Essentials" },
  { name: "Cable TV"},
  { name: "WiFi"}
])