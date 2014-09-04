class Api::ConversationsController < ApplicationController
  def index
    @conversations = Conversation.all
    render :index
  end
  
  def show
    @conversation = current_user.conversations.find(params[:id])
    render :show
  end
  
  def create
    
  end
  
  def update
    
  end
end