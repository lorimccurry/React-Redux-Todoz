import reducer from './index'
import { SET_ACTIVE_FILTER } from '../actions/actions'
import { addItem, setActiveFilter } from '../actions/actionCreators'
import { all, completed, uncompleted } from '../constants'

describe('status reducer', () => {
  function getStateWithItems (state) {
    let action = addItem('i eat beans')
    state = reducer(state, action)

    action = addItem('i eat pizza')
    state = reducer(state, action)

    action = addItem('i eat cat')
    return reducer(state, action)
  }

  it('initializes with all filter', () => {
    let state = reducer(undefined, {})
    expect(state.activeFilter.get('filter')).toEqual('all')
  })

  it('should return correct filter', () => {
    let state = reducer(undefined, {})

    state = getStateWithItems(state) 

    let action = setActiveFilter(all)
    state = reducer(state, action)
    expect(state.activeFilter.get('filter')).toEqual(all)

    action = setActiveFilter(completed)
    state = reducer(state, action)
    expect(state.activeFilter.get('filter')).toEqual(completed)

    action = setActiveFilter(uncompleted)
    state = reducer(state, action)
    expect(state.activeFilter.get('filter')).toEqual(uncompleted)
  })

  it('should handle no filter passed in as all', () => {
    let state = reducer(undefined, {})

    let action = setActiveFilter()
    state = reducer(state, action)
    expect(state.activeFilter.get('filter')).toEqual(all)
  })

})
