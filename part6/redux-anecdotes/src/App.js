import React, { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList';
import NewAnecdoteForm from './components/NewAnecdote';
import Notification  from './components/Notification';
import Filter from './components/VisibilityFilter';
import { useDispatch } from 'react-redux';
import anecService from './services/anecdotes';
import { initializeAnec } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecService
      .getAll().then(anecdotes => dispatch(initializeAnec(anecdotes)))

  },[]) 
 
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <NewAnecdoteForm />      
    </div>
  )
}

export default App