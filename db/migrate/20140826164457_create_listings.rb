class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.integer :user_id

      t.string :term
      t.string :city
      t.integer :accomodates
      t.string :title
      t.text :description

      t.integer :beds
      t.float :baths
      t.float :price
      t.string :room_type
      t.string :home_type

      t.string :address
      t.float :latitude
      t.float :longitude

      # unavailable ranges stored in separate table
      # amenities stored in separate table

      t.timestamps
    end

    add_index :listings, :user_id
    add_index :listings, :term
    add_index :listings, :city
    add_index :listings, :accomodates
    add_index :listings, :beds
    add_index :listings, :baths
    add_index :listings, :price
    add_index :listings, :room_type
    add_index :listings, :home_type
    add_index :listings, [:latitude, :longitude]
  end
end
