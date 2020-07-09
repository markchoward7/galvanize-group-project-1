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
} from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import Example from './Example'
import Sidebar from './Sidebar'

import FitnessCompetition from './FitnessCompetition'
import NewOrganization from './NewOrganization'
import UpdateOrganization from './UpdateOrganization'
import AnnouncementBox from './AnnouncementBox'
import Announcements from './Announcements'
import NewAnnouncement from './NewAnnouncement'
import UpdateAnnouncement from './UpdateAnnouncement'


const axios = require('axios').default
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'


function App() {
  const [state, setState] = useState({
    currentUser: null,
    loginRedirect: '/',
    cac_enabled: false,
    isRedirecting: true,
  })

  return (
    <Router><div className="App">
      <Sidebar parentState={state} parentSetState={setState}/>
      {state.isRedirecting ? <Redirect to='/login'/> : <AnnouncementBox />}
      <div className="main">
        <Switch>
          <Route exact path='/' render={props => <Home {...props} parentState={state} parentSetState={setState} />} />
          <Route exact path='/login' render={props => <Login {...props} parentState={state} parentSetState={setState} />} />
          <Route exact path='/example' render={props => <Example {...props} parentState={state} parentSetState={setState} />} />
          <Route exact path='/fitnessCompetition' render={props => <FitnessCompetition {...props} parentState={state} parentSetState={setState} />} />
          <Route exact path='/new-org' render={props => <NewOrganization {...props} parentState={state} parentSetState={setState} />} />
          <Route exact path='/update-org' render={props => <UpdateOrganization {...props} parentState={state} parentSetState={setState} />} />
          <Route exact path='/announcements' render={props => <Announcements {...props} parentState={state} parentSetState={setState} />} />
          <Route exact path='/new-announcement' render={props => <NewAnnouncement {...props} parentState={state} parentSetState={setState} />} />
          <Route exact path='/update-announcement' render={props => <UpdateAnnouncement {...props} parentState={state} parentSetState={setState} />} />
        </Switch>
      </div>
    </div></Router>
  )
}
//
export default App;
