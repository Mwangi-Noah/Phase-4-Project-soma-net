puts "Destroying existing data..."

# Destroy ratings (dependent: :destroy)
Rating.destroy_all

# Destroy replies (dependent: :destroy)
Reply.destroy_all

# Destroy comments (dependent: :destroy)
Comment.destroy_all

# Destroy messages
Message.destroy_all

# Destroy books (dependent: :destroy)
Book.destroy_all

# Destroy users
User.destroy_all

puts "Existing data destroyed."

# Seeding starts here...
puts "Seeding started..."

# Create books
book1 = Book.create!(
  title: "Book 1",
  author: "Author 1",
  description: "Description 1",
  publication_date: Date.today,
  cover_image_url: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1665320073l/62039217.jpg"
)

book2 = Book.create!(
  title: "Book 2",
  author: "Author 2",
  description: "Description 2",
  publication_date: Date.today,
  cover_image_url: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655513197l/61308558._SY475_.jpg"
)

# Create users
user1 = User.create!(
  name: "User 1",
  email: "user1@example.com",
  password: "password"
)

user2 = User.create!(
  name: "User 2",
  email: "user2@example.com",
  password: "password"
)

# Create messages
Message.create!(
  book_id: book1.id,
  user_id: user1.id,
  content: "Message 1"
)

Message.create!(
  book_id: book1.id,
  user_id: user1.id,
  content: "Message 2"
)

# Create comments
Comment.create!(
  book_id: book2.id,
  user_id: user2.id,
  content: "Comment 1"
)

Comment.create!(
  book_id: book2.id,
  user_id: user2.id,
  content: "Comment 2"
)

# Create replies
comment1 = Comment.first
comment2 = Comment.last

Reply.create!(
  comment_id: comment1.id,
  user_id: user1.id,
  content: "Reply 1"
)

Reply.create!(
  comment_id: comment2.id,
  user_id: user2.id,
  content: "Reply 2"
)

# Create ratings
Rating.create!(
  book_id: book1.id,
  user_id: user1.id,
  value: 5
)

Rating.create!(
  book_id: book2.id,
  user_id: user2.id,
  value: 4
)

puts "Seeding completed successfully!"