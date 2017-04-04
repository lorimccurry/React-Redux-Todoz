import React from 'react'
import { connect } from 'react-redux'
import { setActiveFilter } from '../actions/actionCreators'

class Filters extends React.Component {
  constructor () {
    super()

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (filter) {
    this.props.dispatchActiveFilter(filter)
  }

  render () {
    return (
      <div>
        <button
          className='filter-all'
          onClick={() => this.handleClick('all')}
        >
          All
        </button>
        <button
          className='filter-completed'
          onClick={() => this.handleClick('completed')}
        >
          Completed
        </button>
        <button
          className='filter-uncompleted'
          onClick={() => this.handleClick('uncompleted')}
        >
          Uncompleted
        </button>
      </div>
    )
  }
}

const { func } = React.PropTypes
Filters.propTypes = {
  dispatchActiveFilter: func
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchActiveFilter: (filter) => {
      dispatch(setActiveFilter(filter))
    }
  }
}

export const Unwrapped = Filters

export default connect(null, mapDispatchToProps)(Filters)
