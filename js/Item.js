import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

function Item (props) {
  const { item } = props

  return (
    <li>
      <input
        type='checkbox'
        checked={item.get('completed')}
        onChange={(e) => props.handleUpdateItemInput(e, props.id)}
        onKeyDown={(e) => props.onKeyDown(e, props.id)}
        name='completed'
      />
      <p className='item-text'>{item.get('text')}</p>
      <button onClick={() => props.handleEditID(props.id)} className='edit-btn'>Edit</button>
      <button onClick={() => props.handleDeleteItem(props.id)} className='delete-btn'>Delete</button>
    </li>
  )
}

const { func } = React.PropTypes
Item.propTypes = {
  item: ImmutablePropTypes.mapContains({
    id: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    completed: React.PropTypes.bool.isRequired
  }),
  handleEditID: func,
  handleDeleteItem: func,
  handleUpdateItemInput: func,
  onKeyDown: func
}

export default Item
