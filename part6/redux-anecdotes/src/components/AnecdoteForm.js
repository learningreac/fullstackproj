import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import anecService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch();

    const addNewAnec = async (event) => {
        event.preventDefault();
        const content = event.target.anec.value;
        event.target.anec.value = "";
        const newAnec = await anecService.createNew(content)
        dispatch(createAnecdote(newAnec))
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

export default AnecdoteForm