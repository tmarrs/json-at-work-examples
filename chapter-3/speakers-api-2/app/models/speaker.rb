class Speaker < ActiveModelSerializers::Model
  attr_accessor :first_name, :last_name, :email,
                :about, :company, :tags, :registered
  
  def initialize(first_name, last_name, email, about,
                 company, tags, registered)
    @first_name = first_name
    @last_name = last_name
    @email = email
    @about = about
    @company = company
    @tags = tags
    @registered = registered
  end
end
