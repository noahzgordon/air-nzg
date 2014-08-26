class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :fname
      t.string :lname
      t.string :session_token
      t.string :locale
      t.text :description

      t.timestamps
    end

    add_index :users, :email
    add_index :users, :session_token
  end
end
