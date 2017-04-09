require 'minitest/spec'
require 'minitest/autorun'
require 'unirest'
require 'awesome_print'
require 'ostruct'
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
    ap speakers
    puts
    
    hash_spkr3 = OpenStruct.new(speakers[2])
    expect(hash_spkr3.company).must_equal 'Talkola'
    expect(hash_spkr3.firstName).must_equal 'Christensen'
    expect(hash_spkr3.lastName).must_equal 'Fisher'
    expect(hash_spkr3.tags).must_equal ['Java', 'Spring', 'Maven', 'REST']
    
    speaker3 =  Speaker.new(hash_spkr3.firstName, hash_spkr3.lastName,
                         hash_spkr3.email, hash_spkr3.about, hash_spkr3.company, 
                         hash_spkr3.tags, hash_spkr3.registered)

    expect(speaker3.company).must_equal 'Talkola'
    expect(speaker3.first_name).must_equal 'Christensen'
    expect(speaker3.last_name).must_equal 'Fisher'
    expect(speaker3.tags).must_equal ['Java', 'Spring', 'Maven', 'REST']

    puts "Speaker3"
    ap speaker3
  end
end
