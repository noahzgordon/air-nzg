class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.references :listing
      t.attachment :photo
    end
    
    remove_column :listings, :cover_pic_file_name
    remove_column :listings, :cover_pic_content_type
    remove_column :listings, :cover_pic_file_size
    remove_column :listings, :cover_pic_updated_at
  end
end
