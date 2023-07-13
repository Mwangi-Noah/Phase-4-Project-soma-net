Rails.application.routes.draw do
  get 'books/index'
  get 'books/create'
  get 'books/search'

  post '/register', to: 'users#register'
  post '/login', to: 'users#login'
  delete '/logout', to: 'users#logout'
  get '/dashboard', to: 'users#dashboard'
  patch '/dashboard', to: 'users#update_dashboard'

  resources :replies, only: [:create, :update, :destroy]


  resources :comments, only: [:create, :update, :destroy] do
    member do
      post 'upvote'
      post 'downvote'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
