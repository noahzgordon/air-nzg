class Conversation < ActiveRecord::Base
  has_many :messages
  has_many :users, through: :messages, source: :user
  
  validates :title, presence: true, length: { maximum: 20 }
end