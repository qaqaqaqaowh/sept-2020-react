import React from 'react';
import axios from 'axios'
import "./App.css"
import HomePage from './pages/HomePage.js';
import {Route, Switch} from "react-router-dom"
import UserProfile from './pages/UserProfile';
import NavBar from './components/NavBar'

function App() {
  return(
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/users/:id" component={UserProfile} />
      </Switch>
    </div>
  )
}

export default App;
