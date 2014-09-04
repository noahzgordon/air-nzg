json.(@user, :id, :email, :fname, :lname, :locale, :description, :created_at)

json.notification_num @user.notifications.size
      
json.avatar_thumb @user.avatar.url(:thumb)
json.avatar_small @user.avatar.url(:small)
json.avatar_medium @user.avatar.url(:medium)

json.notifications @user.notifications do |notification|
  json.text notification.text
  json.url notification.url
  json.id notification.id
end