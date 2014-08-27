# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140827203828) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "amenities", force: true do |t|
    t.integer  "listing_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "bookings", force: true do |t|
    t.integer  "user_id"
    t.integer  "listing_id"
    t.date     "start_date"
    t.date     "end_date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "status"
  end

  create_table "listings", force: true do |t|
    t.integer  "user_id"
    t.string   "term"
    t.string   "city"
    t.integer  "accomodates"
    t.string   "title"
    t.text     "description"
    t.integer  "beds"
    t.float    "baths"
    t.float    "price"
    t.string   "room_type"
    t.string   "home_type"
    t.string   "address"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "listings", ["accomodates"], name: "index_listings_on_accomodates", using: :btree
  add_index "listings", ["baths"], name: "index_listings_on_baths", using: :btree
  add_index "listings", ["beds"], name: "index_listings_on_beds", using: :btree
  add_index "listings", ["city"], name: "index_listings_on_city", using: :btree
  add_index "listings", ["home_type"], name: "index_listings_on_home_type", using: :btree
  add_index "listings", ["latitude", "longitude"], name: "index_listings_on_latitude_and_longitude", using: :btree
  add_index "listings", ["price"], name: "index_listings_on_price", using: :btree
  add_index "listings", ["room_type"], name: "index_listings_on_room_type", using: :btree
  add_index "listings", ["term"], name: "index_listings_on_term", using: :btree
  add_index "listings", ["user_id"], name: "index_listings_on_user_id", using: :btree

  create_table "notifications", force: true do |t|
    t.integer  "notifiable_id"
    t.string   "notifiable_type"
    t.integer  "user_id_id"
    t.integer  "event_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "unavailable_ranges", force: true do |t|
    t.integer  "listing_id"
    t.date     "start_date"
    t.date     "end_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",               null: false
    t.string   "password_digest",     null: false
    t.string   "fname"
    t.string   "lname"
    t.string   "session_token"
    t.string   "locale"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

end
