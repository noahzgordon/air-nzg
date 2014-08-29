# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

seed_text = CSV.foreach("#{Rails.root}/seeds/us-100.csv") do |row|  
  next if row[0] == "first_name"

  user = User.create!(
    fname: row[0],
    lname: row[1],
    locale: row[4],
    email: row[10],
    password: "password"
  )
  
  listing = user.listings.create!(
    term: ["short", "long"].sample,
    city: user.locale,
    accomodates: [1, 2, 3, 4].sample,
    title: ["#{user.fname} #{user.lname}'s sweet apartment"].sample,
    description: "Check out this awesome apartment!",
    price: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].sample,
    room_type: ["whole", "private", "shared"].sample,
    home_type: "apartment",
    address: row[3]
  )
end

bruce = User.create!(
  fname: "Bruce",
  lname: "Wayne",
  email: "bruce@wayneenterprises.com",
  password: "password",
  locale: "Chicago",
  avatar: File.new("#{Rails.root}/seeds/images/bruce.png")
)

batman = User.create!(
  fname: "Batman",
  email: "batman@batcave.net",
  password: "password",
  locale: "Chicago",
  avatar: File.new("#{Rails.root}/seeds/images/batman.jpg")
)

joker = User.create!(
  fname: "Joker",
  email: "joker@arkham.com",
  password: "password",
  locale: "Chicago",
  avatar: File.new("#{Rails.root}/seeds/images/joker.jpg")
)

superman = User.create!(
  fname: "Superman",
  email: "superman@fortress.sol",
  password: "password",
  locale: "New York",
  avatar: File.new("#{Rails.root}/seeds/images/superman.jpg")
)

lex = User.create!(
  fname: "Lex",
  lname: "Luthor",
  email: "lex@lexcorp.org",
  password: "password",
  locale: "New York",
  avatar: File.new("#{Rails.root}/seeds/images/lex.jpg")
)

l1 = bruce.listings.create!(
  title: "Stately Wayne Manor",
  home_type: "mansion",
  room_type: "private",
  accomodates: 1,
  term: "long",
  city: "Chicago",
  price: 5000
)

l2 = batman.listings.create!(
  title: "The Batcave",
  home_type: "cave",
  room_type: "shared",
  accomodates: 2,
  term: "long",
  city: "Chicago",
  price: 500
)

l1.amenities.create!([
  { name: "Television" },
  { name: "Essentials" },
  { name: "Cable TV"},
  { name: "WiFi"}
])




