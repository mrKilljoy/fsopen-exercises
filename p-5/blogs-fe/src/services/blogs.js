import axios from 'axios'
import loginService from './login'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = (blog) => {
  const user = loginService.getUser();
  if (!user || !user.token) {
    throw new Error('User not logged in');
  }

  const authHeaderValue = `Bearer ${user.token}`;
  const options = {
    headers: { 'Authorization': authHeaderValue },
  };
  const request = axios.post(baseUrl, blog, options);

  return request.then(response => response.data);
};

const update = (updatedBlog) => {
  const user = loginService.getUser();
  if (!user || !user.token) {
    throw new Error('User not logged in');
  }

  const authHeaderValue = `Bearer ${user.token}`;
  const options = {
    headers: { 'Authorization': authHeaderValue },
  };
  
  const id = updatedBlog.id;
  const request = axios.put(`${baseUrl}/${id}`, updatedBlog, options);

  return request.then(response => response.data);
}

const deleteOne = (id) => {
  const user = loginService.getUser();
  if (!user || !user.token) {
    throw new Error('User not logged in');
  }

  const authHeaderValue = `Bearer ${user.token}`;
  const options = {
    headers: { 'Authorization': authHeaderValue },
  };

  const request = axios.delete(`${baseUrl}/${id}`, options);

  return request.then(response => response.data);
};

export default { getAll, create, update, deleteOne };