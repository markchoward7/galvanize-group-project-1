import React, {
  useEffect,
  useState,
} from 'react';

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from 'react-router-dom'

import Login from './Login'
import Example from './Example'

const axios = require('axios').default
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'



function App() {
  const [state, setState] = useState({
    currentUser: null,
    loginRedirect: '/',
    cac_enabled: false,
    isRedirecting: true,
  })

  return (
    <Router><div className="App">
      {state.isRedirecting ? <Redirect to='/login'/> : ''}
      <Switch>
        <Route exact path='/login' render={props => <Login {...props} parentState={state} parentSetState={setState} />} />
        <Route exact path='/example' render={props => <Example {...props} parentState={state} parentSetState={setState} />} />
      </Switch>
    </div></Router>
  )
}

export default App;
