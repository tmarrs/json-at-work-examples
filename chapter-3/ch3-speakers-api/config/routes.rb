Rails.application.routes.draw do
  # get 'speakers/index'
  # get 'speakers/show'
  
  resources :speakers, :only => [:show, :index]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
