class ChangeStatusColumnInBookingsToUseEnums < ActiveRecord::Migration
  def change
    remove_column :bookings, :status
    add_column :bookings, :status, :integer, default: 0
  end
end
