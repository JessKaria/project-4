import React, { useState } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'


const Register = ({ history }) => {

  const [formData, updateFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    headline: '',
    photo: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
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
          photo: result.info.secure_url
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
      alert(err.response.data)
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
                  <h1 className="title is-1">Discover awesome events.</h1>
                  <h2 className="subtitle colored is-4">The best party hunting platform.</h2>
                  <img src="https://images.unsplash.com/photo-1443186547344-2437c72a228e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D"></img>
                </div>
                <div className="column right has-text-centered">
                  <form className='field' onSubmit={handleSubmit} >
                    <br/>
                    <div className="field"  >
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Full Name"
                          value={formData.fullname}
                          onChange={handleChange}
                          name={'fullname'}
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Username"
                          value={formData.username}
                          onChange={handleChange}
                          name={'username'}
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          name={'email'}
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          name={'password'}
                        />
                      </div>
                    </div>


                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Headline"
                          value={formData.headline}
                          onChange={handleChange}
                          name={'headline'}
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <button className="button is-block is-danger is-fullwidth is-medium" onClick={handleUpload}>Add a profile picture.</button>
                      </div>
                    </div>





                    <button onSubmit={handleSubmit} className="button is-white is-medium is-fullwidth is-inverted">Submit</button>


                    <small className="level-item" style={{ color: 'var(--textLight)' }}>
                    © Super Cool Website. All Rights Reserved.</small>

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
                 
                </div>
              </nav>
            </div>
          </div>
        </section>

      </div>


    </section>

  </>


}
export default withRouter(Register)