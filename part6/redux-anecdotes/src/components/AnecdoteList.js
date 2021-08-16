import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer';
import { setNotice } from '../reducers/notificationReducer'

let timeoutID;

const AnecdoteList = () => {
    //const anecdotes = useSelector(state => state.anecdotes)
    const anecdotes = useSelector(state => {
        const regex = new RegExp(state.filter, "i");
        if (state.filter === null) {
            return state.anecdotes
        }
        return state.anecdotes.filter(a => a.content.match(regex))
    })
    //console.log('current state', anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteFor(id));
    };

    
    const notice = id => {
        dispatch(setNotice(id));
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => dispatch(setNotice(null)), 5000);
    }

    if (anecdotes === undefined) return null;
    return (
        <div>

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