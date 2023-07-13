Rails.application.routes.draw do
  resources :books, only: [:index, :create, :show] do
    resources :messages, only: [:index, :create]
    resources :comments, only: [:create, :update, :destroy] do
      member do
        post 'upvote'
        post 'downvote'
      end
      resources :replies, only: [:create, :update, :destroy]
    end

    collection do
      get 'search'
      post 'search'
    end
  end

  post '/register', to: 'users#register'
  post '/login', to: 'users#login'
  delete '/logout', to: 'users#logout'
  get '/dashboard', to: 'users#dashboard'
  get '/me', to: 'users#show'
  patch '/dashboard', to: 'users#update_dashboard'
end