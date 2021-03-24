import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'
import Inbox from './Inbox'


const Message = ({ match, history }) => {
  const [profile, updateProfile] = useState([])
  const [event, updateEvent] = useState({})
  const [convo, updateConvo] = useState({})
  const [messages, updateMessages] = useState(false)
  const [createChat, updateCreateChat] = useState(false)
  const [user, updateUser] = useState({})
  const [newConvo, updateNewConvo] = useState({})
  const [chat, getChat] = useState([])
  const token = localStorage.getItem('token')
  const id = match.params.id

  console.log(chat)

  const [formData, updateFormData] = useState({
    subject: '',
    message: ''
  })

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    updateFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    axios.get(`/api/check-convo/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {
        updateProfile(data)
        updateConvo(data[0])
      })
  }, [])


  useEffect(() => {
    axios.get(`/api/event/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {
        updateEvent(data)
        updateUser(data.user)
      })
  }, [])



  async function handleSubmit() {
    // event.preventDefault()
    console.log(token)
    try {
      const { data } = await axios.post(`/api/send-message/${convo.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (err) {
      console.log(err.response.data)
    }
    history.push('/dashboard')
  }

  async function handleConvo(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post(`/api/create-convo/${user.id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateNewConvo(data.id)
      console.log(data.id)
      updateCreateChat(!createChat)
    } catch (err) {
      console.log(err.response.data)
    }
  }


  async function getMessages(event) {
    event.preventDefault()
    try {
      const { data } = await axios.get(`/api/convo-history/${convo.id}`, {
        headers: { Authorization: `Bearer ${token}` }

      })
      getChat(data)
      updateMessages(!messages)
    } catch (err) {
      console.log(err.response.data)
    }

  }




  //! no previous history create convo

  if (profile.length === 0) {
    return <>
      <section className="hero is-black">
        <div className="hero-body">
          <div className="columns">
            <div className="column is-12">
              <div className="container content">
                <i className="is-large fab fa-discord" />
                <i className="is-large fas fa-code" />
                <h1 className="title is-1 ">This event is hosted by {user.username}.</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>

        <section className="hero is-small">
          <div className="hero-body">
            <div className="container">
            </div>
          </div>
        </section>
        <section className="hero is-fullheight">
          <div className="containers">
            <div className="hero is-fullheight">
              <div className="columns">
                <div className="column is-10 is-offset-1">
                  <div className="columns featured-post is-multiline">
                    <div className="column is-12 post">
                      <article className="columns featured">
                        <div className="column is-7 post-img ">
                          <img src={event.image} alt="" />
                        </div>
                        <div className="column is-5 featured-content va">
                          <div>
                            <h3 className="heading post-category">{event.date}</h3>
                            <h1 className="title post-title">{event.name}</h1>
                            <p className="post-excerpt">{event.description}</p>
                            <br />

                            <article className="media">
                              <figure className="media-left">
                                <p className="image is-96x96">
                                  <img className="small-picture" src={user.photo} />
                                </p>
                              </figure>
                              <div className="media-content">
                                <div className="content">
                                  <small>
                                    <strong>Host: </strong>{user.username} <br />
                                    <strong>Duration: </strong>{event.duration} <br />
                                    <strong>Average attendee age: </strong>{event.target_age} <br />
                                    <strong>Expected attendees:</strong> {event.expected_attendees} <br />
                                    <strong>Start Time: </strong>{event.start_time} <br />
                                  </small>



                                </div>
                                <nav className="level is-mobile">
                                  <div className="level-left">
                                    <a className="level-item">
                                      <span className="icon is-small"><i className="fas fa-reply" /></span>
                                    </a>
                                    <a className="level-item">
                                      <span className="icon is-small"><i className="fas fa-retweet" /></span>
                                    </a>
                                    <a className="level-item">
                                      <span className="icon is-small"><i className="fas fa-heart" /></span>
                                    </a>
                                  </div>
                                </nav>
                              </div>
                              <div className="media-right">
                              </div>
                            </article>


                            <button className="button is-white is-medium is-inverted" onClick={handleConvo}> Create a chat</button>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                  <hr />

                  {createChat === true ?


                    <div className="columns">

                      <div className="column">

                      </div>
                      <div className="column">
                        <form onSubmit={handleSubmit} className='field'  >
                          <div className="field"  >
                            <div className="control">
                              <input
                                className="input is-medium"
                                type="text"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                name={'subject'}
                              />
                            </div>
                          </div>
                          <div className="field">
                            <div className="control">
                              <input
                                className="input is-medium"
                                type="text"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                                name={'message'}
                              />
                            </div>
                          </div>
                          <div className="field">
                            <div className="control">
                            </div>
                          </div>
                          <button onSubmit={handleSubmit} className="button is-fullwidth is-white is-medium is-inverted">Send a message!</button>
                          <br />
                          <small><em>Lorem ipsum dolor sit amet consectetur.</em></small>
                        </form>

                      </div>

                    </div>
                    :
                    <div></div>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </>

  }

  //! yes there is previous history - return all messages in that conversation

  return <>
    <section className="hero is-black">
      <div className="hero-body">
        <div className="columns">
          <div className="column is-12">
            <div className="container content">
              <i className="is-large fab fa-discord" />
              <i className="is-large fas fa-code" />
              <h1 className="title is-1 ">This event is hosted by {user.username}.</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div>
      <section className="hero is-small">
        <div className="hero-body">
          <div className="container">
          </div>
        </div>
      </section>
      <section className="hero is-fullheight">
        <div className="containers">
          <div className="hero is-fullheight">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="columns featured-post is-multiline">
                  <div className="column is-12 post">
                    <article className="columns featured">
                      <div className="column is-7 post-img ">
                        <img src={event.image} alt="" />
                      </div>
                      <div className="column is-5 featured-content va">
                        <div>
                          <h3 className="heading post-category">{event.date}</h3>
                          <h1 className="title post-title">{event.name}</h1>
                          <p className="post-excerpt">{event.description}</p>
                          <br />
                          <br />

                          <article className="media">
                            <figure className="media-left">
                              <p className="image is-96x96">
                                <img className="small-picture" src={user.photo} />
                              </p>
                            </figure>
                            <div className="media-content">
                              <div className="content">
                                <small>
                                  <strong>Host: </strong>{user.username} <br />
                                  <strong>Duration: </strong>{event.duration} <br />
                                  <strong>Average attendee age: </strong>{event.target_age} <br />
                                  <strong>Expected attendees:</strong> {event.expected_attendees} <br />
                                  <strong>Start Time: </strong>{event.start_time} <br />
                                </small>
                              </div>
                              <nav className="level is-mobile">
                                <div className="level-left">
                                  <a className="level-item">
                                    <span className="icon is-small"><i className="fas fa-reply" /></span>
                                  </a>
                                  <a className="level-item">
                                    <span className="icon is-small"><i className="fas fa-retweet" /></span>
                                  </a>
                                  <a className="level-item">
                                    <span className="icon is-small"><i className="fas fa-heart" /></span>
                                  </a>
                                </div>
                              </nav>
                            </div>
                            <div className="media-right">
                            </div>
                          </article>

                          <button onClick={getMessages} className="button is-white is-medium is-inverted">Check messages.</button>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
                <hr />
                <div className="column">
                  <div className="column">


                  </div>


                  <div className="columns">
                    <div className="column">
                      {chat.map((cha) => {
                        return <div key={cha.id}>

                          <article className="message">
                            <div className="message-header">
                              <article className="media">
                                <figure className="media-left">
                                  <p className="image is-64x64">
                                    <img src={cha.user.photo} />
                                  </p>
                                </figure>
                                <div className="media-content">
                                  <div className="content">
                                    <p>
                                      <strong>@{cha.user.fullname}</strong> <br />
                                      <small>{cha.user.username}</small>
                                      <br /></p>
                                  </div>
                                </div>
                                <div className="media-right">
                                </div>
                              </article>
                            </div>
                            <div className="message-body">
                              <strong>Subject: {cha.subject}</strong><br />
                              Message: {cha.message}</div>
                          </article>



                        </div>
                      })}



                    </div>
                    <div className="column">
                      <form onSubmit={handleSubmit} className='field'  >
                        <div className="field"  >
                          <div className="control">
                            <input
                              className="input is-medium"
                              type="text"
                              placeholder="Subject"
                              value={formData.subject}
                              onChange={handleChange}
                              name={'subject'}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <div className="control">
                            <input
                              className="input is-medium"
                              type="text"
                              placeholder="Message"
                              value={formData.message}
                              onChange={handleChange}
                              name={'message'}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <div className="control">
                          </div>
                        </div>
                        <button onSubmit={handleSubmit} className="button is-block is-fullwidth is-white is-medium is-inverted">Send a message!</button>
                        <br />

                      </form>
                    </div>

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



export default Message
