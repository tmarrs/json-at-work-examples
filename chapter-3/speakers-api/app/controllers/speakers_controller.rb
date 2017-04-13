require 'speaker'

class SpeakersController < ApplicationController
  before_action :set_speakers, only: [:index, :show]
  
  # GET	/speakers 
  def index
    puts 'In #index'
    render json: @speakers
  end

  # GET	/speakers/:id 
  def show
    puts 'In #show'
    id = params[:id].to_i
    puts id
    render json: @speakers[id]
  end
  
  private 
  
  def set_speakers
    @speakers = []
    
    @speakers << Speaker.new('Larson', 'Richard', 'larsonrichard@ecratic.com', 
      'Incididunt mollit cupidatat magna ...', 'Ecratic', 
      ['JavaScript', 'AngularJS', 'Yeoman'], true)

    @speakers << Speaker.new('Ester', 'Clements', 'esterclements@acusage.com',
      'Labore tempor irure adipisicing consectetur ...', 'Acusage',
      ['REST', 'Ruby on Rails', 'APIs'], true)
                      
    @speakers << Speaker.new('Christensen', 'Fisher', 'christensenfisher@talkola.com', 
      'Proident ex Lorem et Lorem ad ...', 'Talkola',
      ['Java', 'Spring', 'Maven', 'REST'], true)
  end
  
end
