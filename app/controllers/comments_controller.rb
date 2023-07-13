class CommentsController < ApplicationController
    before_action :authorize
  
    def create
      comment = Comment.new(comment_params)
  
      if comment.save
        render json: { message: 'Comment created successfully', comment: comment }, status: :created
      else
        render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      comment = Comment.find_by(id: params[:id])
  
      if comment.update(comment_params)
        render json: { message: 'Comment updated successfully', comment: comment }
      else
        render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      comment = Comment.find_by(id: params[:id])
      comment.destroy
      render json: { message: 'Comment deleted successfully' }
    end
  
    private
  
    def comment_params
      params.require(:comment).permit(:content, :user_id, :book_id)
    end
end
