import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { autoRehydrate } from 'redux-persist'
import sessionReducer from 'reducers/session'
import schedulersReducer from 'reducers/schedulers'
import clustersReducer from 'reducers/clusters'
import snackbarReducer from 'reducers/snackbar'
import actions from 'constants/actions'

const appReducer = combineReducers({
  session: sessionReducer,
  schedulers: schedulersReducer,
  clusters: clustersReducer,
  snackbar: snackbarReducer
})

const rootReducer = (state = {}, action) => {
  let statePrime = state

  if (action.type === 'PURGE') {
    statePrime = {}
  } else if (action.type === actions.clusters.selectSuccess) {
    statePrime = {
      ...state,
      schedulers: undefined
    }
  }

  return appReducer(statePrime, action)
}

const store = createStore(rootReducer, undefined, compose(applyMiddleware(thunk), autoRehydrate()))

export default store
