import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { spy } from 'sinon'
import EditItem from './EditItem'

describe('EditItem', () => {
  it('EditItem snapshot test', () => {
    const item = {
      completed: false,
      id: 'iou12oiv',
      text: 'do the codez' 
    }
    const component = shallow(<EditItem key={item.id} {...item} />) 
    const tree = shallowToJson(component)
    expect(tree).toMatchSnapshot()
  })

  it('should render an li, input, update button', () => {
    const item = {
      completed: false,
      id: 'iou12oiv',
      text: 'do the codez' 
    }
    const component = shallow(<EditItem key={item.id} {...item} />) 
    expect(component.find('li').length).toEqual(1)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('button.update-btn').length).toEqual(1)
  })

  it('should render the existing item text in the input', () => {
    const item = {
      completed: false,
      id: 'iou12oiv',
      text: 'do the codez' 
    }
    const component = mount(<EditItem key={item.id} {...item} />)
    const input = component.find('input')
    expect(component.prop('text')).toEqual('do the codez')
    expect(input.prop('value')).toEqual('do the codez')
    expect(component.prop('id')).toEqual('iou12oiv')
  })

  it('should accept input', () => {
    const item = {
      completed: false,
      id: 'iou12oiv',
      text: 'do the codez' 
    }
    const updateSpy = spy()
    const component = mount(<EditItem
      key={item.id}
      {...item}
      handleUpdateItemInput={updateSpy}
      />)
    const input = component.find('input')
    input.simulate('change', {target: {value: 'get coffee'}})
    component.setProps({ text: 'get coffee'})

    expect(input.prop('value')).toEqual('get coffee')
    expect(input.prop('value')).not.toEqual('do the codez')
    expect(component.prop('text')).toEqual('get coffee')
  })

  it('should call handleEditID when Update button clicked', () => {
    const item = {
      completed: false,
      id: 'iou12oiv',
      text: 'do the codez' 
    }
    const updateSpy = spy()
    const component = mount(<EditItem
      key={item.id}
      {...item}
      handleEditID={updateSpy}
      />)
    const updateBtn = component.find('.update-btn')
    updateBtn.simulate('click')

    expect(updateSpy.calledOnce).toEqual(true)
    expect(updateSpy.calledWith('')).toEqual(true)
  })
})
