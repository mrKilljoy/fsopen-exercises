import axios from 'axios'
const baseUrl = '/api/login'

export const UserCacheKey = 'loggerInUser';

const logIn = async (creds) => {
  const response = await axios.post(baseUrl, creds);

  console.log('login attampt, status: ', response.status);

  if (response.status !== 200) {
    return null;
  }
  return response.data;
};

const getUser = () => {
  const user = window.localStorage.getItem(UserCacheKey);
  return user ? JSON.parse(user) : null;
};

const removeUser = () => {
  window.localStorage.removeItem(UserCacheKey);
};

const setUser = (user) => {
  window.localStorage.setItem(UserCacheKey, JSON.stringify(user));
};

export default { logIn, getUser, setUser, removeUser };