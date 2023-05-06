import React, { useState } from 'react';
import './App.css';

function App() {
  const [postId, setPostId] = useState('');
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const handleInputChange = (e) => {
    setPostId(e.target.value);
  }

  const handleButtonClick = () => {
    if (!postId) {
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => response.json())
      .then(post => {
        if (!post.id) {
          throw new Error('Post not found');
        }
        setPost(post);
        return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      })
      .then(response => response.json())
      .then(comments => {
        setComments(comments);
      })
      .catch(error => {
        console.error(error);
        setPost(null);
        setComments([]);
      });
  }

  const handleCommentsButtonClick = () => {
    setShowComments(!showComments);
  }

  return (
    <div className="container">
      <input type="number" value={postId} onChange={handleInputChange} className="input" />
      <button onClick={handleButtonClick} className="button">Search</button>
      {post && (
        <div className="post">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={handleCommentsButtonClick} className="button">{showComments ? 'Hide' : 'Show'} Comments</button>
          {showComments && comments.map(comment => (
            <div key={comment.id} className="comments">
              <h4>{comment.email}</h4>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
