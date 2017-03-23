import React from 'react'
import Item from './Item'
import EditItem from './EditItem'
import ImmutablePropTypes from 'react-immutable-proptypes'

function Items (props) {
  const items = props.items
  if (!items) {
    return null
  }
  function renderListItems (items, props) {
    return items.map((item) => {
      if (props.editID === item.id) {
        return <EditItem
          key={item.get('id')}
          item={item}
          handleEditID={(itemID) => props.handleEditID(itemID)}
          handleUpdateItemInput={() => props.handleUpdateItemInput()}
          onKeyDown={(e, itemID) => props.onKeyDown(e, itemID)}
        />
      } else {
        return <Item
          key={item.get('id')}
          item={item}
          handleEditID={(itemID) => props.handleEditID(itemID)}
          handleUpdateItemInput={(e, itemID) => props.handleUpdateItemInput(e, itemID)}
          onKeyDown={(e, itemID) => props.onKeyDown(e, itemID)}
          handleDeleteItem={(itemID) => props.handleDeleteItem(itemID)}
        />
      }
    })
  }

  return (
    <ul>
      {renderListItems(items, props)}
    </ul>
  )
}

const { string, func } = React.PropTypes
Items.propTypes = {
  items: ImmutablePropTypes.list,
  editID: string,
  handleDeleteItem: func,
  handleEditID: func,
  handleUpdateItemInput: func,
  onKeyDown: func
}

export default Items
