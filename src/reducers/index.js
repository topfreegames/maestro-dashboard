import { createStore, combineReducers } from 'redux'
import sessionReducer from 'reducers/session'

const rootReducer = combineReducers({
  session: sessionReducer
})

const store = createStore(rootReducer)

export default store
