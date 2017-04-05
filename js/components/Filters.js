import React from 'react'
import { connect } from 'react-redux'
import { setActiveFilter } from '../actions/actionCreators'
import { Button, ButtonGroup } from 'react-bootstrap'

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
      <ButtonGroup>
        <Button
          bsSize='lg'
          className='filter-all'
          onClick={() => this.handleClick('all')}
        >
          All
        </Button>
        <Button
          bsSize='lg'
          className='filter-completed'
          onClick={() => this.handleClick('completed')}
        >
          Completed
        </Button>
        <Button
          bsSize='lg'
          className='filter-uncompleted'
          onClick={() => this.handleClick('uncompleted')}
        >
          Uncompleted
        </Button>
      </ButtonGroup>
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
