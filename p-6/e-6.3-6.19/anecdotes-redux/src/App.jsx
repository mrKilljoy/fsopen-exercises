import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { populateAnecdotes } from './reducers/anecdoteReducer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdotes from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch();

  // populate anecdotes list from server
  useEffect(() => {
    dispatch(populateAnecdotes());
  }), [dispatch];

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
};

export default App;