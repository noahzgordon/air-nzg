class UsersController < ApplicationController
  def new
    @user = User.new()
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      flash[:notice] = "Welcome to the site!"
      redirect_to home_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :fname, :lname, :avatar)
  end
end
