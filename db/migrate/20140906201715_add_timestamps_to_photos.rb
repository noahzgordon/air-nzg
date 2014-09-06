class AddTimestampsToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :created_at, :datetime
    add_column :photos, :updates_at, :datetime
  end
end
