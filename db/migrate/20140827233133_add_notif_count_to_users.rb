class AddNotifCountToUsers < ActiveRecord::Migration
  def change
    add_column :users, :notifications_count, :integer
  end
end
