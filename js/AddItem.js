import React from 'react'
import { connect } from 'react-redux'
import { setItemInput } from './actionCreators'

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
    this.props.dispatch(setItemInput(e.target.value))
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit()
    this.props.dispatch(setItemInput(''))
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
  dispatch: func
}

const mapStateToProps = (state) => {
  return {
    itemInput: state.itemInput
  }
}

export default connect(mapStateToProps)(AddItem)
