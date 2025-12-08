import { createSlice } from '@reduxjs/toolkit'
import anecdotes from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

// slice
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload;
      const targetAnecdote = state.find(a => a.id === id);
      const updatedAnecdote = { ...targetAnecdote, votes: targetAnecdote.votes + 1 };
      return state.map(x => x.id !== id ? x : updatedAnecdote).sort((a, b) => b.votes - a.votes);
    },
    create(state, action) {
      const content = action.payload;
      state.push(content);
      return state.sort((a, b) => b.votes - a.votes);
    },
    populate(state, action) {
      return action.payload;
    }
  }
});

// actions
const { populate, create, vote } = anecdoteSlice.actions;

export const populateAnecdotes = () => {
  return async dispatch => {
    const items = await anecdotes.getAll();
    dispatch(populate(items.sort((a, b) => b.votes - a.votes)))
  };
};

export const createAnecdote = (content) => {
  return async dispatch => {
    const newItem = await anecdotes.create(content);
    dispatch(create(newItem));
  };
};

export const voteForAnecdote = (id) => {
  return async dispatch => {
    const votedItem = await anecdotes.voteFor(id);
    dispatch(vote(votedItem.id));
  };
};

export default anecdoteSlice.reducer;