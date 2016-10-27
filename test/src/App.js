import React from 'react'
import logo from './logo.svg'
import './App.scss'

function configure(WrappedComponent) {
  return class extends React.Component {
    const {props} = this
    return <WrappedComponent ...props />
  }
}

@configure
export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React1</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}
