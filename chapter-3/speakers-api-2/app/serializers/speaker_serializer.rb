class SpeakerSerializer < ActiveModel::Serializer
  attributes :name, :email, :about, 
             :company, :tags, :registered

  def name
    "#{object.first_name} #{object.last_name}"
  end
end
