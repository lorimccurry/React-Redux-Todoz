import { SET_ITEM_INPUT, SET_ITEMS } from './actions'

export function setItemInput (itemInput) {
  return { type: SET_ITEM_INPUT, itemInput }
}

export function setItems (items) {
  return { type: SET_ITEMS, items }
}
