import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookDiscussion = () => {
  const { bookId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/books/${bookId}/messages`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [bookId]);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleNewMessageSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/books/${bookId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage }),
      });

      if (response.ok) {
        // Refresh messages after successful submission
        fetchMessages();
        setNewMessage('');
      } else {
        console.error('Failed to submit message');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="book-discussion">
      <h2>Book Discussion - {bookId}</h2>
      <div className="message-list">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <p className="message-content">{message.content}</p>
            <p className="message-info">{message.user} - {message.timestamp}</p>
          </div>
        ))}
      </div>
      <form className="new-message-form" onSubmit={handleNewMessageSubmit}>
        <textarea
          className="new-message-input"
          placeholder="Enter your message"
          value={newMessage}
          onChange={handleNewMessageChange}
          required
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default BookDiscussion;
