class CreateMessagesAndConversations < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :content
      t.string :subject
      t.references :author
      t.references :receiver
      
      t.timestamps
    end
  end
end
