import React from 'react'
import AddItem from './AddItem'
import Items from './Items'
import Filters from './Filters'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { completed } from '../constants'

class TodoList extends React.Component {
  constructor () {
    super()

    this.filteredItems = this.filteredItems.bind(this)
    this.renderListDisplay = this.renderListDisplay.bind(this)
  }

  filteredItems (items, activeFilter) {
    var filteredItems = {
      'completed': () => {
        return items.groupBy(item => item.get(completed)).get(true)
      },
      'uncompleted': () => {
        return items.groupBy(item => item.get(completed)).get(false)
      },
      'default': () => {
        return items
      }
    }
    return (filteredItems[activeFilter] || filteredItems['default'])()
  }

  renderListDisplay (items, editID, activeFilter) {
    const filteredItems = this.filteredItems(items, activeFilter)
    var hasItems = items.size > 0 ? 'yes' : 'default'

    var listRender = {
      'yes': () => {
        return <Items
          items={filteredItems}
          editID={editID}
          />
      },
      'default': () => {
        return <p className='add-msg'>Add some todoz!</p>
      }
    }
    return (listRender[hasItems] || listRender['default'])()
  }

  render () {
    const { items, editID, activeFilter } = this.props
    return (
      <div>
        <AddItem />
        {this.renderListDisplay(items, editID, activeFilter)}
        <Filters />
      </div>
    )
  }
}

const { string } = React.PropTypes
TodoList.propTypes = {
  items: ImmutablePropTypes.list,
  editID: string,
  activeFilter: string
}

const mapStateToProps = (state) => {
  return {
    items: state.todos.items,
    editID: state.todos.editID,
    activeFilter: state.activeFilter.filter
  }
}

export const Unwrapped = TodoList

export default connect(mapStateToProps)(TodoList)
