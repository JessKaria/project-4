import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'



const Message = ({ match }) => {
  const [profile, updateProfile] = useState({})
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



  async function handleMessage() {
    try {
      const { data } = await axios.post(`/api/send-message/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (err) {
      console.log(err.response.data)
    }
  }

  console.log(formData)


  // if (profile.length === 0) {

  // }

  return <>
    <div className="hero is-fullheight">
      <aside className="is-medium menu">
        <button className="button" onClick={handleMessage}>mmmMessage</button>
        <div className="container">
          {profile.username}

          <div>
            <form className="fielf" onSubmit={handleMessage}>


              <div className="field">
                <label className="label">Subject</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Text input"
                    value={formData.subject}
                    onChange={handleChange}
                    name={'subject'}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Message</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Textarea"
                    type="text"
                    value={formData.message}
                    onChange={handleChange}
                    name={'message'}
                  />
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button
                    className="button is-link">Submit</button>
                </div>
                <div className="control">
                  <button className="button is-link is-light">Cancel</button>
                </div>
              </div>




            </form>

          </div>



        </div>

      </aside>
    </div>

  </>

}



export default Message
