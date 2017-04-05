import React from 'react'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import store from '../store/store'
import { addItem, deleteItem, setActiveFilter, setToggleComplete } from '../actions/actionCreators'
import TodoList from './TodoList'
import { Unwrapped as UnwrappedTodoList } from './TodoList'
import Items from './Items'
import Item from './Item'
import EditItem from './EditItem'
import AddItem from './AddItem'
import Filters from './Filters'
import { completed, uncompleted, all } from '../constants'

describe('TodoList', () => {
  it('TodoList snapshot test', () => {
    const stateItems = store.getState().todos.get('items')
    const stateEditID = store.getState().todos.get('editID') 
    const component = shallow(<UnwrappedTodoList items={stateItems} editID={stateEditID} />)
    const tree = shallowToJson(component)
    expect(tree).toMatchSnapshot()
  })

  it('renders AddItem component', () => {
    const stateItems = store.getState().todos.get('items')
    const stateEditID = store.getState().todos.get('editID') 
    const component = shallow(<UnwrappedTodoList items={stateItems} editID={stateEditID} />)
    expect(component.find(AddItem).length).toEqual(1)
  })

  it('should start with an empty list', () => {
    const stateItems = store.getState().todos.get('items')
    const stateEditID = store.getState().todos.get('editID') 
    const component = shallow(<UnwrappedTodoList items={stateItems} editID={stateEditID} />)
    const p = component.find('p')
    expect(component.find('li').length).toEqual(0)
    expect(p.length).toEqual(1)
    expect(p.text()).toEqual('Add some todoz!')
    expect(stateItems.size).toEqual(0)
  })

  it('renders instruction message when no items', () => {
    const stateItems = store.getState().todos.get('items')
    const stateEditID = store.getState().todos.get('editID') 
    const component = shallow(<UnwrappedTodoList items={stateItems} editID={stateEditID} />)
    expect(stateItems.size).toEqual(0)
    expect(component.contains(<p className='add-msg'>Add some todoz!</p>)).toEqual(true)
  })

  it('renders Items when items and add message when deleted and no items', () => {
    const component = mount(<Provider store={store}><TodoList /></Provider>)
    store.dispatch(addItem('get beer'))

    expect(component.containsMatchingElement(<Items />)).toEqual(true)
    expect(component.contains(<p className='add-msg'>Add some todoz!</p>)).toEqual(false)

    const deleteID = store.getState().todos.get('items').get(0).get('id')
    store.dispatch(deleteItem(deleteID))

    expect(component.containsMatchingElement(<Items />)).toEqual(false)
    expect(component.contains(<p className='add-msg'>Add some todoz!</p>)).toEqual(true)
  })

  it('renders Filters', () => {
    const stateItems = store.getState().todos.get('items')
    const stateEditID = store.getState().todos.get('editID') 
    const component = shallow(<UnwrappedTodoList items={stateItems} editID={stateEditID} />)
    expect(component.containsMatchingElement(<Filters />)).toEqual(true)
  })
})

