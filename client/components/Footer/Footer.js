import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'

const Footer = () => {


  return <nav className="navbar is-black" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
    </div>
    <div id="navbarBasicExample" className="nav">
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default Footer