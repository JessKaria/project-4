import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'



const Home = ({ history }) => (
  

  <>
    <section className="hero is-medium">
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-1 ">huddle.</h1>
          <h2 className="subtitle">Discover the most illustrious events<br /> in the observable universe.</h2>
          <Link to="/register" className="button is-white is-medium is-inverted">Sign Up</Link>
        </div>
      </div>
    </section>
    <section id="parallax-1" className="hero is-large ">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-6 is-offset-6">
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="hero is-medium">
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-1 ">Join the club</h1>
          <h2 className="subtitle"  >This app was created by Jess Karia during the General Assembly SEI Immersive Course</h2>
          <Link to="/register" className="button is-white is-medium is-inverted">Sign Up</Link>
        </div>
      </div>
    </section>

  </>







)

export default withRouter(Home)