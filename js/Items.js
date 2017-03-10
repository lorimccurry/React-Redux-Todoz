import React from 'react'
import Item from './Item'
import EditItem from './EditItem'

function Items (props) {
  const items = props.items
  if (!items) {
    return null
  }
  function renderListItems (items, props) {
    return items.map((item) => {
      if (props.editID === item.id) {
        return <EditItem
          key={item.id}
          {...item}
          handleEditID={(itemID) => props.handleEditID(itemID)}
          handleUpdateItemInput={(e, itemID) => props.handleUpdateItemInput(e, itemID)}
          onKeyDown={(e, itemID) => props.onKeyDown(e, itemID)}
        />
      } else {
        return <Item
          key={item.id}
          {...item}
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

const { arrayOf, shape, string, bool, func } = React.PropTypes
Items.propTypes = {
  items: arrayOf(shape({
    text: string,
    id: string,
    completed: bool
  })),
  editID: string,
  handleDeleteItem: func,
  handleEditID: func,
  handleUpdateItemInput: func,
  onKeyDown: func
}

export default Items
