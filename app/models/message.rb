class Message < ApplicationRecord
    belongs_to :book
    belongs_to :user
  
    validates :content, presence: true
    validates :user, presence: true
  
    # Custom scope to order messages by their timestamp in ascending order
    default_scope { order(timestamp: :asc) }
end
