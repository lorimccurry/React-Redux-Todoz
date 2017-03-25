import { ADD_ITEM, SET_EDIT_ID, SET_ITEMS, SET_UPDATE_TEXT } from './actions'
import shortid from 'shortid'

export function addItem (text) {
  return {
    type: ADD_ITEM,
    payload: {
      item: {
        completed: false,
        id: shortid.generate(),
        text
      }
    }
  }
}

export function setEditID (editID) {
  return {
    type: SET_EDIT_ID,
    payload: {
      editID
    }
  }
}

export function setItems (items) {
  return { type: SET_ITEMS, items }
}

export function setUpdateText (text) {
  return {
    type: SET_UPDATE_TEXT,
    payload: {
      text
    }
  }
}
