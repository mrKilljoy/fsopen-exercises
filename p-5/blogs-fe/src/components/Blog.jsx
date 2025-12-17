import { useState } from 'react';

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [isLong, setIsLong] = useState(false);

  const detailsStyle = {
    marginTop: 3,
    marginBottom: 3,
    padding: 10,
    border: 'solid 1px',
    borderColor: 'green',
  };
  const buttonBlockStyle = {
    padding: 5,
    display: 'inline-block',
  }

  const toggleDetails = () => {
    setIsLong(!isLong);
  };

  const handleLikeBlog = () => {
    handleLike({ ...blog, likes: blog.likes + 1 });
  };

  const handleDeleteBlog = () => {
    const mustDelete = window.confirm('Are you sure you want to delete this blog?');
    if (mustDelete) {
      handleDelete(blog.id);
    }
  };

  return (
    <div>
      <div>
        <label>{blog.title}</label>
        <label>{blog.author}</label>
        <div style={buttonBlockStyle}>
          <button onClick={toggleDetails}>{isLong ? 'Hide' : 'Show'} details</button>
          <button onClick={handleDeleteBlog}>Delete</button>
        </div>
      </div>
      {isLong && <div style={detailsStyle}>
        <p>{`URL: ${blog.url}`}</p>
        <p>
          <span>{`Likes: ${blog.likes}`}</span>
          <button onClick={handleLikeBlog}>Like</button>
        </p>
        <p>{`Added by: ${blog.user?.name ?? ''}`}</p>
      </div>}
    </div>
  );
};

export default Blog;