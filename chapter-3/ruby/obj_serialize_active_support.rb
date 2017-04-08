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
            'Ecratic', %w(JavaScript, AngularJS, Yeoman), true)

json = ActiveSupport::JSON.encode(speaker,
                       only: ['first_name', 'last_name'])

puts "Speaker with only first_name and last_name \n#{json}"
puts

json = ActiveSupport::JSON.encode(speaker).camelize(first_letter = :lower)
puts "Speaker with camel-cased JSON \n#{json}"
puts
