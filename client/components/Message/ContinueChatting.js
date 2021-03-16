import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'


const ContinueChatting = (props) => {
  const [modal, showModal] = useState(false)
  const history = props.history
  const token = localStorage.getItem('token')
  const [chat, getChat] = useState({})
  const convo = props.convo


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


  async function handleSubmit(event) {
    event.preventDefault()
    console.log(token)
    try {
      const { data } = await axios.post(`/api/send-message/${convo.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data)
    } catch (err) {
      console.log(err.response.data)
    }
    showModal(!modal)
  }


  async function getMessages(event) {
    event.preventDefault()
    try {
      const { data } = await axios.get(`/api/convo-history/${convo.id}`, {
        headers: { Authorization: `Bearer ${token}` }

      })
      getChat(data)
      console.log(data)
    } catch (err) {
      console.log(err.response.data)
    }
    showModal(!modal)
  }



  //! no previous history create convo

  return <>
    <div className="container">
      <div className="buttons has-addons is-right">
        <button className="button is-dark is-rounded" onClick={getMessages}>Chat away </button>
      </div>
    </div>
    <div role="button" className={`modal ${modal ? 'is-active' : ''}`}>

      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"></p>
          <button className="delete" aria-label="close" onClick={() => showModal(!modal)} />
        </header>

        <section className="modal-card-body">
          <main className='column'>
            <div className='column is-flex is-flex-direction-column is-align-items-center'>

              <div>
                <h1 className='label'>Hello! </h1>
              </div>
              <div>
                <figure className="image is-128x128">
                  <img className="is-rounded" />
                </figure>
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
                <button onSubmit={handleSubmit} className="button is-block is-primary is-fullwidth is-medium">Send a message!</button>
                <br />
                <small><em>Lorem ipsum dolor sit amet consectetur.</em></small>
              </form>



            </div>
          </main>
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={() => showModal(!modal)}>Close</button>
        </footer>
      </div>
    </div>


  </>







}



export default ContinueChatting
