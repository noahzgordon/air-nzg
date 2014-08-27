class UsersController < ApplicationController
  def new
    @user = User.new()
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      flash[:notice] = "Thank you for signing up! Now please fill in some more information about yourself."
      sign_in(@user)
      redirect_to edit_user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end
  
  def edit
    @user = current_user
    render :edit
  end
  
  def update
    @user = current_user
    
    if @user.update(user_params)
      flash[:notice] = "Profile updated!"
      redirect_to home_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :fname, :lname, :avatar)
  end
end
