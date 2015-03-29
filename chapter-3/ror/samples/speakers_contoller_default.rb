class SpeakersController < ApplicationController
  def show
    @speaker = Speaker.find(params[:id])
    
    render json: @speaker
  end
end
