require 'multi_json'

puts "Current JSON Engine = #{MultiJson.current_adapter()}"
puts

age = 39 # Integer
puts "age = #{MultiJson.dump(age)}"
puts

full_name = 'Larson Richard' # String
puts "full_name = #{MultiJson.dump(full_name)}"
puts

reqistered = true # Boolean
puts "reqistered = #{MultiJson.dump(reqistered)}"
puts

tags = %w('json', 'rest', 'api', 'oauth') # Array
puts "tags = #{MultiJson.dump(tags)}"
puts

email = { email: 'larsonrichard@ecratic.com' } # Hash
puts "email = #{MultiJson.dump(email)}"
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

puts "speaker (using oj gem) = #{MultiJson.dump(speaker)}"
puts

MultiJson.adapter = :json_gem
puts "Current JSON Engine = #{MultiJson.current_adapter()}"
puts

puts "speaker (using JSON gem) = #{MultiJson.dump(speaker)}"
puts
