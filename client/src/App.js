import React, {useReducer, createContext} from 'react'
import { Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Navbar from "./components/Navbar";

import Dashboard from './components/Dashboard';

import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ErrorPage from "./components/Errorpage";
import Logout from "./components/Logout";
import {initialState, reducer} from "../src/reducer/UseReducer"


export  const UserContext = createContext();

const Routing = ()=>{

  return (
    <>
    <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/dashboard">
      <Dashboard />
    </Route>



    <Route path="/about">
      <About />
    </Route>

    <Route path="/contact">
      <Contact />
    </Route>

    <Route path="/login">
      <Login />
    </Route>

    <Route path="/signup">
      <Signup />
    </Route>
      
    <Route path="/logout">
      <Logout />
    </Route>
    
    <Route>
      <ErrorPage />
    </Route>
  </Switch>

  </>

  )
}




const App = () => {

  // 1: context API 
const [state, dispatch] = useReducer(reducer, initialState)
 
  return (
    <>
<UserContext.Provider value={{state, dispatch}}>



      <Navbar />
      <Routing/>
      

    </UserContext.Provider>
    </>

  )
}

export default App