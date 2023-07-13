import React, { useState, useEffect } from 'react';


const CommentingSystem = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('/comments');
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentInputChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: commentText }),
      });

      if (response.ok) {
        // Refresh the comments after successful submission
        fetchComments();
        setCommentText('');
      } else {
        console.error('Failed to submit comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpvote = async (commentId) => {
    try {
      const response = await fetch(`/comments/${commentId}/upvote`, {
        method: 'POST',
      });
  
      if (response.ok) {
        // Refresh the comments after successful upvote
        fetchComments();
      } else {
        console.error('Failed to upvote comment');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDownvote = async (commentId) => {
    try {
      const response = await fetch(`/comments/${commentId}/downvote`, {
        method: 'POST',
      });
  
      if (response.ok) {
        // Refresh the comments after successful downvote
        fetchComments();
      } else {
        console.error('Failed to downvote comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Commenting System</h2>
      <form className="comment-form" onSubmit={handleSubmitComment}>
        <input
          type="text"
          value={commentText}
          onChange={handleCommentInputChange}
          placeholder="Enter your comment"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <ul className="comment-list">
        {comments.map((comment) => (
          <li className="comment-item" key={comment.id}>
            {comment.text}
            <button className="upvote-btn" onClick={() => handleUpvote(comment.id)}>
              Upvote
            </button>
            <button className="downvote-btn" onClick={() => handleDownvote(comment.id)}>
              Downvote
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentingSystem;