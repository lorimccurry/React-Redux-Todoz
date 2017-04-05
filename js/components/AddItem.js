import React from 'react'
import { connect } from 'react-redux'
import { addItem } from '../actions/actionCreators'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class AddItem extends React.Component {
  constructor () {
    super()

    this.state = {
      itemInput: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({itemInput: e.target.value})
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.dispatchAddItem(this.state.itemInput)
    this.setState({itemInput: ''})
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <ControlLabel>Gimme tha todoz:</ControlLabel>
          <FormControl
            type='text'
            placeholder='Get coffee'
            value={this.state.itemInput}
            onChange={this.handleChange}
            autoFocus
            bsSize='lg'
          />
        </FormGroup>
      </form>
    )
  }
}

const { func, string } = React.PropTypes
AddItem.propTypes = {
  dispatchAddItem: func,
  itemInput: string
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
