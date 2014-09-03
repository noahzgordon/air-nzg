class Api::SessionsController < ApplicationController
  before_action :require_not_signed_in, only: [:create]

  def create
    @user = User.new(user_params)
    signed_in_user = sign_in(@user)
    
    if signed_in_user
      render json: signed_in_user
    else
      render json: ["Invalid email or password."], status: :unprocessable_entity
    end
  end

  def destroy
    sign_out
    render json: {}
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
