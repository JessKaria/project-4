import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'

const Footer = () => {
  const [mobNav, updateMobNav] = useState(false)
  const token = localStorage.getItem('token')
  // const [showUser, updateShowUser] = useState({})




  const handleLogout = () => {
    localStorage.removeItem('token')
    history.push('/logout')
  }
  const loggedIn = getLoggedInUserId()

  return <nav className="navbar is-white is-sticky" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-items" to={'/'}>
        <h1>HOME</h1>
        {/* <img src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png" width={350} /> */}
      </Link>

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
            <Link to="/login" className="button is-danger">Login</Link>
            <Link to="/dashboard" className="button is-danger">Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default Footer