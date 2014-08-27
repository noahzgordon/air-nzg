# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

bruce = User.create!(
  fname: "Bruce",
  lname: "Wayne",
  email: "bruce@wayneenterprises.com",
  password: "batman"
)

batman = User.create!(
  fname: "Batman",
  email: "batman@batcave.net",
  password: "brucewayne"
)

superman = User.create!(
  fname: "Superman",
  email: "superman@fortress.sol",
  password: "superman"
)

l1 = bruce.listings.create!(
  title: "Stately Wayne Manor",
  home_type: "mansion",
  room_type: "private",
  accomodates: 1,
  term: "long",
  city: "Chicago, United States",
  price: 5000
)

l2 = batman.listings.create!(
  title: "The Batcave",
  home_type: "cave",
  room_type: "shared",
  accomodates: 2,
  term: "long",
  city: "Chicago, United States",
  price: 500
)

l1.amenities.create!([
  { name: "Television" },
  { name: "Essentials" },
  { name: "Cable TV"},
  { name: "WiFi"}
])