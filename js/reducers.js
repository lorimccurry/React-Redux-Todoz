import { ADD_ITEM, DELETE_ITEM, SET_EDIT_ID, SET_TOGGLE_COMPLETE, SET_UPDATE_TEXT } from './actions'
import { List, Record, fromJS } from 'immutable'

const AppStateRecord = Record({
  items: new List(),
  editID: ''
})

const DEFAULT_STATE = new AppStateRecord()

const addItem = (state, action) => {
  const updatedItemsList = state.get('items').push(fromJS(action.payload.item))
  return state.set('items', updatedItemsList)
}

const deleteItem = (state, action) => {
  const deleteIndex = state.get('items').findIndex(item => {
    return (item.get('id') === action.payload.deleteID)
  })
  const updatedItemsList = state.get('items').delete(deleteIndex)
  return state.set('items', updatedItemsList)
}

const setEditID = (state, action) => {
  return state.set('editID', action.payload.editID)
}

const setToggleComplete = (state, action) => {
  const updatedItemsList = state.get('items').map(item => {
    if (item.get('id') === action.payload.itemID) {
      return item.update('completed', val => !val)
    }
    return item
  })
  return state.set('items', updatedItemsList)
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
    case DELETE_ITEM:
      return deleteItem(state, action)
    case SET_EDIT_ID:
      return setEditID(state, action)
    case SET_TOGGLE_COMPLETE:
      return setToggleComplete(state, action)
    case SET_UPDATE_TEXT:
      return setUpdateText(state, action)
    default:
      return state
  }
}

export default rootReducer
