import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import './styles/style.scss'
import Navbar from './components/Nav/Navbar'
import Home from './components/Homepage/Home'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Footer from './components/Footer/Footer'
import Dashboard from './components/Dashboard/Dashboard'
import CreateEvent from './components/CreateEvent/CreateEvent'
import Message from './components/Message/Message'
import axios from 'axios'



// ! Some starter code for your frontend, change this
// ! however you like.
const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/create-event" component={CreateEvent} />
      <Route path="/message/:id" component={Message} />
      <Route exact path="/test/backend" component={TestBackend} />
    </Switch>
    <Footer />
  </BrowserRouter>
)



// ! Just a little component to test that you can talk to your flask server, check if it
// ! works in network tab.
const TestBackend = () => {
  useEffect(() => {
    // ? This is going to try localhost:5000/api
    axios.get('/api/event')
      .then(({ data }) => console.log(data))
  }, [])

  return <p>
    Hello World
  </p>
}

export default App