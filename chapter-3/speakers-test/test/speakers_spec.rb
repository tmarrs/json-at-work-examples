require 'minitest/spec'
require 'minitest/autorun'
require 'unirest'
require 'awesome_print'
require 'ostruct'

describe 'Speakers API' do
  SPEAKERS_ALL_URI = 'http://localhost:5000/speakers'
  res = nil 
  
  before do
    res = Unirest.get SPEAKERS_ALL_URI, 
                      headers:{ 'Accept' => "application/json" }

  end
  
  it 'should return a 200 response' do
    res.code.must_be :==, 200
    res.headers[:content_type].must_be :==, 'application/json; charset=utf-8'
  end
  
  it 'should return all speakers' do
    speakers = res.body
    speakers.wont_be_nil
    speakers.wont_be_empty    
    speakers.length.must_be :==, 3
    ap speakers
    
    speaker3 = OpenStruct.new(speakers[2])
    speaker3.company.must_be :==, 'Talkola'
    speaker3.firstName.must_be :==, 'Christensen'
    speaker3.lastName.must_be :==, 'Fisher'
    speaker3.tags.must_be :==, ['Java', 'Spring',
      'Maven', 'REST']

    ap speaker3
  end
end
