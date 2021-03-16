import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'


import axios from 'axios'


const Home = ({ history }) => (

  <>
    <section className="hero is-medium">
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-1 ">Hello World</h1>
          <h2 className="subtitle">A simple boilerplate for setting up parallax <br /> using the Bulma Hero container.</h2>
          <Link to="/register" className="button is-white is-medium is-inverted">Register</Link>
        </div>
      </div>
    </section>
    <section id="parallax-1" className="hero is-large ">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-6 is-offset-6">
              <h1 className="title is-1 ">Lorem Ipsum</h1>
              <hr className="content-divider" />
              <h2 className="subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit explicabo amet magni illum eum voluptate! Eveniet voluptatem nam magnam necessitatibus.</h2>
              <a href="#" className="button is-white is-inverted">Next <i className="fad fa-chevron-right" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="parallax-2" className="hero is-large ">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-6">
              <h1 className="title is-1 ">Dolor Sit</h1>
              <hr className="content-divider" />
              <h2 className="subtitle">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque veritatis sequi natus minima distinctio ullam deleniti quasi quisquam autem deserunt.</h2>
              <a href="#" className="button is-white is-inverted">Next <i className="fad fa-chevron-right" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="parallax-3" className="hero is-large ">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-6 is-offset-6">
              <h1 className="title is-1 ">Amet Consectetur</h1>
              <hr className="content-divider" />
              <h2 className="subtitle">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure minus nam necessitatibus neque in perferendis eveniet dolorum assumenda dolores accusamus.</h2>
              <a href="#" className="button is-white is-inverted">Next <i className="fad fa-chevron-right" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  
  </>







)

export default withRouter(Home)