
import React from 'react'
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => {
    const anecdotes = state.anecdotes;
    let target = anecdotes.find(a => a.id == state.selected);
    console.log('target',target)
    //console.log(typeof target)
    //if (target) console.log(target.content)
    if(target) return target.content;
  })

  console.log(notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(!notification) return null;
  return (
    <div style={style}>
      <p>You voted '{notification}'</p>
    </div>
  )
}

export default Notification