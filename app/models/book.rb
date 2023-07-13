class Book < ApplicationRecord
    has_many :messages
    has_many :comments
    has_many :ratings    
    
    validates :title, presence: true
    validates :author, presence: true
    validates :description, presence: true
    validates :publication_date, presence: true
    validates :cover_image_url, presence: true
end
