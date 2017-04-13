class SpeakerSerializer < ActiveModel::Serializer
  attributes :first_name, :last_name, :email,
             :about, :company, :tags, :registered
end
