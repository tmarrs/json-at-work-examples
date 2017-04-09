require 'minitest/spec'
require 'minitest/autorun'
require 'unirest'
require 'awesome_print'
require 'ostruct'

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
    speakers.wont_be_nil
    speakers.wont_be_empty    
    expect(speakers.length).must_equal 3
    ap speakers
    
    speaker3 = OpenStruct.new(speakers[2])
    expect(speaker3.company).must_equal 'Talkola'
    expect(speaker3.firstName).must_equal 'Christensen'
    expect(speaker3.lastName).must_equal 'Fisher'
    expect(speaker3.tags).must_equal ['Java', 'Spring', 'Maven', 'REST']

    ap speaker3
  end
end
