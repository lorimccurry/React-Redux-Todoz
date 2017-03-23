import { ADD_ITEM, SET_EDIT_ID, SET_ITEMS } from './actions'
import { List, Record, fromJS } from 'immutable'

const AppStateRecord = Record({
  items: new List()
})

const DEFAULT_STATE = new AppStateRecord()

const setEditID = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {editID: action.editID})
  return newState
}

const addItem = (state, action) => {
  const updatedItemsList = state.get('items').push(fromJS(action.payload.item))
  return state.set('items', updatedItemsList)
}

const setItems = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {items: action.items})
  return newState
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return addItem(state, action)
    case SET_EDIT_ID:
      return setEditID(state, action)
    case SET_ITEMS:
      return setItems(state, action)
    default:
      return state
  }
}

export default rootReducer
