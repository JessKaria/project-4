import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'




const CreateEvent = ({ history }) => {
  const token = localStorage.getItem('token')

  const [formData, updateFormData] = useState({
    name: '',
    date: '',
    start_time: '',
    duration: '',
    description: '',
    target_age: '',
    expected_attendees: '',
    image: ''
  })

  console.log(formData)
  console.log(updateFormData)



  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    updateFormData({
      ...formData,
      [name]: value
    })
  }

  //?Image upload

  function handleUpload(event) {
    event.preventDefault()
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'stressipes',
        uploadPreset: 'mww9imzw',
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        updateFormData({
          ...formData,
          image: result.info.secure_url
        })
      }
    ).open()
  }



  async function handleSubmit(event) {
    event.preventDefault()
    console.log(token)
    try {
      const { data } = await axios.post('/api/event', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      history.push('/dashboard')


    } catch (err) {
      console.log(err.response.data)


    }
  }


  return <>

    <section className="hero is-fullheight">

      <div className="hero-body">
        <section className="container-wrap">
          <div className="columns is-multiline">
            <div className="column is-8 is-offset-2 register">
              <div className="columns">
                <div className="column left">
                  <h1 className="title is-1">Join huddle</h1>
                  <h2 className="subtitle colored is-4">Simply fill out the form to register your event.</h2>
                  <img src="https://images.unsplash.com/photo-1443186547344-2437c72a228e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D"></img>

                </div>
                <div className="column right has-text-centered">
                  <h1 className="title is-4">Sign up today</h1>
                  <p className="description">Discover awesome events.</p>
                  <form className='field' onSubmit={handleSubmit} >

                    <div className="field"  >
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Name"
                          value={formData.name}
                          onChange={handleChange}
                          name={'name'}
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="date"
                          placeholder="Date"
                          value={formData.date}
                          onChange={handleChange}
                          name={'date'}
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="time"
                          placeholder="Start Time"
                          value={formData.start_time}
                          onChange={handleChange}
                          name={'start_time'}
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Duration"
                          value={formData.duration}
                          onChange={handleChange}
                          name={'duration'}
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Description"
                          value={formData.description}
                          onChange={handleChange}
                          name={'description'}
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="number"
                          placeholder="Attendee age profile"
                          value={formData.target_age}
                          onChange={handleChange}
                          name={'target_age'}
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="number"
                          placeholder="Attendees"
                          value={formData.expected_attendees}
                          onChange={handleChange}
                          name={'expected_attendees'}
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <button className="button is-block is-danger is-fullwidth is-medium" onClick={handleUpload}>Upload a photo!</button>
                      </div>
                    </div>
                    <button onSubmit={handleSubmit} className="button is-block is-white is-medium is-inverted is-fullwidth">Submit</button>
                    <br />
                  </form>
                </div>
              </div>
            </div>
            <div className="column is-8 is-offset-2">
              <br />
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <span className="icon">
                      <i className="fab fa-twitter" />
                    </span>
                    <span className="icon">
                      <i className="fab fa-facebook" />
                    </span>
                    <span className="icon">
                      <i className="fab fa-instagram" />
                    </span>
                    <span className="icon">
                      <i className="fab fa-github" />
                    </span>
                    <span className="icon">
                      <i className="fas fa-envelope" />
                    </span>
                  </div>
                </div>
                <div className="level-right">
                  <small className="level-item" style={{ color: 'var(--textLight)' }}>
                    ?? huddle. All Rights Reserved.</small>
                </div>
              </nav>
            </div>
          </div>
        </section>

      </div>


    </section>





  </>


}
export default CreateEvent
