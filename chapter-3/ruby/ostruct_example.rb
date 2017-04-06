require 'ostruct'

h = { first_name: 'Fred' }
m = OpenStruct.new(h)
puts m             # prints: #<Hashie::Mash first_name="Fred">
puts m.first_name  # prints: Fred