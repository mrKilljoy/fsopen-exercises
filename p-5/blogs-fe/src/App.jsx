import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import loginService, { UserCacheKey } from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    const loginResponse = loginService.logIn({ username, password });
    loginResponse.then((r) => {
      setUsername('');
      setPassword('');
      setUser(r);

      loginService.setUser(r);
    });
  };

  const handleLogout = () => {
    setUser(null);
    loginService.removeUser();
  };

  const loginPart = () => {
    return (
      <div>
        <h2>Log in</h2>
        <form className='login-form' onSubmit={handleLogin}>
          <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <br />
          <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  const blogsPart = () => {
    const notificationStyle = {
      border: 'solid 1px',
      color: 'black'
    };

    const addBlog = ({ title, author, url }) => {
      blogService.create({ title, author, url })
        .then((r) => {
          setBlogs(blogs.concat(r));

          setNotification('a new blog was added');
          setTimeout(() => {
            setNotification('');
          }, 5000);
        });
    };

    const addBlogLike = (updatedBlog) => {
      blogService.update(updatedBlog).then((r) => {
        setBlogs(blogs
          .filter(blog => blog.id !== r.id)
          .concat(r)
          .sort((a, b) => a.likes - b.likes));
      });
    };

    const deleteBlog = (id) => {
      blogService.deleteOne(id).then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id).sort((a, b) => a.likes - b.likes));
      });
    };

    return (
      <>
        <div>
          <h2>blogs</h2>
          <span>Logged in </span>
          <button onClick={handleLogout}>Logout</button>
          <br />
          <br />
          {notification !== '' &&
            <div style={notificationStyle}>
              <p>{notification}</p>
            </div>}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={addBlogLike} handleDelete={deleteBlog} />
          )}
        </div>
        <div>
          <BlogForm handleAddBlog={addBlog} />
        </div>
      </>
    );
  };

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs.sort((a, b) => a.likes - b.likes)));
  }, []);

  useEffect(() => {
    const loggerInUser = window.localStorage.getItem(UserCacheKey);
    if (loggerInUser) {
      const user = JSON.parse(loggerInUser);
      setUser(user);
    }
  }, []);

  return (
    <div>
      {!user && loginPart()}
      {user && blogsPart()}
    </div>
  )
}

export default App;