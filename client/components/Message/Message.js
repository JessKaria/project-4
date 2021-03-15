import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'



const Message = ({ match }) => {
  const [profile, updateProfile] = useState([])
  const [event, updateEvent] = useState({})
  const token = localStorage.getItem('token')
  const id = match.params.id
  const user = getLoggedInUserId()

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
      })
  }, [])



  useEffect(() => {
    axios.get(`/api/event/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {
        updateEvent(data)
      })
  }, [])


  async function handleSubmit(event) {
    event.preventDefault()
    console.log(token)
    try {
      const { data } = await axios.post(`/api/send-message/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      history.push('/dashboard')
      

    } catch (err) {
      console.log(err.response.data)
    }
  }

  



  //! no previous history create convo

  if (profile.length === 0) {
    return <div>
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


                          <div className="container">
                          </div>
                          <a href="#" className="button is-primary">Read More</a>

                        </div>
                      </div>
                    </article>
                  </div>
                </div>
                <hr />
                <div className="column is-wrap">
                  <div className="column post is-4">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  }

  //! no previous history create convo

  return <>
    <div>
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
                          <a href="#" className="button is-primary">Read More</a>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
                <hr />
                <div className="column">
                  <div className="column">
                    
                  </div>
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
                    <button onSubmit={handleSubmit} className="button is-block is-primary is-fullwidth is-medium">Submit</button>
                    <br />
                    <small><em>Lorem ipsum dolor sit amet consectetur.</em></small>
                  </form>
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
