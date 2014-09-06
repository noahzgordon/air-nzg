

require 'csv'

apartments = [
  File.new("#{Rails.root}/seeds/images/apt1.jpg"),
  File.new("#{Rails.root}/seeds/images/apt2.jpg"),
  File.new("#{Rails.root}/seeds/images/apt3.jpg"),
  File.new("#{Rails.root}/seeds/images/apt4.jpg"),
  File.new("#{Rails.root}/seeds/images/apt5.jpg")
]

seed_text = CSV.foreach("#{Rails.root}/seeds/us-500.csv") do |row|  
  next if row[0] == "first_name"

  user = User.create!(
    fname: row[0],
    lname: row[1],
    locale: row[4],
    email: row[10],
    password: "password"
  )
  
  coords = Geocoder.coordinates([row[3], row[4], row[5], row[6], row[7]].join(","))
  next if !coords
  
  listing = user.listings.create!(
    term: ["short", "long"].sample,
    city: user.locale,
    accomodates: [1, 2, 3, 4].sample,
    title: "#{user.fname} #{user.lname}'s sweet apartment",
    description: "Check out this awesome apartment!",
    price: [500, 1000, 1200, 1700, 2300, 3000, 3500, 4200, 4500, 5000].sample,
    room_type: ["whole", "private", "shared"].sample,
    home_type: "apartment",
    address: row[3],
    longitude: coords[1],
    latitude: coords[0],
    essentials: true,
    cable: true,
    internet: true
  )
  
  listing.photos.create!([
    { 
      attachment: apartments.sample,
      cover: true
    }, {
      attachment: apartments.sample,
      cover: false
    }, {
      attachment: apartments.sample,
      cover: false
    }
  ])
  
  puts listing.id
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
  title: "Wayne Manor",
  description: "Stately Mansion of Local Millionaire and Man-About-Town Bruce Wayne",
  home_type: "mansion",
  room_type: "private",
  accomodates: 1,
  term: "long",
  city: "Chicago",
  price: 5000,
  latitude: 41.666085,
  longitude: -87.893272,
  address: "11152-11198 W 123rd St., Palos Park, IL 60464"
)

l1.photos.create!([{ 
  attachment: File.new("#{Rails.root}/seeds/images/wayne_manor.jpg"),
  cover: true
}])

l2 = batman.listings.create!(
  title: "The Batcave",
  home_type: "cave",
  room_type: "shared",
  accomodates: 2,
  term: "long",
  city: "Chicago",
  price: 500,
  address: "A Hidden Cave",
  latitude: 41.676043,
  longitude: -87.890186,
  tv: true,
  essentials: true,
  cable: true,
  wifi: true
)

l2.photos.create!([
  { 
    attachment: File.new("#{Rails.root}/seeds/images/batcave.jpg"),
    cover: true
  }, {
    attachment: File.new("#{Rails.root}/seeds/images/batcave2.jpg"),
    cover: false
  }, {
    attachment: File.new("#{Rails.root}/seeds/images/batcave3.jpg"),
    cover: false
  }
])

Message.create!(
  subject: "Hey man",
  content: "How's it going?",
  author_id: User.find_by_fname("Superman").id,
  receiver_id: User.find_by_fname("Batman").id
)

Message.create!(
  subject: "Go Away",
  content: "I don't like you",
  author_id: User.find_by_fname("Batman").id,
  receiver_id: User.find_by_fname("Superman").id
)



