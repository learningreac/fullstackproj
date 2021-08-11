import initialState from "../store";
import { getId } from "../store";



const anecdoteReducer = (state = initialState.anecdotes, action) => {
  console.log('state now: ', state)
  console.log('action', action);


  switch(action.type) {
    case 'ADD_VOTE': {
      const id = action.data.id;
      const anecdoteToChange = state.find(a => a.id === id);
      console.log('tochange',anecdoteToChange)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };

      return state.map(anec => 
        anec.id !== id? anec : changedAnecdote)
        .sort((a,b) => b.votes - a.votes)
    }
    case 'NEW_ANEC': {
      return [...state, action.data]
    }
    default:
      return state
  }  
}

export const voteFor = (id) => {
  return {
    type:'ADD_VOTE',
    data: {id}
  }
};

export const createAnecdote = (content) => {
  return {
    type:"NEW_ANEC",
    data:{
      content,
      id: getId(),
      votes: 0
    }
  }
}



export default anecdoteReducer;