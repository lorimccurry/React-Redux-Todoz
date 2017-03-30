import React from 'react'
import AddItem from './AddItem'
import Items from './Items'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'

function TodoList (props) {
  const { items, editID } = props

  function renderListDisplay (items, editID) {
    if (items.size > 0) {
      return <Items
        items={items}
        editID={editID}
        />
    } else {
      return <p>Add some todoz!</p>
    }
  }

  return (
    <div>
      <AddItem />
      {renderListDisplay(items, editID)}
    </div>
  )
}

const { string } = React.PropTypes
TodoList.propTypes = {
  items: ImmutablePropTypes.list,
  editID: string
}

const mapStateToProps = (state) => {
  return {
    items: state.todos.items,
    editID: state.todos.editID
  }
}

export const Unwrapped = TodoList

export default connect(mapStateToProps)(TodoList)
