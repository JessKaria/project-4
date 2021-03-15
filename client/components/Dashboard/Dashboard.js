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
    axios.get('/api/inbox', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {
        updateInbox(data)
      })
  }, [])

  console.log(inbox)

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
            <h2 className="subtitle">A simple boilerplate for setting up parallax <br /> using the Bulma Hero container.</h2>
            <a href="#" className="button is-white is-medium is-inverted">Discover Events<i className="fad fa-chevron-right" /></a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-3">
              <aside className="is-medium menu">
                <p className="menu-label">categories</p>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={profile.photo} />
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
                    <div className="content">{profile.headline}<br /></div>
                  </div>
                </div>
                <p className="menu-label">General</p>
                <ul className="menu-list">
                  <li><a>Inbox</a></li>
                  <li><a>Friends</a></li>
                </ul>
                <p className="menu-label">Categories</p>
                <ul className="menu-list">
                  <li><a>Team Settings</a></li>
                  <li>
                    <a className="is">Manage Your Team</a>
                    {inbox.map((i) => {
                      return <div key={i.id}>
                        <Link key={i.id} to={{
                          pathname: '/message/${event.id}'
                        }}>
                          <p>{inbox.create_at}</p>
                        </Link>
                      </div>
                    })}

                  </li>
                </ul>


              </aside>
            </div>

            <div className="column is-9">

              <div className="content is-medium">
                <h3 className="title is-3"> ¯\_(ツ)_/¯</h3>

                <div className="box">


                  <div className="container">
                    {events.map((event) => {
                      return <div key={event.id}>
                        <Link key={event.id} to={{
                          pathname: `/message/${event.id}`,
                          state: {
                            name: event.name
                          }
                        }}>

                          <article className="message is-primary">


                            <div className="card">
                              <div className="card-content">
                                <figure className="image is-4by3">
                                  <img src={event.image} alt="Placeholder image" />
                                </figure>
                                <h4 id="const" className="title is-3">{event.name}</h4>
                                <div className="content">{event.description}</div>

                              </div>
                            </div>

                            <span className="icon has-text-primary">
                              <i className="fab fa-js" />
                            </span>
                          </article>
                        </Link>
                      </div>
                    })}
                  </div>



















                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>



  </>


}
export default withRouter(Dashboard)
