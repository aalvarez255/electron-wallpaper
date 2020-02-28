import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Main from '../../pages/Main/Main'

export default class App extends Component {
  render() {
    return (
      <main>
        <HashRouter>
          <Switch>
            <Route path='/' component={Main} />
          </Switch>
        </HashRouter>
      </main>
    )
  }
}