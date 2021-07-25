import React, { useState } from 'react';

const anecdotes = [
  {
    anecdote: 'If it hurts, do it more often',
    votes: 0
  },
  {
    anecdote: 'Adding manpower to a late software project makes it later!',
    votes: 0
  },
  {
    anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0
  },
  {
    anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0
  },
  {
    anecdote: 'Premature optimization is the root of all evil.',
    votes: 0
  },
  {
    anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0
  },
  {
    anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients',
    votes: 0
  },
];

const App = () => {

  const initselected = 0;
  const [selected, setSelected] = useState(initselected);
  const [votes, setVotes] = useState(anecdotes[initselected].votes); //votes won't changes after the first render.

  console.log("selected", anecdotes[selected]);
  //console.log("votes", votes, anecdotes[selected].votes);
  console.log("all", anecdotes)

  const [most, setMost] = useState(0);
  if (anecdotes[selected].votes > anecdotes[most].votes)
    setMost(selected);

  const handleClick = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNum)
  };

  const handleVote = () => {
    /*
    let newvote = {
      ...anecdotes,
    };
    newvote[selected].votes++;
     this is a shallow copy, if change newvote, the orginal anecdotes will be changed*/
    anecdotes[selected].votes++;
    setVotes(votes + 1); // setVotes works here as it changes the value of votes, so causes a new render.
  }

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected].anecdote}</p>
        <p>has {anecdotes[selected].votes} votes.</p>
        <button onClick={handleVote}>Vote</button>
        <button onClick={handleClick}>Next Anecdotes</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[most].anecdote}</p>
        <p>has {anecdotes[most].votes} votes.</p>
      </div>
    </>
  )
}



const App2 = () => {
  const initselected = 0
  const [anlist, setanlist] = useState(anecdotes);
  const [selected, setSelected] = useState(initselected);
  const [most, setMost] = useState(0);
  console.log(anlist);

  const handleClick = () => {
    const randomNum = Math.floor(Math.random() * anlist.length);
    setSelected(randomNum)
  };

  const handleVote = () => {
    let newvote = [
      ...anlist,
    ];

   // let a = {name:'f', score:10};
    //let b ={...a, score=11};

    newvote[selected] = {...newvote[selected], votes:newvote[selected].votes+1};

    if (newvote[selected].votes > newvote[most].votes)
      setMost(selected);

    setanlist(newvote);
  }

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anlist[selected].anecdote}</p>
        <p>has {anlist[selected].votes} votes.</p>
        <button onClick={handleVote}>Vote</button>
        <button onClick={handleClick}>Next Anecdotes</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anlist[most].anecdote}</p>
        <p>has {anlist[most].votes} votes.</p>
      </div>
    </>
  )
}

export default App2
