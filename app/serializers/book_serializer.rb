class BookSearchSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :description, :cover_image_url

  def cover_image_url
    object.cover_image_url.to_s
  end

  def authors
    object['volumeInfo']['authors'] || []
  end

  def description
    object['volumeInfo']['description'] || ''
  end
end