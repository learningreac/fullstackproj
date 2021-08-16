
import React from 'react'
import { connect } from 'react-redux';

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1
}

const Notification = (props) => {
  if (!props.target) return null;
  return (
    <div style={style}>
      <p>You voted '{props.target.content}'</p>
    </div>
  )
};

const mapStateToProps = (state) => {
  const anecdotes = state.anecdotes;
  const target = anecdotes.find(a => a.id == state.selected);
  //console.log('target', target)

  return {
    target
  }
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;