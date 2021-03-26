import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = ({ history }) => {

  const { register, handleSubmit, errors } = useForm()
  const [error, updateError] = useState('')


  async function onSubmit(data) {
    const formData = {
      'email': data.email,
      'password': data.password
      
    }


    try {
      const { data } = await axios.post('/api/login', formData)
      if (localStorage && data.token) {
        localStorage.setItem('token', data.token)
        history.push('/dashboard')
      } else {
        updateError('Invalid credentials')
      }
    } catch (err) {
      updateError('Invalid credentials')
    }
    
  }

  

  return <>
    <section className="hero is-fullheight">
      <div className="hero-body">
        <main className="column">
          <div className="column is-flex is-flex-direction-column is-align-items-center">
            <h1 className="title is-1 ">huddle.</h1>
            <form className='field' onSubmit={handleSubmit(onSubmit)} >

              <div className="field">
                <div className="control">
                  <input
                    className="input is-medium"
                    placeholder="hello@example.com"
                    type="email"
                    name='email'
                    ref={register({ required: 'Email is required' })}
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-medium"
                    placeholder="**********"
                    type="password"
                    name='password'
                    ref={register({ required: 'Password is required', minLength: { value: 4, message: 'Password too short!' } })}
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
                
                
              </div>
              {error && <div className='notification is-black'>{error}</div>}
              <button className="button is-block is-fullwidth is-medium is-white is-medium is-inverted" type="submit">Login</button>
            </form>
            <br />
            <nav className="level">
            
              <div className="level-item has-text-centered">
                <div>

                </div>
              </div>
              <div className="level-item has-text-centered">
                <Link to="/register" >Create an account.</Link>
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
export default Login
