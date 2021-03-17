import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'



const Dashboard = ({ history }) => {
  const [events, updateEvents] = useState([])
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
      <section className="hero is-black">
        <div className="hero-body">
          <div className="columns">
            <div className="column is-12">
              <div className="container content">
                <i className="is-large fab fa-discord" />
                <i className="is-large fas fa-code" />
                <h1 className="title is-1 ">Welcome back {profile.fullname}.</h1>
                <h3 className="subtitle">We now have {events.length} events live on our platform.</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-3">
              <aside className="is-medium menu">
                <p className="menu-label">YOUR DASHBOARD</p>
                <ul className="menu-list">
                  <li className="is-right"></li>

                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={profile.photo} alt={profile.fullname} />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left">
                          <figure className="image is-48x48">
                            <img src={profile.photo} alt={profile.fullname} />
                          </figure>
                        </div>
                        <div className="media-content">
                          <p className="title is-4">{profile.fullname}</p>
                          <p className="subtitle is-6">@{profile.username}</p>
                        </div>
                      </div>
                      <div className="content">
                        {profile.headline} 
                        <br />
                      </div>
                    </div>
                  </div>










                </ul>
                <p className="menu-label">
                  FILTER EVENTS BY
                  </p>
                <ul className="menu-list">
                  <li><span className="tag is-white is-medium">Business</span></li>
                  <li><span className="tag is-white is-medium">Food</span></li>
                  <li><span className="tag is-white is-medium">Health</span></li>
                  <li><span className="tag is-white is-medium">Music</span></li>
                  <li><span className="tag is-white is-medium">Charity</span></li>
                  <li><span className="tag is-white is-medium">Community</span></li>
                  <li><span className="tag is-white is-medium">Fashion</span></li>
                  <li><span className="tag is-white is-medium">Film</span></li>
                  <li><span className="tag is-white is-medium">Hobbies</span></li>
                  <li><span className="tag is-white is-medium">Film</span></li>
                  <li><span className="tag is-white is-medium">Hobbies</span></li>
                  <li><span className="tag is-white is-medium">Government</span></li>
                  <li><span className="tag is-white is-medium">Science</span></li>
                </ul>
              </aside>
            </div>


            <div className="column is-9">
              <div className="content is-medium">
                <div className="container-scroll">
                  {events.map((event) => {
                    return <div key={event.id}>
                      <Link key={event.id} to={{
                        pathname: `message/${event.id}`,
                        state: {
                          name: event.name
                        }
                      }}>
                        <article className="columns is-multiline">
                          <div className="column is-12 post-img">
                            <img src={event.image} alt={event.name} />
                          </div>
                          <div className="column is-12">
                            <p className="heading post-category">{event.date} | {event.start_time} | {event.duration}</p>
                            <h2 className="title post-title">{event.name}</h2>
                            <article className="media">

                              <div className="media-right">

                              </div>
                            </article>
                            <p>{event.description}</p>
                            <button className="button is-dark">Find Out More</button>
                          </div>
                          <article className="media">


                            <div className="media-right">
                              <div>
                              
                              </div>
                              
                            </div>
                          </article>

                        </article>
                      </Link>
                    </div>
                  })}
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
