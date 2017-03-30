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
      if (editID === item.get('id')) {
        return <EditItem
          key={item.get('id')}
          item={item}
        />
      } else {
        return <Item
          key={item.get('id')}
          item={item}
        />
      }
    })
  }

  return (
    <ul>
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
