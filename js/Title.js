import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Cell } from 'radium-grid'
const { string } = React.PropTypes

class Title extends React.Component {
  render () {
    const style = {color: this.props.color}
    return (
      <Grid cellWidth='1/2'>
        <Cell align='left'>
          <h1>
            {this.props.title}
          </h1>
        </Cell>
        <Cell
          style={style}
          align='center'
          verticalAlign='middle'
        >
          <RaisedButton
            label='Default'
          />
        </Cell>
      </Grid>
    )
  }
}

Title.propTypes = {
  color: string,
  title: string
}

export default Title

