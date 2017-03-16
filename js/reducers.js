import { ADD_ITEM, SET_EDIT_ID, SET_ITEM_INPUT, SET_ITEMS } from './actions'

const DEFAULT_STATE = {
  itemInput: '',
  items: [],
  editID: ''
}

const addItem = (state, action) => {
  return {
    ...state,
    items: [
      ...state.items,
      action.payload.item
    ]
  }
}

const setItemInput = (state, action) => {
  return {
    ...state,
    itemInput: action.payload.itemInput
  }
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
    case SET_ITEM_INPUT:
      return setItemInput(state, action)
    case SET_ITEMS:
      return setItems(state, action)
    default:
      return state
  }
}

export default rootReducer
