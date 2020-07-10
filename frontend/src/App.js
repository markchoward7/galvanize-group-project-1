import React, {
  useEffect,
  useState,
} from 'react';

import './App.css';
import Tester from './Tester'
import {BrowserRouter as Router, Link, Switch,HashRouter, NavLink, Redirect} from "react-router-dom"
import Route from 'react-router-dom/Route'
import CheckTest from './CheckTest'
import Tester2 from './Tester2';

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   Redirect,
// } from 'react-router-dom'

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
import UserWorkouts from './UserWorkouts'
import AddExercises from './AddExercises';
import Nutrition from './Nutrition'

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
<<<<<<< HEAD
    <div className="App">
      <HashRouter>
            <Switch>
            <div className='App2'>
            <ul>
              <li>
              <NavLink to="/home">HOME</NavLink>
              </li>
              <li>
              <NavLink to="/checktest">When's your test?</NavLink>
              </li>
            </ul>
            <div className = "content">
              <Route exact path="/home" component={Tester}/>
              <Route exact path="/checktest" component={CheckTest}/>
              </div>
            </div> 
            </Switch>
        </HashRouter>
    </div>
  );
=======
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
          <Route exact path='/workouts' render={props => <UserWorkouts {...props} parentState={state} parentSetState={setState} />} />
          <Route exact path='/exercises' render={props => <AddExercises {...props} parentState={state} parentSetState={setState} />} />
          <Route exact path='/nutrition' render={props => <Nutrition {...props} parentState={state} parentSetState={setState} />} />
        </Switch>
      </div>
    </div></Router>
  )
>>>>>>> 9d391140a1d682575c7e4f5d3a42023d8b0cbdfa
}
//
export default App;
