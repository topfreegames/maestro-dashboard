import { schedulers } from 'constants/actions'

const initialState = {
  index: {
    schedulers: [],
    fetching: false
  }
}

const schedulersReducer = (state = initialState, action) => {
  switch (action.type) {
    case schedulers.indexFetch:
      return {
        ...state,
        index: {
          ...state.index,
          error: {},
          fetching: true
        }
      }
    case schedulers.indexFetchSuccess:
      return {
        ...state,
        index: {
          ...state.index,
          schedulers: action.schedulers,
          fetching: false
        }
      }
    default:
      return state
  }
}

export default schedulersReducer
