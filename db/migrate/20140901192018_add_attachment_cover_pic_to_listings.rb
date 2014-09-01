class AddAttachmentCoverPicToListings < ActiveRecord::Migration
  def self.up
    change_table :listings do |t|
      t.attachment :cover_pic
    end
  end

  def self.down
    remove_attachment :listings, :cover_pic
  end
end
