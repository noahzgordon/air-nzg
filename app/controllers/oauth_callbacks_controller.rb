class OauthCallbacksController < ApplicationController
  def facebook
    fail
    @user = User.find_or_create_by_auth_hash(auth_hash)
  end
  
  private
  
  def auth_hash
    request.env['omniauth.auth']
  end
end
