import { combineReducers } from 'redux'
import activeFilter from './activeFilter'
import todos from './todos'

export default combineReducers({
  activeFilter,
  todos
})
