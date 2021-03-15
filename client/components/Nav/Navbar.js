import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'


const Navbar = ({ history }) => {
  const [mobNav, updateMobNav] = useState(false)
  const token = localStorage.getItem('token')



  const handleLogout = () => {
    localStorage.removeItem('token')
    history.push('/')
  }
  const loggedIn = getLoggedInUserId()

  return <nav className="navbar is-white is-sticky" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      {/* <Link className="navbar-items" to={'/'}> */}

      {/* </Link> */}

      <a onClick={() => updateMobNav(!mobNav)} role="button" className={`navbar-burger ${mobNav ? 'is-active' : ''}`} >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div id="navbarBasicExample" className={`navbar-menu ${mobNav ? 'is-active' : ''}`}>
      <div className="navbar-start">
        <a className="navbar-item">Home</a>
        <a className="navbar-item">Documentation</a>

      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/" className="button is-dark">Home</Link>
            {!loggedIn && <Link to="/login" className="button">Login</Link>}
            {loggedIn && <Link to="/dashboard" className="button">Dashboard</Link>}
            {loggedIn && <Link to="/create-event" className="button">Create Event</Link>}
            {loggedIn && <Link to="/" className="button is-danger" onClick={handleLogout} >Logout</Link>}

          </div>
        </div>
      </div>
    </div>
  </nav>

}

export default withRouter(Navbar)