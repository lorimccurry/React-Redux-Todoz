import React from 'react'
import { render } from 'react-dom'
import '../public/css/style.css'
import TodoList from './TodoList'

class App extends React.Component {
  render () {
    return (
      <div className='page-container'>
        <TodoList />
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))

