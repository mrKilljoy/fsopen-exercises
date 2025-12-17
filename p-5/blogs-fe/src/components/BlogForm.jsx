import { useState, useRef } from 'react'
import Toggler from './Toggler'

const BlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const spoiler = useRef();

  const handleNewBlog = (event) => {
    event.preventDefault();
    handleAddBlog({ title, author, url });
    setAuthor('');
    setTitle('');
    setUrl('');

    spoiler.current.toggleVisibility();
  };

  return (
    <Toggler buttonLabel="Add blog..." ref={spoiler}>
      <form onSubmit={handleNewBlog}>
        <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type='text' placeholder='Author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input type='text' placeholder='Url' value={url} onChange={(e) => setUrl(e.target.value)} />
        <button>Add Blog</button>
      </form>
    </Toggler>
  );
};

export default BlogForm;