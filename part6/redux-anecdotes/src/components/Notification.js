
import React from 'react'
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => {
    const anecdotes = state.anecdotes;
    let target = anecdotes.find(a => a.id === state.anecdotes[0].id);
    console.log(target, state.selected)
    return target.content;
  })

  console.log(notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(notification=== null) return null;
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification