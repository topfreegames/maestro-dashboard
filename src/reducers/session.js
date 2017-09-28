import { session } from 'constants/actions'

const sessionReducer = (state = {}, action) => {
  console.log(action)
  switch (action.type) {
    case session.setToken:
      return {
        ...state,
        token: action.token
      }
    case session.setCode:
      return {
        ...state,
        code: action.code
      }
    default:
      return state
  }
}

export default sessionReducer
