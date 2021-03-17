import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'



const Navbar = ({ history }) => {
  const [mobNav, updateMobNav] = useState(false)
  const token = localStorage.getItem('token')
  const loggedIn = getLoggedInUserId()



  const handleLogout = () => {
    localStorage.removeItem('token')
    history.push('/')
  }


  return <nav className="navbar is-black is-fixed-top" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <div className="navbar-item">
        <div className="buttons">
        <Link to="/" className="button is-white is-medium is-inverted">Home</Link>

        </div>
      </div>
      <a onClick={() => updateMobNav(!mobNav)} role="button" className={`navbar-burger ${mobNav ? 'is-active' : ''}`} >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div id="navbarBasicExample" className={`navbar-menu ${mobNav ? 'is-active' : ''}`}>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            
            {!loggedIn && <Link to="/login" className="button is-white is-medium is-inverted">Login</Link>}
            {loggedIn && <Link to="/dashboard" className="button is-white is-medium is-inverted">Dashboard</Link>}
            {loggedIn && <Link to="/create-event" className="button is-white is-medium is-inverted">Create Event</Link>}
            {loggedIn && <Link to="/" className="button is-white is-medium is-inverted" onClick={handleLogout} >Logout</Link>}

          </div>
        </div>
      </div>
    </div>
  </nav>

}

export default withRouter(Navbar)