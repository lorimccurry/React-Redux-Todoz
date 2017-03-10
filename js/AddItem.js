import React from 'react'

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
    this.props.onSubmit(this.state.itemInput)
    this.setState({itemInput: ''})
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Gimme tha todoz:</legend>
          <input
            type='text'
            placeholder='Get coffee'
            value={this.state.itemInput}
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
  onSubmit: func
}

export default AddItem
