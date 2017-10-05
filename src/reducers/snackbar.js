import { snackbar } from 'constants/actions'

const initialState = null

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case snackbar.set:
      return {
        ...state,
        uuid: (state && state.uuid + 1) || 0,
        text: action.text,
        action: action.action,
        isError: action.isError
      }
    default:
      return state
  }
}

export default snackbarReducer
