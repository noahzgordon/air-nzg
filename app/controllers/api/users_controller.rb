class Api::UsersController < ApplicationController
  
  def index
    @users = User.all
    render :index
  end
  
  def show
    @user = User.find(params[:id])
    render :show
  end
  
  def create
    @user = User.new(user_params)
    
    if @user.save
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def update
    @user = User.find(params[:id])
    
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def user_params
    params.require(:user).permit(:email, :password, :fname, :lname, :avatar, :locale, :description)
  end
  
end