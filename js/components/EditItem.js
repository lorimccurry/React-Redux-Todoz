import React from 'react'
import { connect } from 'react-redux'
import { setUpdateText, setEditID } from '../actions/actionCreators'
import ImmutablePropTypes from 'react-immutable-proptypes'

class EditItem extends React.Component {
  handleChange (e) {
    this.props.dispatchUpdateText(e.target.value)
  }

  handleFinishUpdate (e) {
    if (e.keyCode === 13 || e.type === 'click') {
      this.props.dispatchSetEditID('')
    }
  }

  render () {
    const { item } = this.props
    return (
      <li key={item.get('id')}>
        <input
          type='text'
          value={item.get('text')}
          onChange={(e) => this.handleChange(e)}
          onKeyDown={(e) => this.handleFinishUpdate(e)}
          autoFocus
          className='update-input'
        />
        <button className='update-btn' onClick={(e) => this.handleFinishUpdate(e)}>
          Update
        </button>
      </li>
    )
  }
}

const { func } = React.PropTypes
EditItem.propTypes = {
  item: ImmutablePropTypes.mapContains({
    id: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    completed: React.PropTypes.bool.isRequired
  }),
  dispatchUpdateText: func,
  dispatchSetEditID: func
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUpdateText: (text) => {
      dispatch(setUpdateText(text))
    },
    dispatchSetEditID: (id) => {
      dispatch(setEditID(id))
    }
  }
}

export const Unwrapped = EditItem

export default connect(null, mapDispatchToProps)(EditItem)
