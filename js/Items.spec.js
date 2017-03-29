import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Items from './Items'
import Item from './Item'
import EditItem from './EditItem'
import { List, Map} from 'immutable'

describe('Items', () => {
  function getImmutableList (numItems = 3) {
    if (numItems === 0) {
      return List([])
    } else { 
      return List([
        Map({
          completed: false,
          id: 'askdjfo',
          text: 'sleep' 
        }),
        Map({
          completed: false,
          id: '901ukcjv',
          text: 'eat yumz' 
        }),
        Map({
          completed: false,
          id: 'iou12oiv',
          text: 'do the codez' 
        })
      ])
    }
  }

  it('Items snapshot test', () => {
    const component = shallow(<Items />)
    const tree = shallowToJson(component)
    expect(tree).toMatchSnapshot()
  })

  it('should render zero items', () => {
    const items = getImmutableList(0)
    const component = shallow(<Items items={items} />)
    expect(component.containsMatchingElement(Item)).toEqual(false)
  })

  it('should render undefined items', () => {
    const component = shallow(<Items items={undefined} />)
    expect(component.containsMatchingElement(Item)).toEqual(false)
  })

  it('should render some items', () => {
    const items = getImmutableList()
    const component = shallow(<Items items={items} />)
    expect(component.find(Item).length).toEqual(3)
  })

  it('should render 1 EditItem for item being edited', () => {
    const items = getImmutableList()
    const component = shallow(<Items
      items={items}
      editID={items.get(0).get('id')}
      />)

    expect(component.find(Item).length).toEqual(2)
    expect(component.find(EditItem).length).toEqual(1)
  })
})
