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
              <p className="menu-label">
                Administration
              </p>
              <ul className="menu-list">
                <li><a>Team Settings</a></li>
                <li>
                  <a>Manage Your Team</a>
                  <ul>
                    <li><a>Members</a></li>
                    <li><a>Plugins</a></li>
                    <li><a>Add a member</a></li>
                    <li><a>Remove a member</a></li>
                  </ul>
                </li>
                <li><a>Invitations</a></li>
                <li><a>Cloud Storage Environment Settings</a></li>
                <li><a>Authentication</a></li>
                <li><a>Payments</a></li>
              </ul>
              <p className="menu-label">
                Transactions
              </p>
              <ul className="menu-list">
                <li><a>Payments</a></li>
                <li><a>Transfers</a></li>
                <li><a>Balance</a></li>
                <li><a>Reports</a></li>
              </ul>
            </aside>
          </div>
          <div className="column is-9">


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
                    <p className="title">19</p>
                    <p className="subtitle">Exceptions</p>
                  </article>
                </div>
              </div>
            </section>



            <section className="info-tiles">
              <div className="tile is-ancestor has-text-centered">
                <div className="tile is-parent">

                </div>
              </div>
            </section>

            <div className="container">
              <div className="section">
                <div className="columns">
                  <div className="column has-text-centered">
                  </div>
                </div>
                <div id="app" className="row columns is-multiline">
                  <div v-for="card in cardData" key="card.id" className="column is-4">
                    <div className="card large">
                      <div className="card-image">
                        <figure className="image is-16by9">
                          <img src="" alt="Image" />
                        </figure>
                      </div>
                      <div className="card-content">
                        <div className="media">
                          <div className="media-left">
                            <figure className="image is-48x48">
                              <img src="" alt="Image" />
                            </figure>
                          </div>
                          <div className="media-content">
                            <p className="title is-4 no-padding">{'{'}{'{'}card.user.title{'}'}{'}'}</p>

                            <p className="subtitle is-6">{'{'}{'{'}card.user.title{'}'}{'}'}</p>
                          </div>
                        </div>
                        <div className="content">
                          {'{'}{'{'}card.content{'}'}{'}'}
                          <div className="background-icon"><span className="icon-twitter" /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
