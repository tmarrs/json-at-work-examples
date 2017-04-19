class SpeakersController < ApplicationController
  before_action :set_speakers, only: [:index, :show]
  
  # GET	/speakers 
  def index
    render json: @speakers
  end

  # GET	/speakers/:id 
  def show
    id = params[:id].to_i - 1

    if id >= 0 && id < @speakers.length
      render json: @speakers[id]
    else 
      render plain: '404 Not found', status: 404
    end
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
