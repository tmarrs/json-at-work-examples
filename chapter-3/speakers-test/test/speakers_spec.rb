require 'minitest_helper'

require 'unirest'
require 'awesome_print'
require 'ostruct'
require 'plissken'
require 'jq/extend'

require_relative '../speaker'


describe 'Speakers API' do
  SPEAKERS_ALL_URI = 'http://localhost:5000/speakers'
  
  before do
    @res = Unirest.get SPEAKERS_ALL_URI, 
                      headers:{ 'Accept' => "application/json" }

  end
  
  it 'should return a 200 response' do
    expect(@res.code).must_equal 200
    expect(@res.headers[:content_type]).must_equal 'application/json; charset=utf-8'
  end
  
  it 'should return all speakers' do
    speakers = @res.body
    expect(speakers).wont_be_nil
    expect(speakers).wont_be_empty    
    expect(speakers.length).must_equal 3
    # ap speakers
  end

  it 'should validate the 3rd speaker as an Object' do
    speakers = @res.body    
    ostruct_spkr3 = OpenStruct.new(speakers[2].to_snake_keys())
    
    expect(ostruct_spkr3.company).must_equal 'Talkola'
    expect(ostruct_spkr3.first_name).must_equal 'Christensen'
    expect(ostruct_spkr3.last_name).must_equal 'Fisher'
    expect(ostruct_spkr3.tags).must_equal ['Java', 'Spring', 'Maven', 'REST']
    
    speaker3 =  Speaker.new(ostruct_spkr3.first_name, ostruct_spkr3.last_name,
                            ostruct_spkr3.email, ostruct_spkr3.about, ostruct_spkr3.company, 
                            ostruct_spkr3.tags, ostruct_spkr3.registered)

    expect(speaker3.company).must_equal 'Talkola'
    expect(speaker3.first_name).must_equal 'Christensen'
    expect(speaker3.last_name).must_equal 'Fisher'
    expect(speaker3.tags).must_equal ['Java', 'Spring', 'Maven', 'REST']

    # puts 'Speaker3 as Object'
    # ap speaker3
  end
  
  it 'should validate the 3rd speaker as JSON' do
    speakers = @res.body 
    speaker3 = speakers[2]
    
    speaker3.jq('.company') {|value| expect(value).must_equal 'Talkola'}
    speaker3.jq('.tags') {|value|
       expect(value).must_equal ['Java', 'Spring', 'Maven', 'REST']}  
    speaker3.jq('.email') {|value| 
       expect(value).must_equal 'christensenfisher@talkola.com'}
    speaker3.jq('. | "\(.firstName) \(.lastName)"') {|value|
       expect(value).must_equal 'Christensen Fisher'}
        
    # ap speaker3
  end
  
end
