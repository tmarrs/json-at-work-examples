class Speaker < ActiveRecord::Base
  def as_json(options={})
    options[:except] ||= [:picture, :email]
    super
  end
end
