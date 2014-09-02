class SessionsController < ApplicationController
  before_action :require_not_signed_in, only: [:new, :create]
  
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)

    if sign_in(@user)
      flash[:notice] = "Welcome back!"
      redirect_to home_url
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
