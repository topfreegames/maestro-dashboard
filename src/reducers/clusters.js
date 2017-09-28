import { clusters } from 'constants/actions'

const initialState = {
  fetching: false,
  error: {},
  selecting: null,
  current: null
}

const clustersReducer = (state = initialState, action) => {
  switch (action.type) {
    case clusters.select:
      return {
        ...state,
        selecting: action.selecting,
        fetching: true,
        error: {}
      }
    case clusters.selectSuccess:
      return {
        ...state,
        [state.selecting.name]: {
          ...state.selecting,
          token: action.token
        },
        current: state.selecting.name,
        selecting: null,
        fetching: false,
        error: {}
      }
    default:
      return state
  }
}

export default clustersReducer
