class MergeAmenitiesWithListings < ActiveRecord::Migration
  def change
    drop_table :amenities
    
    add_column :listings, :essentials, :boolean
    add_column :listings, :tv, :boolean
    add_column :listings, :cable, :boolean
    add_column :listings, :ac, :boolean
    add_column :listings, :heat, :boolean
    add_column :listings, :kitchen, :boolean
    add_column :listings, :internet, :boolean
    add_column :listings, :wifi, :boolean
  end
end
