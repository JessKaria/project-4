import React, { useState } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { Alert } from 'reactstrap'

// fullname='Sam again',
// username = 'Sammy', 
// email='test4@test.com', 
// password='test',
// headline='Live!',
// photo='',


const Login = ({ history }) => {

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
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





  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)
      if (localStorage) {
        localStorage.setItem('token', data.token)
      }
      history.push('/dashboard')
      console.log('')
    } catch (err) {
      console.log(err.response.data.message)
      alert(err.response.data.message)
    }
  }


  return <>
    <section className="hero is-fullheight">
      <div className="hero-body">
        <main className="column">
          <div className="column is-flex is-flex-direction-column is-align-items-center">
            <h1 className="title is-1 ">huddle.</h1>
            <form className='field' onSubmit={handleSubmit} >

              <div className="field">
                <div className="control">
                  <input
                    className="input is-medium"
                    placeholder="hello@example.com"
                    autoComplete="username" required
                    type="email"
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
                    placeholder="**********"
                    type="password"
                    autoComplete="current-password" required
                    value={formData.password}
                    onChange={handleChange}
                    name={'password'}
                  />
                </div>
              </div>
              <br />
              <button className="button is-block is-fullwidth is-medium is-white is-medium is-inverted" type="submit">Login</button>
            </form>
            <br />
            <nav className="level">
              <div className="level-item has-text-centered">
                <div>
                  <Link to="/register" className="text">Creat an account</Link>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                </div>
              </div>
            </nav>
          </div>
        </main>
      </div>
    </section>

  </>


}
export default withRouter(Login)
