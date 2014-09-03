class SessionsController < ApplicationController
  before_action :require_not_signed_in, only: [:new, :create]
  
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    signed_in_user = sign_in(@user)
    
    if signed_in_user
      flash[:notice] = "Welcome back!"
      render json: signed_in_user
    else
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to new_session_url
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
