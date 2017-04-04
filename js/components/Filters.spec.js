import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { spy } from 'sinon'
import Filters from './Filters' 
import { Unwrapped as UnwrappedFilters } from './Filters'

describe('Filters', () => {
  it('Filters snapsnot test', () => {
    const component = shallow(<UnwrappedFilters />)
    const tree = shallowToJson(component)
    expect(tree).toMatchSnapshot()
  })

  it('renders All Button, Completed Button, Uncompleted Button', () => {
    const component = shallow(<UnwrappedFilters />) 
    expect (component.find('.filter-all').length).toEqual(1)
    expect (component.find('.filter-completed').length).toEqual(1)
    expect (component.find('.filter-uncompleted').length).toEqual(1)
  }) 

  it('should call dispatchFilterAll with all arg when All clicked', () => {
    const filterSpy = spy()
    const component = mount(<UnwrappedFilters dispatchActiveFilter={filterSpy} />) 
    const checkbox = component.find('.filter-all')
    checkbox.simulate('click')

    expect(filterSpy.calledOnce).toEqual(true)
    expect(filterSpy.calledWith('all')).toEqual(true)
  })

  it('should call dispatchFilterAll with completed arg when Completed clicked', () => {
    const filterSpy = spy()
    const component = mount(<UnwrappedFilters dispatchActiveFilter={filterSpy} />) 
    const checkbox = component.find('.filter-completed')
    checkbox.simulate('click')

    expect(filterSpy.calledOnce).toEqual(true)
    expect(filterSpy.calledWith('completed')).toEqual(true)
  })

  it('should call dispatchFilterAll with uncompleted arg when Uncompleted clicked', () => {
    const filterSpy = spy()
    const component = mount(<UnwrappedFilters dispatchActiveFilter={filterSpy} />) 
    const checkbox = component.find('.filter-uncompleted')
    checkbox.simulate('click')

    expect(filterSpy.calledOnce).toEqual(true)
    expect(filterSpy.calledWith('uncompleted')).toEqual(true)
  })
})
