require 'active_support/json'
require 'active_support/core_ext/string'
require 'hashie'
require 'awesome_print'

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

json_spkr2 = ActiveSupport::JSON.encode(speaker)

hash_spkr2 = Hashie::Mash.new(ActiveSupport::JSON.decode(json_spkr2))

spkr2 =  Speaker.new(hash_spkr2.first_name, hash_spkr2.last_name, hash_spkr2.email,
                     hash_spkr2.about, hash_spkr2.company, hash_spkr2.tags,
                     hash_spkr2.registered)

puts "speaker 2 after decode()"
ap spkr2
puts