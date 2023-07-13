class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :book
  has_many :replies
  
  validates :content, presence: true
end
