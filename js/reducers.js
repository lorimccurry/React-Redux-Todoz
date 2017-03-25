import { ADD_ITEM, SET_EDIT_ID, SET_ITEMS, SET_UPDATE_TEXT } from './actions'
import { List, Record, fromJS } from 'immutable'

const AppStateRecord = Record({
  items: new List(),
  editID: ''
})

const DEFAULT_STATE = new AppStateRecord()

const setEditID = (state, action) => {
  return state.set('editID', action.payload.editID)
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

const setUpdateText = (state, action) => {
  const updateIndex = state.get('items').findIndex(item => {
    return item.get('id') === state.get('editID')
  })
  return state.setIn(['items', updateIndex, 'text'], action.payload.text)
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return addItem(state, action)
    case SET_EDIT_ID:
      return setEditID(state, action)
    case SET_ITEMS:
      return setItems(state, action)
    case SET_UPDATE_TEXT:
      return setUpdateText(state, action)
    default:
      return state
  }
}

export default rootReducer
