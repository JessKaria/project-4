import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'


const Inbox = ({ props }) => {
  const [modal, showModal] = useState(false)
  const token = localStorage.getItem('token')
  console.log(props)




  return <>
    <div className="container">
      <div className="buttons has-addons is-right">
      </div>
    </div>
    <div role="button" className={`modal ${modal ? 'is-active' : ''}`}>

      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"></p>
        </header>

        <section className="modal-card-body">
          <main className='column'>
            <div className='column is-flex is-flex-direction-column is-align-items-center'>




              <form className='field'>


                <div className='field'>
                  <label className='label-text'>Profile Picture</label>
                  <div className='control'>
                  </div>
                </div>

                <div className="control">
                </div>
              </form>
            </div>
          </main>
        </section>
        <footer className="modal-card-foot">
        </footer>
      </div>
    </div>Ì

  </>


}



export default Inbox
