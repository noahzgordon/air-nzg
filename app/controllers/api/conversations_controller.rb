class Api::ConversationsController < ApplicationController
  def index
    @conversations = current_user.conversations
    render :index
  end
  
  def show
    @conversation = current_user.conversations.find(params[:id])
    render :show
  end
  
  def create
    @conversation = Conversation.new(conversation_params)
    
    if @conversation.save
      @conversation.messages.create!(params[:message]) if params[:message]
      render json: @conversation
    else
      render json: @conversation.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  private
  
  def conversation_params
    params.require(:conversation).permit(:title)
  end
end