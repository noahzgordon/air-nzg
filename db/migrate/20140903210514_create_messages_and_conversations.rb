class CreateMessagesAndConversations < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :content
      t.string :subject
      t.references :user
      t.references :conversation
      
      t.timestamps
    end
    
    create_table :conversations do |t|
      t.string :title
      
      t.timestamps
    end
  end
end
