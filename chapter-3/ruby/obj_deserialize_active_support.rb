require 'active_support/json'
require 'active_support/core_ext/string'

class Speaker
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

speaker = Speaker.new('Larson', 'Richard', 'larsonrichard@ecratic.com',
            'Incididunt mollit cupidatat magna excepteur do tempor ex non ...',
            'Ecratic', %w('json', 'rest', 'api', 'oauth'), true)

json_spkr = ActiveSupport::JSON.encode(speaker).camelize(first_letter = :lower)

spkr2 = ActiveSupport::JSON.decode(json_spkr)
puts "speaker 2 after decode() = #{spkr2}"
puts