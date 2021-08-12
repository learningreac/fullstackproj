import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer';
import { setNotice } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    console.log('current state', anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteFor(id));
    };

    const notice = id => {
        dispatch(setNotice(id));
        setTimeout( () => dispatch(setNotice(null)), 5000)
    }


    if (anecdotes === undefined) return null;


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
                        <button onClick={() => {
                            vote(anecdote.id)
                            notice(anecdote.id) 
                            }}> vote </button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default AnecdoteList;