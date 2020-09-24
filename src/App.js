import React from 'react';
import axios from 'axios'
import "./App.css"
import HomePage from './pages/HomePage.js';
import {Route, Switch, Link} from "react-router-dom"
import UserProfile from './pages/UserProfile';

function App() {
  return(
    <div>
      <div>
        <h2>Navbar</h2>
        <Link to="/" >Home</Link>
        <Link to="/users/3" >Profile</Link>
      </div>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/users/:id" component={UserProfile} />
      </Switch>
    </div>
  )
}

export default App;
