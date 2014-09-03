class Message < ActiveRecord::Base
  belongs_to :conversation
  belongs_to :user
  
  validates :content, presence: true
  validates :subject, presence: true, length: { maximum: 20 }
end