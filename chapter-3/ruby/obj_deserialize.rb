require 'multi_json'
require 'ostruct'
require 'awesome_print'

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
            'Ecratic', %w(JavaScript, AngularJS, Yeoman), true)

json_speaker = MultiJson.dump(speaker, pretty: true)
puts "speaker (using oj gem) = #{MultiJson.dump(speaker)}"
puts

hash_spkr = OpenStruct.new(MultiJson.load(json_speaker))

speaker2 =  Speaker.new(hash_spkr.first_name, hash_spkr.last_name, hash_spkr.email,
                     hash_spkr.about, hash_spkr.company, hash_spkr.tags,
                     hash_spkr.registered)

puts "speaker 2 after MultiJson.load()"
ap speaker2
puts
