module ApplicationHelper
  def auth_token
    <<-HTML.html_safe
    <input type="hidden"
          name="authenticity_token"
          value="#{form_authenticity_token}">
    HTML
  end
  
  def cities_datalist
    <<-HTML.html_safe
    
    HTML
  end
end
