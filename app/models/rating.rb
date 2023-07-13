class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :book

  validates :value, presence: true, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
  validates :user_id, presence: true
  validates :book_id, presence: true
end
