import React, { useState } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'

// fullname='Sam again',
// username = 'Sammy', 
// email='test4@test.com', 
// password='test',
// headline='Live!',
// photo='',


const Register = ({ history }) => {

  const [formData, updateFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    headline: '',
    photo: ''
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
    try {
      const { data } = await axios.post('/api/register', formData)
      history.push('/login')
      console.log(data)
    } catch (err) {
      console.log(err.response.data)
    }


  }








  return <>
    <section className="hero is-fullheight is-black">
      <div className="hero-body">

        <main className='column'>
          <div className='column is-flex is-flex-direction-column is-align-items-center'>

            <h3 className='title'>Join the club!</h3>
            <form className='field' onSubmit={handleSubmit} >



              <div className='field'>
                <label className='labels'>Fullname</label>
                <div className='control'>
                  <input className='input'
                    type="text"
                    value={formData.fullname}
                    onChange={handleChange}
                    name={'fullname'}
                  />
                </div>
              </div>


              <div className='field'>
                <label className='labels'>Username</label>
                <div className='control'>
                  <input className='input'
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    name={'username'}
                  />
                </div>
              </div>

              <div className='field'>
                <label className='labels'>Email</label>
                <div className='control'>
                  <input className='input'
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    name={'email'}
                  />
                </div>
              </div>

              <div className='field'>
                <label className='labels'>Password</label>
                <div className='control'>
                  <input className='input'
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    name={'password'}
                  />
                </div>
              </div>

              <div className="field">
                <label className="labels">Headline</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Textarea"
                    value={formData.headline}
                    onChange={handleChange}
                    name={'headline'}
                  ></textarea>

                </div>
              </div>

              <div className='field'>
                <label className='labels'>Profile Picture</label>
                <div className='control'>
                  <button className="button is-danger" onClick={handleUpload}>Add a profile picture.</button>

                </div>
              </div>

              <div className="control">
                <button className="button">Register</button>
              </div>
            </form>
          </div>
        </main>





      </div>
    </section>
  </>


}
export default withRouter(Register)
