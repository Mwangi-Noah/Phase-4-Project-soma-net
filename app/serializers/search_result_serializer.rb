class SearchResultSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :description, :publication_date, :cover_image_url

  def author
    object['volumeInfo']['authors']&.join(', ')
  end

  def publication_date
    object['volumeInfo']['publishedDate']
  end

  def cover_image_url
    object['volumeInfo']['imageLinks']['thumbnail']
  end
end
