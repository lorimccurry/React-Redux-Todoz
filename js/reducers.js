import { SET_ITEM_INPUT } from './actions'

const DEFAULT_STATE = {
  itemInput: ''
}

const setItemInput = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {itemInput: action.itemInput})
  return newState
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_ITEM_INPUT:
      return setItemInput(state, action)
    default:
      return state
  }
}

export default rootReducer
