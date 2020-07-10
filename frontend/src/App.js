import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tester from './Tester'
import {BrowserRouter as Router,Link,Switch,HashRouter, NavLink} from "react-router-dom"
import Route from 'react-router-dom/Route'
import CheckTest from './CheckTest'
import Tester2 from './Tester2';

function App() {
  return (
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
}

export default App;
