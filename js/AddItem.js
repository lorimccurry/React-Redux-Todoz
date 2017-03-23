import React from 'react'
import { connect } from 'react-redux'
import { addItem } from './actionCreators'

class AddItem extends React.Component {
  constructor () {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.dispatchAddItem(this.input.value)
    this.input.value = ''
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Gimme tha todoz:</legend>
          <input
            type='text'
            placeholder='Get coffee'
            ref={(node) => { this.input = node }}
            autoFocus
          />
        </fieldset>
      </form>
    )
  }
}

const { func } = React.PropTypes
AddItem.propTypes = {
  dispatchAddItem: func
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddItem: (text) => {
      dispatch(addItem(text))
    }
  }
}

export const Unwrapped = AddItem

export default connect(null, mapDispatchToProps)(AddItem)
