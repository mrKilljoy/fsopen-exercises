import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const filterState = useSelector(state => state.filter);
    let anecdotes = useSelector(state => { return filterState !== '' ? state.anecdotes.filter(x => x.content.toLowerCase().includes(filterState.toLowerCase())) : state.anecdotes });

    const vote = id => {
        console.log('vote', id);
        dispatch(voteForAnecdote(id));

        dispatch(setNotification(`Voted for anecdote #${id}.`, 5));
    };

    return (
        <>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default AnecdoteList;