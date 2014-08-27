class AddStatusToBookings < ActiveRecord::Migration
  def change
    add_column :bookings, :status, :string
  end
end
