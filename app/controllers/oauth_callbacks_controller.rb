class OauthCallbacksController < ApplicationController
  def facebook
    @user = User.find_by_auth_hash(auth_hash)
    
    if @user.nil?
      @user = User.create_by_auth_hash(auth_hash)
      sign_in(@user, auth_hash)
      
      flash[:notice] = "Profile created with Facebook! Now tailor your info."
      redirect_to "#/users/#{@user.id}/edit"
    else
      sign_in(@user, auth_hash)
    
      flash[:notice] = "Logged in with Facebook!"
      redirect_to "#/"
    end
  end
  
  private
  
  def auth_hash
    request.env['omniauth.auth']
  end
end
