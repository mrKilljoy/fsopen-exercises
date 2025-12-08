const collectionUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await fetch(collectionUrl);
    if (!response.ok) {
        throw new Error('Could not retrieve anecdotes');
    }
    return response.json();
};

const create = async (newAnecdote) => {
    const response = await fetch(collectionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnecdote)
    });

    if (!response.ok) {
        throw new Error('Could not create anecdote');
    }

    return response.json();
};

const vote = async (anecdote) => {
    const response = await fetch(`${collectionUrl}/${anecdote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...anecdote, votes: anecdote.votes + 1 })
    });

    if (!response.ok) {
        throw new Error('Could not vote for anecdote');
    }

    return response.json();
}

export default { getAll, create, vote };