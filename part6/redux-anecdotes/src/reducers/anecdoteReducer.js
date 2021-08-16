import anecService from '../services/anecdotes';



const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action);

  switch (action.type) {
    case 'INIT_ANEC':
      return action.data

    case 'ADD_VOTE': {
      const id = action.data.id;
      const anecdoteToChange = state.find(a => a.id === id);
      console.log('tochange', anecdoteToChange)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };

      return state.map(anec =>
        anec.id !== id ? anec : changedAnecdote)
        .sort((a, b) => b.votes - a.votes)
    }

    case 'NEW_ANEC': {
      return [...state, action.data]
    }

    default:
      return state
  }
};

// before anecdote data is passed to this action creator,
// now the data is got within the function with getAll()
export const initializeAnec = () => {
  return async dispatch => {
    const anecdotes = await anecService.getAll()
    dispatch({
      type: 'INIT_ANEC',
      data: anecdotes
    })
  }
}

export const voteFor = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
};

export const createAnecdote = (data) => {
  return {
    type: "NEW_ANEC",
    data
    /*
    data:{
      content,
      id: getId(),
      votes: 0
    } */
  }
}



export default anecdoteReducer;