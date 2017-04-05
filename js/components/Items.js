import React from 'react'
import Item from './Item'
import EditItem from './EditItem'
import ImmutablePropTypes from 'react-immutable-proptypes'

function Items (props) {
  const { items, editID } = props
  if (!items) {
    return null
  }

  function renderListItems (items, editID) {
    return items.map((item) => {
      var itemRender = {
        [item.get('id')]: () => {
          return <EditItem
            key={item.get('id')}
            item={item}
          />
        },
        'default': () => {
          return <Item
            key={item.get('id')}
            item={item}
          />
        }
      }
      return (itemRender[editID] || itemRender['default'])()
    })
  }

  return (
    <ul className='list-group'>
      {renderListItems(items, editID)}
    </ul>
  )
}

const { string } = React.PropTypes
Items.propTypes = {
  items: ImmutablePropTypes.list,
  editID: string
}

export default Items
