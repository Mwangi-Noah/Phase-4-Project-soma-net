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
    serialized_results = serialize_search_results(search_results)
    render json: serialized_results, status: :ok
  end
  
  private
  
  def serialize_search_results(results)
    results.map do |result|
      {
        id: result['id'],
        title: result['volumeInfo']['title'],
        authors: result['volumeInfo']['authors'] || ['Unknown'],
        description: result['volumeInfo']['description'],
        thumbnail: result['volumeInfo']['imageLinks']&.fetch('smallThumbnail', '')
      }
    end
  end

  def book_params
    params.require(:book).permit(:title, :author, :description)
  end

  def search_books(query)
    api_key = 'AIzaSyCzEJJwYQ5JaQJ1zIHKOGqpXLqFkffsw1k'
    encoded_query = URI.encode_www_form_component(query)
    url = "https://www.googleapis.com/books/v1/volumes?q=#{encoded_query}&key=#{api_key}"
    uri = URI(url)
    response = Net::HTTP.get(uri)
    data = JSON.parse(response)
    return data['items'] if data['items'].present?

    []
  end
end