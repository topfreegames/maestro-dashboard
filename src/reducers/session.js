const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SESSION/SUCCESS':
      return {
        token: action.token
      }
    default:
      return state
  }
}

export default sessionReducer
