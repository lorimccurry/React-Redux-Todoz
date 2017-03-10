import React from 'react'

function Item (props) {
  return (
    <li>
      <input
        type='checkbox'
        checked={props.completed}
        onChange={(e) => props.handleUpdateItemInput(e, props.id)}
        onKeyDown={(e) => props.onKeyDown(e, props.id)}
        name='completed'
      />
      <p className='item-text'>{props.text}</p>
      <button onClick={() => props.handleEditID(props.id)} className='edit-btn'>Edit</button>
      <button onClick={() => props.handleDeleteItem(props.id)} className='delete-btn'>Delete</button>
    </li>
  )
}

const { string, bool, func } = React.PropTypes
Item.propTypes = {
  text: string.isRequired,
  id: string.isRequired,
  completed: bool.isRequired,
  handleEditID: func,
  handleDeleteItem: func,
  handleUpdateItemInput: func,
  onKeyDown: func
}

export default Item
