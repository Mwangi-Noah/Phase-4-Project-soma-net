class MessagesController < ApplicationControllerclass MessagesController < ApplicationController
    before_action :set_book
  
    def index
      @messages = @book.messages
      render json: @messages
    end
  
    def create
      @message = @book.messages.new(message_params)
      if @message.save
        render json: @message, status: :created
      else
        render json: @message.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_book
      @book = Book.find(params[:book_id])
    end
  
    def message_params
      params.require(:message).permit(:content, :user)
    end
  end
end
