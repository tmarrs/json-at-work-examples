require 'multi_json'

puts "Current JSON Engine = #{MultiJson.current_adapter()}"
puts

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

json_spkr = MultiJson.dump(speaker, pretty: true)

spkr2 = MultiJson.load(json_spkr)
puts "speaker 2 after load() = #{spkr2}"
puts