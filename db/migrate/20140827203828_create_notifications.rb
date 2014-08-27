class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.references :notifiable, polymorphic: true
      t.references :user_id
      t.integer :event_id

      t.timestamps
    end
  end
end
