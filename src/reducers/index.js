import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
import { REHYDRATE } from 'redux-persist/constants'
import sessionReducer from 'reducers/session'
import schedulersReducer from 'reducers/schedulers'

const storageReducer = (state = {
  rehydrated: false
}, action) => {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...state,
        rehydrated: true
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  session: sessionReducer,
  schedulers: schedulersReducer,
  storage: storageReducer
})

const store = createStore(rootReducer, undefined, compose(applyMiddleware(thunk), autoRehydrate()))
persistStore(store)

export default store
