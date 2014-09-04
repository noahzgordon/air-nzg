class Message < ActiveRecord::Base
  belongs_to :conversation
  belongs_to :author, class_name: "User", foreign_key: :author_id
  belongs_to :receiver, class_name: "User", foreign_key: :receiver_id
  
  has_many :notifications, as: :notifiable, inverse_of: :notifiable, dependent: :destroy
  
  validates :content, :author, :receiver, presence: true
  validates :subject, presence: true, length: { maximum: 20 }
  
  private
  
  def notify_receiving_user
    # notifications.create(event_id: 4, user_id: )
  end
end