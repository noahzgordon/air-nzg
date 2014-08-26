class CreateUnavailableRanges < ActiveRecord::Migration
  def change
    create_table :unavailable_ranges do |t|
      t.references :listing
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
