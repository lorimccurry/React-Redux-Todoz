import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { spy } from 'sinon'
import AddItem from './AddItem'

describe('AddItem', () => {
  it('AddItem snapshot test', () => {
    const component = shallow(<AddItem />)
    const tree = shallowToJson(component)
    expect(tree).toMatchSnapshot()
  })

  it('should render a form and an input', () => {
    const component = shallow(<AddItem />) 
    expect(component.find('form').length).toEqual(1)
    expect(component.find('input').length).toEqual(1)
  })

  it('should accept input', () => {
    const component = mount(<AddItem />)
    const input = component.find('input')
    input.simulate('change', {target: {value: 'get beer'}})
    expect(component.state('itemInput')).toEqual('get beer')
    expect(input.prop('value')).toEqual('get beer')
  })

  it('should call handleSubmit when form is submitted', () => {
    const addItemSpy = spy()
    const component = mount(<AddItem onSubmit={addItemSpy}/>)
    component.setState({itemInput: 'get beer'})
    const form = component.find('form')
    form.simulate('submit')

    expect(addItemSpy.calledOnce).toEqual(true)
    expect(addItemSpy.calledWith('get beer')).toEqual(true)
  })
})

