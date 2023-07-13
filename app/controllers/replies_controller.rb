class RepliesController < ApplicationController

  before_action :authorize

  def create
    reply = Reply.new(reply_params)

    if reply.save
      render json: { message: 'Reply created successfully', reply: reply }, status: :created
    else
      render json: { errors: reply.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    reply = Reply.find_by(id: params[:id])

    if reply.update(reply_params)
      render json: { message: 'Reply updated successfully', reply: reply }
    else
      render json: { errors: reply.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    reply = Reply.find_by(id: params[:id])
    reply.destroy
    render json: { message: 'Reply deleted successfully' }
  end

  private

  def reply_params
    params.require(:reply).permit(:content, :user_id, :comment_id)
  end
end
