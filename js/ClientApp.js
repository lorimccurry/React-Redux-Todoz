import React from 'react'
import { render } from 'react-dom'
import '../public/css/style.css'
import { Provider } from 'react-redux'
import store from './store'
import TodoList from './TodoList'

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div className='page-container'>
          <TodoList />
        </div>
      </Provider>
    )
  }
}

render(<App />, document.getElementById('app'))

