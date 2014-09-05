class ChangePhotosTableToUseWordAttachment < ActiveRecord::Migration
  def change
    drop_table :photos
    
    create_table :photos do |t|
      t.references :listing
      t.attachment :attachment
    end
  end
end
