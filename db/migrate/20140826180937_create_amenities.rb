class CreateAmenities < ActiveRecord::Migration
  def change
    create_table :amenities do |t|
      t.references :listing
      t.string :name

      t.timestamps
    end
  end
end
