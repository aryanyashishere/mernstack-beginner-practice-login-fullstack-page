import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";

// import logo from '../images/logo2.png'
import { UserContext } from '../App';



const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);

  const RenderMenu = () => {

    if (state) {
      return (
        <>
          <li className="nav-item active ">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard">YOJNA</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/About">AboutMe</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Contact">Contact</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/logout">Logout</NavLink>
          </li>

        </>
      )
    } else {
      return (

        <>

          <li className="nav-item active">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link dropdown-toggle" to = "#"id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              YOJNAS
            </NavLink>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink className="dropdown-item" to="/Dashboard">Dashboard</NavLink>

              <NavLink className="dropdown-item" to="#">PMAY</NavLink>
              <NavLink className="dropdown-item" to="#">PMSSY</NavLink>
            </div>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/About">AboutMe</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Contact">Contact</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Login">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Signup">Register</NavLink>
          </li>


        </>
      )

    }



  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="#">Yojna Tracking System
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">


            <RenderMenu />


          </ul>

        </div>
      </nav>
    </>
  )
}

export default Navbar