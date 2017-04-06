import React from 'react'
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

export default App
