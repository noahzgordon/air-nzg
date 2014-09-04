class Api::ConversationsController < ApplicationController
  def index
    @conversations = current_user.conversations
    p @conversations
    render :index
  end
  
  def show
    @conversation = current_user.conversations.find(params[:id])
    render :show
  end
  
  def create
    @conversation = Conversation.new(conversation_params)
    @message = @conversation.messages.new(message_params)
    
    if @conversation.save && @message.save
      render json: @conversation
    else
      render json: @conversation.errors.full_messages + @message.errors.full_messages, 
        status: :unprocessable_entity
    end
  end
  
  private
  
  def conversation_params
    params.require(:conversation).permit(:title)
  end
  
  def message_params
    params.require(:message).permit(:subject, :content)
  end
end