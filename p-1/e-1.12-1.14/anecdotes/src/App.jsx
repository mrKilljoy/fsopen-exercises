import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function handleShowNext(){
    setSelected(getRandomInt(anecdotes.length));
  }

  function handleVote() {
    setVotes(pr => {
      const copy = [...pr];
      copy[selected] += 1;
      return copy;
    });
  }

  function getBestAnecdote(){
    let maxVotesIndex = 0;
    for(let i = 1; i < votes.length; i++){
      if(votes[i] > votes[maxVotesIndex]){
        maxVotesIndex = i;
      }
    }

    return anecdotes[maxVotesIndex];
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <button onClick={handleShowNext}>Show next</button>
      <button onClick={handleVote}>Vote</button>
      <p>{anecdotes[selected]}</p>
      <p>(has {votes[selected]} votes)</p>

      <h1>Anecdote with most votes</h1>
      <p>{getBestAnecdote()}</p>
    </div>
  )
}

export default App