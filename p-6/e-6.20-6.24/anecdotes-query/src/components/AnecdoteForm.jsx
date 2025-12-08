import anecdoteServie from '../services/anecdotes'
import anecdotesHelper from '../services/anecdotesHelper'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import AppContext from '../AppContext'

const AnecdoteForm = () => {
  const context = useContext(AppContext);
  const dispatch = context.dispatch;
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteServie.create,
    onSuccess: (createdNote) => {
      const data = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], data.concat(createdNote));
    },
    onError: (error) => {
      dispatch({ type: 'SET', payload: 'Anecdote name is too short, must be at least 5 characters long' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR' });
      }, 5000);
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const newEntry = anecdotesHelper.asObject(content);
    newAnecdoteMutation.mutate(newEntry);

    dispatch({ type: 'SET', payload: 'Anecdote created!' });
    setTimeout(() => {
      dispatch({ type: 'CLEAR' });
    }, 5000);

    console.log('new anecdote');
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;