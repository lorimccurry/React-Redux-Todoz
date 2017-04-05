import React from 'react'
import { Provider } from 'react-redux'
import { Map } from 'immutable'
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { spy } from 'sinon'
import { Unwrapped as UnwrappedItem } from './Item'

describe('Item', () => {
  function getImmutableItem () {
    return Map({
      completed: false,
      id: 'iou12oiv',
      text: 'do the codez' 
    })
  }

  it('Item snapshot test', () => {
    const item = getImmutableItem()
    const component = shallow(<UnwrappedItem key={item.get('id')} item={item} />) 
    const tree = shallowToJson(component)
    expect(tree).toMatchSnapshot()
  })

  it('should render an li, checkbox, text, delete button, edit button', () => {
    const item = getImmutableItem()
    const component = render(<UnwrappedItem key={item.get('id')} item={item} />) 
    expect(component.find('li').length).toEqual(1)
    expect(component.find('input[type="checkbox"]').length).toEqual(1)
    expect(component.find('.item-text').length).toEqual(1)
    expect(component.find('.edit-btn').length).toEqual(1)
    expect(component.find('.delete-btn').length).toEqual(1)
  })

  it('should render an item with given completed status, id, and text', () => {
    const item = getImmutableItem()
    const component = mount(<UnwrappedItem key={item.get('id')} item={item} />) 
    const input = component.find('input[type="checkbox"]')
    const span = component.find('.item-text')
    expect(span.text()).toEqual('do the codez')
    expect(input.prop('checked')).toEqual(false)
  })

  it('should call dispatchToggleComplete when checkbox is clicked', () => {
    const item = getImmutableItem()
    const checkboxSpy = spy()
    const component = mount(<UnwrappedItem key={item.get('id')} item={item} dispatchToggleComplete={checkboxSpy} />) 
    const checkbox = component.find('input[type="checkbox"]')
    checkbox.simulate('change', {type: 'change'})

    expect(checkboxSpy.calledOnce).toEqual(true)
    expect(checkboxSpy.calledWith(item.get('id'))).toEqual(true)
  })

  it('should call dispatchToggleComplete when checkbox keyDown return key', () => {
    const item = getImmutableItem()
    const checkboxSpy = spy()
    const component = mount(<UnwrappedItem key={item.get('id')} item={item} dispatchToggleComplete={checkboxSpy} />) 
    const checkbox = component.find('input[type="checkbox"]')
    checkbox.simulate('keyDown', {key: 'Return', keyCode: 13})
    expect(checkboxSpy.calledOnce).toEqual(true)
    expect(checkboxSpy.calledWith(item.get('id'))).toEqual(true)
  })

  it('should call dispatchSetEditID when Edit button clicked', () => {
    const item = getImmutableItem()
    const editIDSpy = spy()
    const component = mount(<UnwrappedItem key={item.get('id')} item={item} dispatchSetEditID={editIDSpy} />) 
    const editBtn = component.find('.edit-btn')
    editBtn.simulate('click')

    expect(editIDSpy.calledOnce).toEqual(true)
    expect(editIDSpy.calledWith(item.get('id'))).toEqual(true)
  })

  it('should call dispatchDeleteItem when Delete button clicked', () => {
    const item = getImmutableItem()
    const deleteItemSpy = spy()
    const component = mount(<UnwrappedItem key={item.get('id')} item={item} dispatchDeleteItem={deleteItemSpy} />) 
    const deleteBtn = component.find('.delete-btn')
    deleteBtn.simulate('click')

    expect(deleteItemSpy.calledOnce).toEqual(true)
    expect(deleteItemSpy.calledWith(item.get('id'))).toEqual(true)
  })
})
