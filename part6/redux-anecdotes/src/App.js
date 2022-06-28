import React, { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList';
//import NewAnecdoteForm from './components/AnecdoteForm';
import ConnectedAnecdoteForm from './connectVersionComponent/ConnectedAnecdoteForm';
//import Notification  from './components/Notification';
import ConnectedNotification from './connectVersionComponent/ConnectedNotification';
//import Filter from './components/VisibilityFilter';
import ConnectedFilter from './connectVersionComponent/ConnectedFilter';
import { useDispatch } from 'react-redux';
import { initializeAnec } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnec())
  },[]) 
 
  return (
    <div className='container'>
      <h2 className='p-3'>Anecdotes</h2>
      <ConnectedNotification />
      <ConnectedFilter />
      <AnecdoteList />
      <ConnectedAnecdoteForm />      
    </div>
  )
}

export default App