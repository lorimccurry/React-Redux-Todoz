import React from 'react'

function EditItem (props) {
  const emptyEditID = ''
  return (
    <li key={props.id}>
      <input
        type='text'
        value={props.text}
        onChange={(e) => props.handleUpdateItemInput(e, props.id)}
        onKeyDown={(e) => props.onKeyDown(e, emptyEditID)}
        autoFocus
        name='text'
        className='update-input'
      />
      <button className='update-btn' onClick={() => props.handleEditID(emptyEditID)}>
        Update
      </button>
    </li>
  )
}

const { string, bool, func } = React.PropTypes
EditItem.propTypes = {
  text: string.isRequired,
  id: string.isRequired,
  completed: bool.isRequired,
  handleUpdateItemInput: func,
  onKeyDown: func,
  handleEditID: func
}

export default EditItem
