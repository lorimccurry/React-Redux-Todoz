import React from 'react'
import shortid from 'shortid'
import update from 'immutability-helper'
import AddItem from './AddItem'
import Items from './Items'

class TodoList extends React.Component {
  constructor () {
    super()

    this.state = {
      items: [],
      editID: ''
    }
    this.handleAddItem = this.handleAddItem.bind(this)
  }

  handleAddItem (itemInput) {
    const newTodo = this.createNewTodo(itemInput)
    const method = '$push'
    const newItemsState = this.immutableUpdateState(this.state.items, [newTodo], method)
    this.setState({items: newItemsState})
  }

  handleDeleteItem (deleteId) {
    const updatedItems = this.state.items.filter((item) => { return item.id !== deleteId })
    const method = '$set'
    const newItemsState = this.immutableUpdateState(this.state.items, updatedItems, method)
    this.setState({items: newItemsState})
  }

  handleReturnKeySubmit (e, itemID) {
    if (e.keyCode === 13) {
      e.preventDefault()
      e.target.type === 'text' ? this.setEditID(itemID) : this.handleUpdateItemInput(e, itemID)
    } else {
      return
    }
  }

  handleUpdateItemInput (e, itemID) {
    const inputType = e.target.type
    const itemPropertyKey = e.target.name
    const eventValue = e.target.value
    const method = '$set'
    const currentItems = this.state.items

    const mutatedItemArr = currentItems.map((item, index) => {
      if (item.id === itemID) {
        inputType === 'checkbox' ? item[itemPropertyKey] = !item[itemPropertyKey] : item[itemPropertyKey] = eventValue
        this.immutableUpdateState(currentItems[index], [item], method)
        return item
      } else {
        return item
      }
    })
    this.setState({items: mutatedItemArr})
  }

  createNewTodo (itemInput) {
    return {
      completed: false,
      id: shortid.generate(),
      text: itemInput
    }
  }

  immutableUpdateState (currentState, updatedState, method) {
    return update(currentState, {[method]: updatedState})
  }

  setEditID (editID) {
    this.setState({editID: editID})
  }

  renderListDisplay () {
    if (this.state.items.length > 0) {
      return <Items
        items={this.state.items}
        editID={this.state.editID}
        handleDeleteItem={(deleteId) => this.handleDeleteItem(deleteId)}
        handleEditID={(editID) => this.setEditID(editID)}
        handleUpdateItemInput={(e, itemID) => this.handleUpdateItemInput(e, itemID)}
        onKeyDown={(e, itemID) => this.handleReturnKeySubmit(e, itemID)}
        />
    } else {
      return <p>Add some todoz!</p>
    }
  }

  render () {
    return (
      <div>
        <AddItem onSubmit={this.handleAddItem} />
        {this.renderListDisplay()}
      </div>
    )
  }
}

const { string, array } = React.PropTypes
TodoList.propTypes = {
  items: array,
  editID: string
}

export default TodoList
