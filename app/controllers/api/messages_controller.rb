class Api::MessagesController < ApplicationController  
  def index
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
  end
  
  def show
    @message = current_user.find(params[:id])
    render json: @message
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
  
  def conversations
    
  end
  
  def message_params
    params.require(:message).permit(:subject, :content, :receiver_id)
  end
end