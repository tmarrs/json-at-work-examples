`bundle install` # creates Gemfile and Gemfile.lock.

Add our gems for testing, and Gemfile looks like:

```
source "https://rubygems.org"

gem 'rake'
gem 'minitest'
gem 'unirest'
gem 'awesome_print'
```

`bundle install --path vendor/bundle`

This creates `.bundle/config`

Develop a `Rakefile` that looks like this:

```
require 'rake/testtask'

Rake::TestTask.new(:test) do |t|
  t.libs = %w(lib test)
  t.pattern = 'test/**/*_spec.rb'
  t.warning = false
end

task :default => :test
```

Then just run `rake` (tests are run by default)