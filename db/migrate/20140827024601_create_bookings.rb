class CreateBookings < ActiveRecord::Migration
  def change
    create_table :bookings do |t|
      t.references :user
      t.references :listing
      
      t.date :start_date
      t.date :end_date
      t.timestamps
    end
  end
end
