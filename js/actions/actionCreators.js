import { ADD_ITEM, DELETE_ITEM, SET_ACTIVE_FILTER, SET_EDIT_ID, SET_TOGGLE_COMPLETE, SET_UPDATE_TEXT } from './actions'
import shortid from 'shortid'
import { all } from '../constants'

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

export function deleteItem (deleteID) {
  return {
    type: DELETE_ITEM,
    payload: {
      deleteID
    }
  }
}

export function setActiveFilter (filter = all) {
  return {
    type: SET_ACTIVE_FILTER,
    payload: {
      filter
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

export function setToggleComplete (itemID) {
  return {
    type: SET_TOGGLE_COMPLETE,
    payload: {
      itemID
    }
  }
}

export function setUpdateText (text) {
  return {
    type: SET_UPDATE_TEXT,
    payload: {
      text
    }
  }
}
