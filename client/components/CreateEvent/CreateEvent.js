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
      

    } catch (err) {
      console.log(err.response.data)
    }
  }


  return <>
    <div>
      <section className="hero is-fullheight">

        <div className="hero-body">
          <section className="container-wrap">
            <div className="columns is-multiline">
              <div className="column is-8 is-offset-2 register">
                <div className="columns">
                  <div className="column left">
                    <h1 className="title is-1">Super Cool Website</h1>
                    <h2 className="subtitle colored is-4">Lorem ipsum dolor sit amet.</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis ex deleniti aliquam tempora libero excepturi vero soluta odio optio sed.</p>
                  </div>
                  <div className="column right has-text-centered">
                    <h1 className="title is-4">Sign up today</h1>
                    <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
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
                          />
                        </div>
                      </div>

                      <div className="field">
                        <div className="control">
                          <input
                            className="input is-medium"
                            type="text"
                            placeholder="Attendee age profile"
                            value={formData.target_age}
                            onChange={handleChange}
                            name={'target_age'}
                          />
                        </div>
                      </div>

                      <div className="field">
                        <div className="control">
                          <input
                            className="input is-medium"
                            type="text"
                            placeholder="Attendees"
                            value={formData.expected_attendees}
                            onChange={handleChange}
                            name={'expected_attendees'}
                          />
                        </div>
                      </div>

                      <div className="field">
                        <div className="control">
                          <button className="button is-block is-danger is-fullwidth is-medium" onClick={handleUpload}>Add a profile picture.</button>
                        </div>
                      </div>





                      <button onSubmit={handleSubmit} className="button is-block is-primary is-fullwidth is-medium">Submit</button>



                      <br />
                      <small><em>Lorem ipsum dolor sit amet consectetur.</em></small>
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
                      © Super Cool Website. All Rights Reserved.</small>
                  </div>
                </nav>
              </div>
            </div>
          </section>

        </div>


      </section>
    </div>




  </>


}
export default CreateEvent
