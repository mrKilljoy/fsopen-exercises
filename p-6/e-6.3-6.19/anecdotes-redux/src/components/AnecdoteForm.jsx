import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (e) => {
        e.preventDefault();
        const newAnecdoteText = e.target.newAnecdote.value;
        e.target.newAnecdote.value = '';

        dispatch(createAnecdote(newAnecdoteText));
        dispatch(setNotification(`Anecdote created.`, 5));
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name='newAnecdote' />
                </div>
                <button>create</button>
            </form>
        </>
    );
};

export default AnecdoteForm;