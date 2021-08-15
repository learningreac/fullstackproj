
const notificationReducer = (state = '', action) => {
    // console.log('state now: ', state)
    // console.log('action', action)

    switch (action.type) {
        case 'SET_SELECTED': {
            return action.selected
        }
        default:
            return state
    }

};

export const setNotice = selected =>
({
    type: 'SET_SELECTED',
    selected
})


export default notificationReducer;