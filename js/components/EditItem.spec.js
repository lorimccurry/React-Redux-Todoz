import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { spy } from 'sinon'
import { Map } from 'immutable'
import EditItem from './EditItem'
import { Unwrapped as UnwrappedEditItem } from './EditItem'

describe('EditItem', () => {
  function getImmutableItem () {
    return Map({
      completed: false,
      id: 'iou12oiv',
      text: 'do the codez'
    })
  }

  it('EditItem snapshot test', () => {
    const immutableEditItem = getImmutableItem()
    const component = shallow(<UnwrappedEditItem key={immutableEditItem.get('id')} item={immutableEditItem} />)
    const tree = shallowToJson(component)
    expect(tree).toMatchSnapshot()
  })

  it('should render an li, input, update button', () => {
    const immutableEditItem = getImmutableItem()
    const component = render(<UnwrappedEditItem key={immutableEditItem.get('id')} item={immutableEditItem} />)
    expect(component.find('li').length).toEqual(1)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.update-btn').length).toEqual(1)
  })

  it('should have the correct key', () => {
    const immutableEditItem = getImmutableItem()
    const component = shallow(<UnwrappedEditItem key={immutableEditItem.get('id')} item={immutableEditItem} />)
    expect(component.key()).toEqual('iou12oiv')
  })

  it('should render the existing item text in the input', () => {
    const immutableEditItem = getImmutableItem()
    const component = render(<UnwrappedEditItem key={immutableEditItem.get('id')} item={immutableEditItem} />)
    const input = component.find('input')
    expect(input.prop('value')).toEqual('do the codez')
  })

  it('should accept input and call dispatchUpdateText with input value', () => {
    const immutableEditItem = getImmutableItem()
    const updateSpy = spy()
    const component = mount(
      <UnwrappedEditItem
        key={immutableEditItem.get('id')}
        item={immutableEditItem}
        dispatchUpdateText={updateSpy}
      />
    )
    const input = component.find('input')
    input.simulate('change', {target: {value: 'get coffee'}})

    expect(updateSpy.calledOnce).toEqual(true)
    expect(updateSpy.calledWith('get coffee')).toEqual(true)
  })

  it('should call dispatchSetEditID when Update button clicked', () => {
    const immutableEditItem = getImmutableItem()
    const updateSpy = spy()
    const component = mount(
      <UnwrappedEditItem
        key={immutableEditItem.get('id')}
        item={immutableEditItem}
        dispatchSetEditID={updateSpy}
      />
    )
    const updateBtn = component.find('.update-btn')
    updateBtn.simulate('click')

    expect(updateSpy.calledOnce).toEqual(true)
    expect(updateSpy.calledWith('')).toEqual(true)
  })
})
