import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { spy } from 'sinon'
import Items from './Items'
import Item from './Item'
import EditItem from './EditItem'

describe('Items', () => {
  it('Items snapshot test', () => {
    const component = shallow(<Items />)
    const tree = shallowToJson(component)
    expect(tree).toMatchSnapshot()
  })

  it('should render zero items', () => {
    const component = shallow(<Items items={[]} />)
    expect(component.containsMatchingElement(Item)).toEqual(false)
  })

  it('should render undefined items', () => {
    const component = shallow(<Items items={undefined} />)
    expect(component.containsMatchingElement(Item)).toEqual(false)
  })

  it('should render some items', () => {
    const items = [
      {
        completed: false,
        id: 'askdjfo',
        text: 'sleep' 
      },
      {
        completed: false,
        id: '901ukcjv',
        text: 'eat yumz' 
      },
      {
        completed: false,
        id: 'iou12oiv',
        text: 'do the codez' 
      }
    ]
    const component = shallow(<Items items={items} />)
    expect(component.find(Item).length).toEqual(3)
  })

  it('should render 1 EditItem for item being edited', () => {
    const items = [
      {
        completed: false,
        id: 'askdjfo',
        text: 'sleep' 
      },
      {
        completed: false,
        id: '901ukcjv',
        text: 'eat yumz' 
      },
      {
        completed: false,
        id: 'iou12oiv',
        text: 'do the codez' 
      }
    ]
    const component = shallow(<Items
      items={items}
      editID={items[0].id}
      />)

    expect(component.find(Item).length).toEqual(2)
    expect(component.find(EditItem).length).toEqual(1)
  })

  it('should call handleEditID when edit button clicked', () => {
    const items = [
      {
        completed: false,
        id: 'askdjfo',
        text: 'sleep' 
      },
      {
        completed: false,
        id: '901ukcjv',
        text: 'eat yumz' 
      },
      {
        completed: false,
        id: 'iou12oiv',
        text: 'do the codez' 
      }
    ]
    const editItemSpy = spy()
    const component = mount(<Items
      items={items}
      handleEditID={editItemSpy}
      />)
    const editBtn = component.find('.edit-btn').first()
    editBtn.simulate('click')

    expect(editItemSpy.calledOnce).toEqual(true)
    expect(editItemSpy.calledWith('askdjfo')).toEqual(true)
  })

  it('should call handleDeleteItem when delete button clicked', () => {
    const items = [
      {
        completed: false,
        id: 'askdjfo',
        text: 'sleep' 
      },
      {
        completed: false,
        id: '901ukcjv',
        text: 'eat yumz' 
      },
      {
        completed: false,
        id: 'iou12oiv',
        text: 'do the codez' 
      }
    ]
    const deleteItemSpy = spy()
    const component = mount(<Items
      items={items}
      handleDeleteItem={deleteItemSpy}
      />)
    const deleteBtn = component.find('.delete-btn').first()
    deleteBtn.simulate('click')

    expect(deleteItemSpy.calledOnce).toEqual(true)
    expect(deleteItemSpy.calledWith('askdjfo')).toEqual(true)
  })

  it('should call handleUpdateItemInput when Item checkbox clicked', () => {
    const items = [
      {
        completed: false,
        id: 'askdjfo',
        text: 'sleep' 
      },
      {
        completed: false,
        id: '901ukcjv',
        text: 'eat yumz' 
      },
      {
        completed: false,
        id: 'iou12oiv',
        text: 'do the codez' 
      }
    ]
    const updateSpy = spy()
    const component = mount(<Items
      items={items}
      handleUpdateItemInput={updateSpy}
      />)
    const checkbox = component.find('input[type="checkbox"]').first()
    checkbox.simulate('change')

    expect(updateSpy.calledOnce).toEqual(true)
  })

  it('should call handleUpdateItemInput when EditItem text input changed', () => {
    const items = [
      {
        completed: false,
        id: 'askdjfo',
        text: 'sleep' 
      },
      {
        completed: false,
        id: '901ukcjv',
        text: 'eat yumz' 
      },
      {
        completed: false,
        id: 'iou12oiv',
        text: 'do the codez' 
      }
    ]
    const updateSpy = spy()
    const component = mount(<Items
      items={items}
      handleUpdateItemInput={updateSpy}
      editID={items[0].id}
      />)
    const input = component.find('input[type="text"]').first()
    input.simulate('change')

    expect(updateSpy.calledOnce).toEqual(true)
  })
})
