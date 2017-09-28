import { session } from 'constants/actions'

const initialState = {
  code: null,
  token: null
}

const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case session.setToken:
      return {
        ...state,
        token: action.token,
        code: null
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
