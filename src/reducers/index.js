import { createStore, combineReducers, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { REHYDRATE } from 'redux-persist/constants'
import sessionReducer from 'reducers/session'

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
  storage: storageReducer
})

const store = createStore(rootReducer, undefined, compose(autoRehydrate()))
persistStore(store)

export default store
