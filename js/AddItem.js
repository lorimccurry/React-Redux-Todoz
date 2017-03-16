import React from 'react'
import { connect } from 'react-redux'
import { addItem, setItemInput } from './actionCreators'

class AddItem extends React.Component {
  constructor () {
    super()

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.props.dispatchSetItemInput(e.target.value)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.dispatchAddItem(this.props.itemInput)
    this.props.dispatchSetItemInput('')
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Gimme tha todoz:</legend>
          <input
            type='text'
            placeholder='Get coffee'
            value={this.props.itemInput}
            onChange={this.handleChange}
            autoFocus
          />
        </fieldset>
      </form>
    )
  }
}

const { string, func } = React.PropTypes
AddItem.propTypes = {
  itemInput: string,
  onSubmit: func,
  dispatchSetItemInput: func,
  dispatchAddItem: func
}

const mapStateToProps = (state) => {
  return {
    itemInput: state.itemInput
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetItemInput: (inputValue) => {
      dispatch(setItemInput(inputValue))
    },
    dispatchAddItem: (text) => {
      dispatch(addItem(text))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItem)
