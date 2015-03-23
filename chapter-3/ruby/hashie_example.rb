require 'hashie'

h = { first_name: 'Fred' }
m = Hashie::Mash.new(h)
puts m             # prints: #<Hashie::Mash first_name="Fred">
puts m.first_name  # prints: Fred