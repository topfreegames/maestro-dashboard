import { schedulers } from 'constants/actions'

const initialState = {
  index: {
    fetching: false
  },
  show: {}
}

const schedulersReducer = (state = initialState, action) => {
  switch (action.type) {
    case schedulers.indexFetch:
      return {
        ...state,
        index: {
          ...state.index,
          [action.cluster]: {
            ...state.index[action.cluster],
            error: {},
            fetching: true
          }
        }
      }
    case schedulers.indexFetchSuccess:
      return {
        ...state,
        index: {
          ...state.index,
          [action.cluster]: {
            ...state.index[action.cluster],
            schedulers: action.schedulers,
            fetching: false
          }
        }
      }
    case schedulers.showFetch:
      return {
        ...state,
        show: {
          ...state.show,
          [action.name]: {
            ...state.show[action.name],
            fetching: true,
            error: {}
          }
        }
      }
    case schedulers.showFetchSuccess:
      return {
        ...state,
        show: {
          ...state.show,
          [action.scheduler.name]: {
            ...state.show[action.name],
            ...action.scheduler,
            fecthing: false
          }
        }
      }
    default:
      return state
  }
}

export default schedulersReducer
