import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'



const Dashboard = ({ history }) => {
  const [events, updateEvents] = useState({})
  const [profile, updateProfile] = useState({})
  const [loading, updateLoading] = useState(true)
  const token = localStorage.getItem('token')
  const [inbox, updateInbox] = useState({})
  const user = getLoggedInUserId()




  useEffect(() => {
    axios.get('/api/messages', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {
        updateInbox(data)
      })
  }, [])

  useEffect(() => {
    axios.get('/api/event', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {
        updateEvents(data)
        updateLoading(false)
      })
  }, [])


  useEffect(() => {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {
        updateProfile(data)
      })
  }, [])



  if (loading) {
    return <h1 className="subtitle">Loading...</h1>
  }



  return <>

    <div>
      <section className="hero is-small">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1 ">Welcome back {profile.username}</h1>
            <h2 className="subtitle">A simple boilerplate for setting up parallax.</h2>
            <a href="#" className="button is-white is-medium is-inverted">Discover Events<i className="fad fa-chevron-right" /></a>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="columns">
          <div className="column is-3 ">
            <aside className="menu is-hidden-mobile">
              <p className="menu-label">
                General
              </p>
              <ul className="menu-list">
                <li><a className="is-active">Dashboard</a></li>
                <li><a>Customers</a></li>
                <li><a>Other</a></li>
              </ul>
            </aside>
          </div>
          <div className="column is-9">

            <div className="container">
              <section className="info-tiles">
                <div className="tile is-ancestor has-text-centered">
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">{inbox.length}</p>
                      <p className="subtitle">Messages</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">{events.length}</p>
                      <p className="subtitle">Events</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">3.4k</p>
                      <p className="subtitle">Open Orders</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">1</p>
                      <p className="subtitle">You</p>
                    </article>
                  </div>
                </div>
              </section>
              {events.map((event) => {
                return <div key={event.id}>
                  <Link key={event.id} to={{
                    pathname: `/message/${event.id}`,
                    state: {
                      name: event.name
                    }
                  }}>
                    <div className="container">
                      <div className="box content">


                        <article className="media">
                          <figure className="media-left">
              
                              <img src={event.image} width={200}/>
                    
                          </figure>
                          <div className="media-content">
                            <div className="content">
                              <p>
                                <strong>{event.name}</strong> 
                                <br />
                                <strong>Creator:</strong> <strong>{event.user.fullname}</strong> 
                                <br />
                                <strong>Date:</strong> <strong>{event.date}</strong>
                                <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
            </p>
                            </div>
                            <button className="button is-black">See this event</button>
                          </div>
                          <div className="media-right">
                
                          </div>
                        </article>




                      </div>


                    </div>
                  </Link>
                </div>
              })}
            </div>




            <div className="columns">
              <div className="column is-6">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  </>


}
export default withRouter(Dashboard)
