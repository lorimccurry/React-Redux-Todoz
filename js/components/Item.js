import React from 'react'
import { connect } from 'react-redux'
import { deleteItem, setEditID, setToggleComplete } from '../actions/actionCreators'
import ImmutablePropTypes from 'react-immutable-proptypes'

class Item extends React.Component {
  constructor () {
    super()

    this.handleToggleComplete = this.handleToggleComplete.bind(this)
  }

  handleToggleComplete (e, id) {
    if (e.keyCode === 13 || e.type === 'change') {
      this.props.dispatchToggleComplete(id)
    }
  }

  render () {
    const { item, dispatchDeleteItem, dispatchSetEditID } = this.props
    return (
      <li>
        <input
          type='checkbox'
          checked={item.get('completed')}
          onChange={(e) => this.handleToggleComplete(e, item.get('id'))}
          onKeyDown={(e) => this.handleToggleComplete(e, item.get('id'))}
          name='completed'
        />
        <p className='item-text'>{item.get('text')}</p>
        <button
          onClick={() => dispatchSetEditID(item.get('id'))}
          className='edit-btn'>
          Edit
        </button>
        <button
          onClick={() => dispatchDeleteItem(item.get('id'))}
          className='delete-btn'>
          Delete
        </button>
      </li>
    )
  }
}

const { func } = React.PropTypes
Item.propTypes = {
  item: ImmutablePropTypes.mapContains({
    id: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    completed: React.PropTypes.bool.isRequired
  }),
  dispatchDeleteItem: func,
  dispatchSetEditID: func,
  dispatchToggleComplete: func
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchDeleteItem: (id) => {
      dispatch(deleteItem(id))
    },
    dispatchSetEditID: (id) => {
      dispatch(setEditID(id))
    },
    dispatchToggleComplete: (id) => {
      dispatch(setToggleComplete(id))
    }
  }
}

export const Unwrapped = Item

export default connect(null, mapDispatchToProps)(Item)
