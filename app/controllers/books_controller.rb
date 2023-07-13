class BooksController < ApplicationController
  require 'net/http'
  require 'json'

  def index
    books = Book.all
    render json: books, status: :ok
  end

  def create
    book = Book.new(book_params)
    if book.save
      render json: book, status: :created
    else
      render json: { error: 'Failed to create book' }, status: :unprocessable_entity
    end
  end

  def search
    query = params[:query]
    search_results = search_books(query)
    render json: search_results, status: :ok
  end

  private

  def book_params
    params.require(:book).permit(:title, :author, :description)
  end

  def search_books(query)
    url = "https://www.googleapis.com/books/v1/volumes?q=#{URI.encode(query)}"
    uri = URI(url)
    response = Net::HTTP.get(uri)
    data = JSON.parse(response)
    return data['items'] if data['items'].present?

    []
  end
end
