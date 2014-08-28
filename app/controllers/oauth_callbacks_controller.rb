class OauthCallbacksController < ApplicationController
  def facebook
    @user = User.find_or_create_by_auth_hash(auth_hash)
    log_in(@user)
    
    flash[:notice] = "Logged in with Facebook! Now tailor your info."
    redirect_to edit_user_url(@user)
  end
  
  private
  
  def auth_hash
    request.env['omniauth.auth']
  end
end
