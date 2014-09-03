json.(user, :id, :email, :fname, :lname, :locale, :description, :created_at)

json.notification_num user.notifications.size
      
json.avatar_thumb user.avatar.url(:thumb)
json.avatar_small user.avatar.url(:small)
json.avatar_medium user.avatar.url(:medium)