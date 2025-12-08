import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3000/anecdotes';

const getAll = async () => {
    const response = await fetch(baseUrl);

    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes');
    }

    return response.json();
};

const create = async (anecdote) => {
    const entry = asObject(anecdote);
    const response = await fetch(baseUrl,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry)
        });

    if (!response.ok) {
        throw new Error('Failed to create anecdote');
    }

    return await response.json();
};

const voteFor = async (id) => {
    const itemResponse = await fetch(`${baseUrl}/${id}`);
    if (!itemResponse.ok) {
        throw new Error('Anecdote not found');
    }

    const item = await itemResponse.json();
    item.votes += 1;

    const updateResponse = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    });

    if (!updateResponse.ok) {
        throw new Error('Failed to update votes');
    }

    return await updateResponse.json();
};

export default { getAll, create, voteFor };