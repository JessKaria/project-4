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
  console.log(events)




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
      <div className="container">
        <div className="columns">
          <div className="column is-3 ">
            <aside className="menu is-hidden-mobile">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={profile.photo} alt="Placeholder image" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img src={profile.photo} alt="Placeholder image" />
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">{profile.fullname}</p>
                      <p className="subtitle is-6">@{profile.username}</p>
                    </div>
                  </div>
                  <div className="content">{profile.headline}
                    <br />
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <div className="column is-9">
            <section className="hero is-info welcome is-small">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">
                    Hello, {profile.username}!.</h1>
                  <h2 className="subtitle">I hope you are having a great day!</h2>
                </div>
              </div>
            </section>
            <section className="info-tiles">
              <div className="tile is-ancestor has-text-centered">
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    <p className="title">{inbox.length}</p>
                    <p className="subtitle">Messages Sent</p>
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    <p className="title">{events.length}</p>
                    <p className="subtitle">Live Events</p>
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
                    <p className="title">19</p>
                    <p className="subtitle">Exceptions</p>
                  </article>
                </div>
              </div>
            </section>

            <div className="container">
              {events.map((event) => {
                return <div key={event.id}>
                  <Link key={event.id} to={{
                    pathname: `/message/${event.id}`,
                    state: {
                      name: event.name
                    }
                  }}>
                    <article className="columns is-multiline">
                      <div className="column is-12 post-img">
                        <img src={event.image} alt="Featured Image" />
                      </div>
                      <div className="column is-12 featured-content ">
                        <h3 className="heading post-category">{event.date} | {event.start_time} | {event.duration}</h3>
                        <h1 className="title post-title">{event.name}</h1>
                        <p className="post-excerpt">{event.description}</p>
                        <br />
                        <button className="button is-dark">Find Out More</button>
                      </div>
                    </article>
                  </Link>
                </div>
              })}
            </div>







          </div>
        </div>
      </div>
    </div>






  </>


}
export default withRouter(Dashboard)
