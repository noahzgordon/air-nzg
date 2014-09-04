json.array!(@conversations) do |conversation|
  json.partial!("conversation", :conversation => conversation)
end