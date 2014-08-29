json.listings @listings do |listing|
  json.partial!("listing", :listing => listing)
end

json.params do
  json.merge! @params
end

json.geojson do
end