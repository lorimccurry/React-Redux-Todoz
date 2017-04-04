import { SET_ACTIVE_FILTER } from '../actions/actions'
import { Record } from 'immutable'

const StatusStateRecord = Record({
  filter: 'all'
})

const DEFAULT_STATE = new StatusStateRecord()

const setActiveFilter = (state, action) => {
  return state.set('filter', action.payload.filter)
}

const activeFilter = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_ACTIVE_FILTER:
      return setActiveFilter(state, action)
    default:
      return state
  }
}

export default activeFilter
