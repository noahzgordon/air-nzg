json.(conversation, :id, :title)

json.messages conversation.messages do |message|
  json.(message, :id, :subject, :content, :created_at, :user_id)
end

other_user = conversation.users.find { |user| user.id != current_user.id }
json.other_user_id other_user.id