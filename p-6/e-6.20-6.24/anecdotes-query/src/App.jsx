import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from './services/anecdotes'

const App = () => {
  const queryClient = useQueryClient();

  let anecdotes = [
    {
      content: 'If it hurts, do it more often',
      id: '47145',
      votes: 0,
    },
  ];

  const anecdotesQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    retry: false
  });

  const voteMutation = useMutation({
    mutationFn: anecdoteService.vote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    }
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
    console.log('vote');
  };

  if (anecdotesQuery.isLoading) {
    return <div>loading data...</div>;
  }

  if (anecdotesQuery.isError) {
    return <div>The service not available due to unexpected problems in server</div>;
  }

  anecdotes = anecdotesQuery.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
};

export default App;