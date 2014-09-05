class Api::MessagesController < ApplicationController  
  def index
    
    if signed_in?
      convos_hash = Hash.new { |h, k| h[k] = [] }
  
      current_user.authored_messages.each do |message|
        convos_hash[message.receiver.id] << message
      end
  
      current_user.received_messages.each do |message|
        convos_hash[message.author.id] << message
      end
    
      convos_arr = []
      convos_hash.each do |key, value|
        convos_arr << { user_id: key, messages: value }
      end
    
      render json: convos_arr
    else
      render json: {}
    end
  end
  
  def show
    if signed_in?
      @message = current_user.find(params[:id])
      render json: @message
    else
      render json: {}
    end
  end
  
  def create
    @message = current_user.authored_messages.new(message_params)
    
    if @message.save
      render json: @message
    else
      render json: @message.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  private
  
  def message_params
    params.require(:message).permit(:subject, :content, :receiver_id)
  end
end