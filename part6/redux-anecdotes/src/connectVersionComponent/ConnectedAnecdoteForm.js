import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const NewAnecdote = (props) => {

    const addNewAnec = async (event) => {
        event.preventDefault();
        const content = event.target.anec.value;
        event.target.anec.value = "";
        props.createAnecdote(content);
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addNewAnec}>
                <div><input name="anec" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

const mapDispatchToState = {
     createAnecdote
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToState)(NewAnecdote)
export default ConnectedAnecdoteForm;