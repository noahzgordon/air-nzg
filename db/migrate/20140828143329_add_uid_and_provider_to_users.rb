class AddUidAndProviderToUsers < ActiveRecord::Migration
  def change
    add_column :users, :uid, :string
    add_column :users, :provider, :string
    
    add_index :users, :uid
    add_index :users, :provider
  end
end
