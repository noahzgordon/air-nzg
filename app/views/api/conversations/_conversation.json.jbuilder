json.(conversation, :id, :title)

json.messages conversation.messages do |message|
  json.(message, :id, :subject, :content, :created_at, :user_id)
end

json.user_ids conversation.users.map{ |user| user.id }