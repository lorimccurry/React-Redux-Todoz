import reducer from './reducers'
import { ADD_ITEM, DELETE_ITEM, SET_EDIT_ID, SET_TOGGLE_COMPLETE, SET_UPDATE_TEXT } from './actions'
import { addItem, deleteItem, setEditID, setToggleComplete, setUpdateText } from './actionCreators'
import { toJS } from 'immutable'

describe('root reducer', () => {
  function getStateWithItems (state) {
    let action = addItem('i eat beans')
    state = reducer(state, action)

    action = addItem('i eat pizza')
    state = reducer(state, action)

    action = addItem('i eat cat')
    return reducer(state, action)
  }

  it('initializes with initial state', () => {
    const state = reducer(undefined, {})

    expect(state.get('items').toJS()).toEqual([])
    expect(state.get('editID')).toEqual('')
  })

  it('adds an item', () => {
    let state = reducer(undefined, {})
    expect(state.get('items').size).toEqual(0)

    const action = addItem('i eat beans')
    state = reducer(state, action)

    expect(state.get('items').size).toEqual(1)
    expect(state.get('items').toJS()).toEqual([{
      completed: false,
      id: expect.any(String),
      text: 'i eat beans'
    }])
  })

  it('adds many items', () => {
    let state = reducer(undefined, {})
    expect(state.get('items').size).toEqual(0)

    state = getStateWithItems(state)

    expect(state.get('items').size).toEqual(3)
    expect(state.get('items').toJS()).toEqual([
      {
        completed: false,
        id: expect.any(String),
        text: 'i eat beans'
      },
      {
        completed: false,
        id: expect.any(String),
        text: 'i eat pizza'
      },
      {
        completed: false,
        id: expect.any(String),
        text: 'i eat cat'
      }
    ])
  })

  it('deletes items', () => {
    let state = reducer(undefined, {})

    state = getStateWithItems(state)
    expect(state.get('items').size).toEqual(3)

    let deleteID = state.get('items').get(0).get('id') 
    let action = deleteItem(deleteID)
    state = reducer(state, action)

    expect(state.get('items').size).toEqual(2)
    expect(state.get('items').get(0).get('id')).not.toBe(deleteID)
    expect(state.get('items').get(1).get('id')).not.toBe(deleteID)

    deleteID = state.get('items').get(1).get('id') 
    action = deleteItem(deleteID)
    state = reducer(state, action)

    expect(state.get('items').size).toEqual(1)
    expect(state.get('items').get(0).get('id')).not.toBe(deleteID)
  })

  it('sets the Edit ID', () => {
    let state = reducer(undefined, {})

    state = getStateWithItems(state)

    let editID = state.get('items').get(0).get('id') 
    let action = setEditID(editID)
    state = reducer(state, action)

    expect(state.get('editID')).toEqual(editID)
  })

  it('edits the Item text', () => {
    let state = reducer(undefined, {})

    state = getStateWithItems(state)
    expect(state.get('items').get(0).get('text')).toEqual('i eat beans')

    let editID = state.get('items').get(0).get('id') 
    let action = setEditID(editID)
    state = reducer(state, action)


    action = setUpdateText('double rainbow')
    state = reducer(state, action)

    expect(state.get('items').get(0).get('text')).toEqual('double rainbow')
  })

  it('toggles complete', () => {
    let state = reducer(undefined, {})

    state = getStateWithItems(state)
    expect(state.get('items').get(0).get('completed')).toEqual(false)

    let itemID = state.get('items').get(0).get('id') 
    let action = setToggleComplete(itemID)
    state = reducer(state, action)
    expect(state.get('items').get(0).get('completed')).toEqual(true)

    action = setToggleComplete(itemID)
    state = reducer(state, action)
    expect(state.get('items').get(0).get('completed')).toEqual(false)
  })
})
