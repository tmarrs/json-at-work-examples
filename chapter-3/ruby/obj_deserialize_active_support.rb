require 'multi_json'
require 'active_support/json'
require 'active_support/core_ext/string'
require 'ostruct'
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
            'Ecratic', %w(JavaScript, AngularJS, Yeoman), true)

json_speaker = ActiveSupport::JSON.encode(speaker)
puts "speaker (using oj gem) = #{ActiveSupport::JSON.encode(speaker)}"
puts

ostruct_spkr = OpenStruct.new(ActiveSupport::JSON.decode(json_speaker))

speaker2 =  Speaker.new(ostruct_spkr.first_name, ostruct_spkr.last_name, 
                        ostruct_spkr.email, ostruct_spkr.about, ostruct_spkr.company,
                        ostruct_spkr.tags, ostruct_spkr.registered)

puts "speaker 2 after ActiveSupport::JSON.decode()"
ap speaker2
puts
