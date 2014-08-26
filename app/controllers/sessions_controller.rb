class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if sign_in(@user)
      flash[:notice] = "Welcome back!"
      redirect_to :back
    else
      flash.now[:errors] = ["Invalid email or password!"]
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to home_url
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
