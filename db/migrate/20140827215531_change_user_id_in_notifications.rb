class ChangeUserIdInNotifications < ActiveRecord::Migration
  def change
    remove_column :notifications, :user_id_id
    add_column :notifications, :user_id, :integer
  end
end
