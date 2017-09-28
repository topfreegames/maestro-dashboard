import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { autoRehydrate } from 'redux-persist'
import sessionReducer from 'reducers/session'
import schedulersReducer from 'reducers/schedulers'
import clustersReducer from 'reducers/clusters'

const rootReducer = combineReducers({
  session: sessionReducer,
  schedulers: schedulersReducer,
  clusters: clustersReducer
})

const store = createStore(rootReducer, undefined, compose(applyMiddleware(thunk), autoRehydrate()))

export default store
