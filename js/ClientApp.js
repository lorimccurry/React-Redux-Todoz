import React from 'react'
import { render } from 'react-dom'
import '../public/css/style.css'
import { Provider } from 'react-redux'
import store from './store/store'
import TodoList from './components/TodoList'
import { Navbar } from 'react-bootstrap'

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div>
          <Navbar
            inverse
          >
            <Navbar.Header>
              <Navbar.Brand>
                <a
                  href='#'
                  className='logo'
                >
                  tha <span>todoz</span>
                </a>
              </Navbar.Brand>
            </Navbar.Header>
          </Navbar>
          <div className='page-container'>
            <TodoList />
          </div>
        </div>
      </Provider>
    )
  }
}

render(<App />, document.getElementById('app'))

