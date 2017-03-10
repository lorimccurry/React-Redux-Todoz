import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import TodoList from './TodoList'
import Items from './Items'
import AddItem from './AddItem'

describe('TodoList', () => {
  it('TodoList snapshot test', () => {
    const component = shallow(<TodoList />)
    const tree = shallowToJson(component)
    expect(tree).toMatchSnapshot()
  })
})

describe('TodoList add item', () => {
  it('renders AddItem component', () => {
    const component = shallow(<TodoList />)
    expect(component.find(AddItem).length).toEqual(1)
  })

  it('tests another way to test rendering AddItem component', () => {
    const component = shallow(<TodoList />)
    expect(component.containsMatchingElement(AddItem)).toEqual(true)
  })

  it('should start with an empty list', () => {
    const component = shallow(<TodoList />)
    expect(component.state('items')).toEqual([])
  })

  it('adds item to the items state', () => {
    const expected = [
      {
        completed: false,
        id: expect.any(String),
        text: 'get beer'
      }
    ]
    const component = shallow(<TodoList />)
    component.instance().handleAddItem('get beer')
    expect(component.state('items')).toEqual(expected)
  })

  it('adds items to the items state', () => {
    const component = shallow(<TodoList />)
    component.instance().handleAddItem('get beer')
    component.instance().handleAddItem('eat')
    component.instance().handleAddItem('sleep')
    expect(component.state('items').length).toEqual(3)
  })

  it('renders instruction message when no items', () => {
    const component = shallow(<TodoList />)
    expect(component.state('items').length).toEqual(0)
    expect(component.contains(<p>Add some todoz!</p>)).toEqual(true)
  })

  it('does not render Items when no items', () => {
    const component = shallow(<TodoList />)
    expect(component.find(Items).length).toEqual(0)
  })

  it('renders Items when item added', () => {
    const component = shallow(<TodoList />)
    component.instance().handleAddItem('get beer')
    expect(component.state('items').length).toEqual(1)
    expect(component.containsMatchingElement(<Items />)).toEqual(true)
  })

  it('passes handleAddItem to AddItem', () => {
    const component = shallow(<TodoList />)
    const addItem = component.find(AddItem)
    const handleAddItem = component.instance().handleAddItem
    expect(addItem.prop('onSubmit')).toEqual(handleAddItem)
  })

  it('passes a bound handleAddItem function to AddItem', () => {
    const component = shallow(<TodoList />)
    const addItem = component.find(AddItem)
    const expected = [
      {
        completed: false,
        id: expect.any(String),
        text: 'get beer'
      }
    ]
    addItem.prop('onSubmit')('get beer')
    expect(component.state('items')).toEqual(expected)
  })
})

describe('TodoList show Item in Items', () => {
  it('renders added items', () => {
    const component = mount(<TodoList />)   
    component.instance().handleAddItem('eat')
    component.instance().handleAddItem('sleep')
    component.instance().handleAddItem('live')
    expect(component.find('li').length).toEqual(3)
  }) 
})

describe('TodoList deletes', () => {
  it('handleDeleteItem deletes item from state and view', () => {
    const component = mount(<TodoList />)
    component.instance().handleAddItem('eat')
    component.instance().handleAddItem('sleep')
    component.instance().handleAddItem('live')
    expect(component.state('items').length).toEqual(3)
    expect(component.find('li').length).toEqual(3)

    const itemID = component.state('items')[0].id
    component.instance().handleDeleteItem(itemID)
    expect(component.state('items').length).toEqual(2)
    expect(component.find('li').length).toEqual(2)
  })

  it('deletes and renders the correct item when delete button clicked', () => {
    const component = mount(<TodoList />)
    component.instance().handleAddItem('eat')
    component.instance().handleAddItem('sleep')
    component.instance().handleAddItem('live')
    expect(component.find('li').length).toEqual(3)

   const deleteItem = component.find('Item').first()
    const deleteItemID = deleteItem.prop('id')
    const origItemsArr = component.find('Items').prop('items')

    function isMatchingItem(item) {
      return item.id === deleteItemID 
    }
    const initialMatchingItemsArr = origItemsArr.filter(isMatchingItem)
    expect(initialMatchingItemsArr.length).toEqual(1)

    const deleteBtn = deleteItem.find('.delete-btn')
    deleteBtn.simulate('click')

    const updatedItemsArr = component.find('Items').prop('items')
    const finalMatchingItemsArr = updatedItemsArr.filter(isMatchingItem)

    expect(component.find('li').length).toEqual(2)
    expect(finalMatchingItemsArr.length).toEqual(0)
  })
})

describe('TodoList Edit', () => {
  it('updates EditItem state and view', () => {
    const component = mount(<TodoList />)
    component.instance().handleAddItem('eat')
    component.instance().handleAddItem('sleep')
    component.instance().handleAddItem('live')

    const editBtn = component.find('.edit-btn').first()
    editBtn.simulate('click')

    const updateInput = component.find('.update-input')
    expect(updateInput.prop('value')).toEqual('eat')

    const event = {target: {type: 'text', name: 'text', value: 'codez'}}
    updateInput.simulate('change', event)

    const itemStateText = component.state('items')[0].text
    const itemValue = updateInput.prop('value')
    expect(itemStateText).toEqual('codez')
    expect(itemValue).toEqual('codez')
  })

  it('updates Item text state and view', () => {
    const component = mount(<TodoList />)
    component.instance().handleAddItem('eat')
    component.instance().handleAddItem('sleep')
    component.instance().handleAddItem('live')

    let item = component.find('Item').first()
    const itemStateText = component.state('items')[0].text
    const itemValue = item.find('.item-text').text()
    expect(itemStateText).toEqual('eat')
    expect(itemValue).toEqual('eat')

    const editBtn = item.find('.edit-btn')
    editBtn.simulate('click')

    const editItem = component.find('EditItem')
    const updateInput = editItem.find('.update-input')
    const updateBtn = editItem.find('.update-btn')
    const updateEvent = {target: {type: 'text', name: 'text', value: 'codez'}}
    updateInput.simulate('change', updateEvent)
    updateBtn.simulate('click')

    item = component.find('Item').first()
    const updatedItemStateText = component.state('items')[0].text
    const updatedItemValue = item.find('.item-text').text()
    expect(updatedItemStateText).toEqual('codez')
    expect(updatedItemValue).toEqual('codez')
  })

  it('updates Item checkbox state and view', () => {
    const component = mount(<TodoList />)
    component.instance().handleAddItem('eat')
    component.instance().handleAddItem('sleep')
    component.instance().handleAddItem('live')

    let item = component.find('Item').first()
    const itemCheckbox = item.find('input[name="completed"]')
    const itemCheckboxState = component.state('items')[0].completed
    const itemCheckboxChecked = itemCheckbox.prop('checked')
    expect(itemCheckboxState).toEqual(false)
    expect(itemCheckboxChecked).toEqual(false)

    itemCheckbox.simulate('change')
    const updatedItemCheckboxState = component.state('items')[0].completed
    const updatedItemCheckboxChecked = itemCheckbox.prop('checked')
    expect(updatedItemCheckboxState).toEqual(true)
    expect(updatedItemCheckboxChecked).toEqual(true)
  })
})