describe('TodoList integration testing', () => {
  it('adds items to the store and view', () => {
    const component = mount(<Provider store={store}><TodoList /></Provider>)

    expect(component.containsMatchingElement(<Items />)).toEqual(false)
    expect(component.contains(<p className='add-msg'>Add some todoz!</p>)).toEqual(true)
    expect(store.getState().todos.get('items').size).toEqual(0)

    const addInput = component.find('input[type="text"]')
    addInput.simulate('change', {target: {value: 'get beer'}})

    const addForm = component.find('form')
    addForm.simulate('submit')

    expect(component.containsMatchingElement(<Items />)).toEqual(true)
    expect(component.contains(<p>Add some todoz!</p>)).toEqual(false)
    expect(store.getState().todos.get('items').size).toEqual(1)
    expect(component.containsMatchingElement(<Item />)).toEqual(true)
    expect(component.containsMatchingElement(<EditItem />)).toEqual(false)
    expect(component.find(Item).length).toEqual(1)
    expect(addInput.prop('value')).toEqual('')

    addInput.simulate('change', {target: {value: 'get coffee'}})
    addForm.simulate('submit')
    expect(component.find(Item).length).toEqual(2)
  })

  it('deletes items from store and view', () => {
    const component = mount(<Provider store={store}><TodoList /></Provider>)
    expect(component.find(Item).length).toEqual(2)

    let item = component.find(Item).first()
    let  deleteBtn = item.find('.delete-btn')
    deleteBtn.simulate('click')

    expect(component.find(Item).length).toEqual(1)
    expect(store.getState().todos.get('items').size).toEqual(1)

    item = component.find(Item)
    deleteBtn = item.find('.delete-btn')
    deleteBtn.simulate('click')

    expect(component.containsMatchingElement(<Items />)).toEqual(false)
    expect(component.contains(<p className='add-msg'>Add some todoz!</p>)).toEqual(true)
    expect(store.getState().todos.get('items').size).toEqual(0)
  })

  it('edits item text and store', () => {
    const component = mount(<Provider store={store}><TodoList /></Provider>)
    store.dispatch(addItem('eat'))
    store.dispatch(addItem('sleep'))
    store.dispatch(addItem('code'))

    let item = component.find(Item).first()
    expect(item.find('.item-text').text()).toEqual('eat')

    const editBtn = item.find('.edit-btn')
    editBtn.simulate('click')

    expect(component.find(EditItem).length).toEqual(1)
    expect(component.find(Item).length).toEqual(2)

    const updateInput = component.find('.update-input')
    expect(updateInput.prop('value')).toEqual('eat')

    const event = {target: {type: 'text', name: 'text', value: 'live'}}
    updateInput.simulate('change', event)

    const itemStoreText = store.getState().todos.get('items').get(0).get('text')
    const itemValue = updateInput.prop('value')
    expect(itemStoreText).toEqual('live')
    expect(itemValue).toEqual('live')

    const updateBtn = component.find('.update-btn')
    updateBtn.simulate('click')

    item = component.find(Item).first()

    expect(item.find('.item-text').text()).toEqual('live')
    expect(component.find(EditItem).length).toEqual(0)
    expect(component.find(Item).length).toEqual(3)
  })

  it('toggles item checkbox state and view', () => {
    const component = mount(<Provider store={store}><TodoList /></Provider>)

    let item = component.find('Item').first()
    const itemCheckbox = item.find('input[name="completed"]')
    const itemCheckboxStore = store.getState().todos.get('items').get(0).get(completed)
    const itemCheckboxChecked = itemCheckbox.prop('checked')
    expect(itemCheckboxStore).toEqual(false)
    expect(itemCheckboxChecked).toEqual(false)

    itemCheckbox.simulate('change')
    let updatedItemCheckboxStore = store.getState().todos.get('items').get(0).get(completed)
    let updatedItemCheckboxChecked = itemCheckbox.prop('checked')

    expect(updatedItemCheckboxStore).toEqual(true)
    expect(updatedItemCheckboxChecked).toEqual(true)

    itemCheckbox.simulate('change')
    updatedItemCheckboxStore = store.getState().todos.get('items').get(0).get(completed)
    updatedItemCheckboxChecked = itemCheckbox.prop('checked')

    expect(updatedItemCheckboxStore).toEqual(false)
    expect(updatedItemCheckboxChecked).toEqual(false)
  })

  it('filters items', () => {
    const component = mount(<Provider store={store}><TodoList /></Provider>)
    // make item1 completed 
    let item1 = store.getState().todos.get('items').get(0)
    store.dispatch(setToggleComplete(item1.get('id')))

    item1 = store.getState().todos.get('items').get(0)
    let item2 = store.getState().todos.get('items').get(1)
    let item3 = store.getState().todos.get('items').get(2)
    let items = store.getState().todos.get('items')

    expect(items.size).toEqual(3)
    expect(item1.get(completed)).toEqual(true)
    expect(item2.get(completed)).toEqual(false)
    expect(item3.get(completed)).toEqual(false)

    // test 3 filters
    store.dispatch(setActiveFilter(uncompleted))
    expect(component.find(Item).length).toEqual(2)

    store.dispatch(setActiveFilter(completed))
    expect(component.find(Item).length).toEqual(1)

    store.dispatch(setActiveFilter(all))
    expect(component.find(Item).length).toEqual(3)

    // make all items uncompleted
    item1 = store.getState().todos.get('items').get(0)
    store.dispatch(setToggleComplete(item1.get('id')))

    item1 = store.getState().todos.get('items').get(0)
    expect(item1.get(completed)).toEqual(false)

    // handle an undefined items or filteredItems case
    store.dispatch(setActiveFilter(completed))
    expect(component.find(Item).length).toEqual(0)
  })
})
