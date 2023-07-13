class UsersController < ApplicationController
    before_action :authorize, only: [:dashboard, :update_dashboard]

    def show
      render json: @user
    rescue ActiveRecord::RecordNotFound
      user_not_found
    end
  
    def register
      user = User.new(user_params)
  
      if user.save
        # Customize the response as needed
        render json: { message: 'Registration successful' }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def login
      user = User.find_by(email: params[:email])
  
      if user&.authenticate(params[:password])
        # Set the user_id in the session to maintain the user's session
        session[:user_id] = user.id
  
        # Customize the response as needed
        render json: { message: 'Login successful' }
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end
  
    def logout
      # Clear the session and logout the user
      session.clear
  
      # Customize the response as needed
      render json: { message: 'Logout successful' }
    end
  
    def dashboard
      # Find the user based on the session user_id
      user = User.find_by(id: session[:user_id])
  
      # Customize the response as needed
      render json: { user: user }
    end
  
    def update_dashboard
      # Find the user based on the session user_id
      user = User.find_by(id: session[:user_id])
  
      if user.update(user_dashboard_params)
        # Customize the response as needed
        render json: { message: 'Dashboard updated successfully' }
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def user_params
      params.permit(:email, :password)
    end
    
    def user_not_found
      render json: { error: 'User not found' }, status: :not_found
    end
  
    def user_dashboard_params
      params.require(:user).permit(:name, :profile_picture)
    end
end
