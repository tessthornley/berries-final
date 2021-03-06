Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      get 'users/search' => 'users#search' 
      get 'users/:id/show' => 'users#show' 
      resources :users
      
      get 'instruments/search' => 'instruments#search'
      resources :instruments
      
      get 'genres/search' => 'genres#search'
      resources :user_genres 
      resources :genres

      resources :chats
      resources :messages
      resources :notifications
      resources :chat_users
      delete '/bye' => 'chat_users#destroy'
      resources :relationships
      post '/login' => 'sessions#create'
      delete '/logout' => 'sessions#destroy'
      
      mount ActionCable.server => '/cable'
    end
  end
end
