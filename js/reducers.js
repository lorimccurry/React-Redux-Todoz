import { SET_ITEM_INPUT, SET_ITEMS } from './actions'

const DEFAULT_STATE = {
  itemInput: '',
  items: []
}

const setItemInput = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {itemInput: action.itemInput})
  return newState
}

const setItems = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {items: action.items})
  return newState
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_ITEM_INPUT:
      return setItemInput(state, action)
    case SET_ITEMS:
      return setItems(state, action)
    default:
      return state
  }
}

export default rootReducer
