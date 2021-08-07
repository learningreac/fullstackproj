import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor,addNew } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state)
  console.log('current state', anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id));
  };

  const addNewAnec = (event) => {
    event.preventDefault();
    const content = event.target.anec.value;
    event.target.anec.value = "";
    dispatch(addNew(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addNewAnec}>
        <div><input name="anec"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App