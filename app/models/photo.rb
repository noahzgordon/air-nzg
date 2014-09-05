class Photo < ActiveRecord::Base
  belongs_to :listing
  
  before_save :default_cover_to_false
  
  has_attached_file :attachment
  
  validates_attachment_content_type :attachment, content_type: /\Aimage\/.*\Z/
  
  private
  
  def default_cover_to_false
    self.cover ||= false
    
    nil
  end
end