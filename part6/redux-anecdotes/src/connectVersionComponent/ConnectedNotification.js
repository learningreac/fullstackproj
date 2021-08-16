
import React from 'react'
import { connect } from 'react-redux';

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1
}

const Notification = (props) => {

  const anecdotes = props.anecdotes;
  let target = anecdotes.find(a => a.id == props.selected);
  console.log('target', target)

  if (!target) return null;
  return (
    <div style={style}>
      <p>You voted '{target.content}'</p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    selected: state.selected
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification