import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { spy } from 'sinon'
import Item from './Item'

describe('Item', () => {
  it('Item snapshot test', () => {
    const item = {
      completed: false,
      id: 'iou12oiv',
      text: 'do the codez' 
    }
    const component = shallow(<Item key={item.id} {...item} />) 
    const tree = shallowToJson(component)
    expect(tree).toMatchSnapshot()
  })

  it('should render an li, checkbox, text, delete button, edit button', () => {
    const item = {
      completed: false,
      id: 'iou12oiv',
      text: 'do the codez' 
    }
    const component = shallow(<Item key={item.id} {...item} />) 
    expect(component.find('li').length).toEqual(1)
    expect(component.find('input[type="checkbox"]').length).toEqual(1)
    expect(component.find('p.item-text').length).toEqual(1)
    expect(component.find('button.edit-btn').length).toEqual(1)
    expect(component.find('button.delete-btn').length).toEqual(1)
  })

  it('should render an item with given completed status, id, and text', () => {
    const item = {
      completed: false,
      id: 'iou12oiv',
      text: 'do the codez' 
    }
    const component = mount(<Item key={item.id} {...item} />)
    const input = component.find('input[type="checkbox"]')
    const span = component.find('.item-text')
    expect(component.prop('text')).toEqual('do the codez')
    expect(span.text()).toEqual('do the codez')
    expect(input.prop('checked')).toEqual(false)
    expect(component.prop('id')).toEqual('iou12oiv')
  })

  it('should call handleUpdateItem when checkbox is clicked', () => {
    const item = {
      completed: false,
      id: 'iou12oiv',
      text: 'do the codez' 
    }
    const event = {
      target: {
        type: 'checkbox',
        name: 'completed',
        value: 'on'
      }
    }
    const checkboxSpy = spy()
    const component = mount(<Item
      key={item.id}
      {...item}
      handleUpdateItemInput={checkboxSpy}
      />)
    const checkbox = component.find('input[type="checkbox"]')
    checkbox.simulate('change')
    component.setProps({ completed: true })

    expect(checkbox.prop('checked')).toEqual(true)
    expect(checkboxSpy.calledOnce).toEqual(true)
  })

  it('should call handleEditID when Edit button clicked', () => {
    const item = {
      completed: false,
      id: 'iou12oiv',
      text: 'do the codez' 
    }
    const editIDSpy = spy()
    const component = mount(<Item
      key={item.id}
      {...item}
      handleEditID={editIDSpy}
      />)
    const editBtn = component.find('.edit-btn')
    editBtn.simulate('click')

    expect(editIDSpy.calledOnce).toEqual(true)
    expect(editIDSpy.calledWith(item.id)).toEqual(true)
  })

  it('should call handleDeleteItem when Delete button clicked', () => {
    const item = {
      completed: false,
      id: 'iou12oiv',
      text: 'do the codez' 
    }
    const deleteItemSpy = spy()
    const component = mount(<Item
      key={item.id}
      {...item}
      handleDeleteItem={deleteItemSpy}
      />)
    const deleteBtn = component.find('.delete-btn')
    deleteBtn.simulate('click')

    expect(deleteItemSpy.calledOnce).toEqual(true)
    expect(deleteItemSpy.calledWith(item.id)).toEqual(true)
  })
})
