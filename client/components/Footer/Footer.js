import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'

const Footer = () => {


  return <nav className="navbar is-white is-sticky" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
    </div>
    <div id="navbarBasicExample" className="nav">
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/dashboard" className="button is-danger">Home</Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default Footer