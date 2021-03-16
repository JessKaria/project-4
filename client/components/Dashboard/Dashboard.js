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
            <div className="contain">



              <div className="contain">
                {inbox.map((inb) => {
                  return <div key={inb.id}>
                    <div className="box content">
                      <article className="post">
                        <h4>{inb.subject}</h4>
                        <div className="media">
                          <div className="media-left">
                            <p className="image is-32x32">
                              <img src="http://bulma.io/images/placeholders/128x128.png" />
                            </p>
                          </div>
                          <div className="media-content">
                            <div className="content">
                              <p>
                                <a href="#">@jsmith</a> replied 34 minutes ago &nbsp;<span className="tag">Question</span>
                              </p>
                            </div>
                          </div>
                          <div className="media-right">
                            <span className="has-text-grey-light"><i className="fa fa-comments" /> 1</span>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>






  </>


}
export default withRouter(Dashboard)
