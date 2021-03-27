# README


### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, SEI 


## Huddle | 7 Day Solo Project 🍷🤞🕺🏿


## Overview
For our third project at General Assembly, we were asked to build a full-stack web application by building our own front and back-end, I chose to go solo, as I wanted to get stuck in at building everthing from start to finish. 

## Brief

* Build a full-stack application by making your own back-end and your own front-end
* Use an Flask API to serve your data from a Postgres database
* Consume your API with a separate front-end built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
* Be deployed online so it's publicly accessible.

You can view our App deployed here on Heroku [here](https://huddle-sei.herokuapp.com/), or find the GitHub repo [here](https://github.com/JessKaria/project-4).


## Introducing, Huddle!
 
![here](https://github.com/JessKaria/project-3/blob/main/Untitled%20design%20(3).png?raw=true)

## Technologies

* React 
* Express 
* React Hooks
* MongoDB 
* Mongoose
* JSX 
* SASS 
* Bulma
* Git and GitHub 
* Canva 
* Google Fonts
* Insomnia 
* Babel
* Axios 
* Mocha
* Chai 
* Supertest
* React Select
* Speech Synthesis

From the beginning of the project, we had a high level of communication. We kicked off the day with a stand-up discussing challenges we were facing, status of current features and any roadblocks we were facing.

## Planning

![here](https://github.com/JessKaria/project-3/blob/main/Timeline.png?raw=true)

We worked collabortively to design our backend, from our models right through to sudo-coding controllers, once we were agreed on the functionality and what our MVP was be then started dividing responsibility of the project.

* Back-end - Day 2, 3, 4
* Front-end - Day 4, 5, 6, 7
* Deployment - Full Day

## User Journey

![here](https://github.com/JessKaria/project-3/blob/main/image.png?raw=true)

We all collaborated on designing the user journey and with it being our first time, we spent a great deal of time discussing the purpose of each page, what requests would need to happen on that page, what the response would be and what information we wanted to render. This was a really enjoyable process and the detail really helped to keep us on track later on in the project.

## User Models

It was my responsibility to deliver user registration, login, profile update and recipe editing functionality and all the suppoting MVC structure. For email validation I opted use RegEx over a package, I also decided to add in some friendly error handling which I could then render on the front end. In addition the user models also two arrays for recipes a user has saved and also posted.

For password encryption we use bcrypt along with a mongoose validator to encrypt the passwords and validator for email verification.

```
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseHidden from 'mongoose-hidden'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
      },
      message: 'Please enter a valid email'
    }
  },
  image: { type: String },
  password: { type: String, required: true, minlength: 8, message: 'Password must be more than 8 character...' },
  isAdmin: { type: Boolean },
  savedRecipes: [{ type: mongoose.Schema.ObjectId, ref: 'Recipes' }],
  postedRecipes: [{ type: mongoose.Schema.ObjectId, ref: 'Recipes' }]
})

```

## Testing ☕️

We all collaborated on our MVC and tested the routes we were responsible for, we all ran tests on Insomnia asking ourselves the following questions for each request. 

* Sending a blank response do I get a response?
* Do I get the correct response?
* Do I get the correct data and only what information I need?
* Can I access the data without authentication?
* Can I access the data with the wrong authentication?
* Do I get the correct response when sending no JSON data?
* Do I get the correct response when sending the wrong JSON data?
* Do I get the correct data when authentication and JSON are correct?

Once I was happy with the outputs I looked at setting up a testing enviroment to run some more stress tests on form validation. For testing we used, Mocha, Chai & Supertest. I created a bunch of tests to stress error inputs and to ensure the validation we had created was robust.

```
import { expect } from 'chai'
import setup from './lib/setup.js'
import tearDown from './lib/tearDown.js'

// Test user end points
describe('Testing user end point', () => {
  beforeEach(done => {
    setup(done)
  })
  afterEach(done => {
    tearDown(done)
  })

  // Test 1
  it('Should register a new user', done => {
    api.post('/api/register')
      .send(
        {
          username: 'newuser1',
          email: 'newuser1@newuser1.com',
          password: 'newuser1',
          passwordConfirmation: 'newuser1'
        })
      .end((err, res) => {
        expect(res.status).to.eq(201)
        expect(res.body.username).to.eq('newuser1')
        done()
      })
  })

  // Test 2
  it('Should register and login a new user', done => {
    api.post('/api/register')
      .send(
        {
          username: 'newuser1',
          email: 'newuser1@newuser1.com',
          password: 'newuser1',
          passwordConfirmation: 'newuser1'
        })
      .end((err, res) => {
        expect(res.status).to.eq(201)
        expect(res.body.username).to.eq('newuser1')

        api.post('/api/login')
          .send(
            {
              email: 'newuser1@newuser1.com',
              password: 'newuser1'
            })
          .end((err, res) => {
            expect(res.status).to.eq(202)
            expect(res.body.token).to.be.a('string')
            done()
          })
      })
  })

  it('Fail @ sign missing', done => {
    api.post('/api/register')
      .send({
        username: 'mrtesttest',
        email: 'testtester.com',
        password: 'mrtesttest229',
        passwordConfirmation: 'mrtesttest229'
      })
      .end((err, res) => {
        expect(res.status).to.equal(422)
        done()
        console.log(err)
      })
  })

  it('Fail period missing from email', done => {
    api.post('/api/register')
      .send({
        username: 'mrtesttest',
        email: 'test@testercom',
        password: 'mrtesttest229',
        passwordConfirmation: 'mrtesttest229'
      })
      .end((err, res) => {
        expect(res.status).to.equal(422)
        done()
        console.log(err)
      })
  })

  it('Fail @ sign is missing from email', done => {
    api.post('/api/register')
      .send({
        username: 'mrtesttest',
        email: 'testtester.com',
        password: 'mrtesttest229',
        passwordConfirmation: 'mrtesttest229'
      })
      .end((err, res) => {
        expect(res.status).to.equal(422)
        done()
        console.log(err)
      })
  })


  it('Fail password length too short', done => {

    api.post('/api/register')
      .send({
        username: 'mrtesttest',
        email: 'test@tester.com',
        password: 'short',
        passwordConfirmation: 'short'
      })
      .end((err, res) => {
        expect(res.status).to.equal(422)
        done()
        console.log(err)
      })
  })

  it('Fail password confirmation does not match', done => {
    api.post('/api/register')
      .send({
        username: 'mrtesttest',
        email: 'test@tester.com',
        password: 'thiswontmatch',
        passwordConfirmation: 'thispassword'
      })
      .end((err, res) => {
        expect(res.status).to.equal(422)
        done()
        console.log(err)
      })
  })

  it('Username is already taken', done => {
    api.post('/api/register')
      .send({
        username: 'jess',
        email: 'test@tester.com',
        password: 'thiswontmatch',
        passwordConfirmation: 'thispassword'
      })
      .end((err, res) => {
        expect(res.status).to.equal(422)
        done()
        console.log(err)
      })
  })

})
```

## Front-End

![here](https://github.com/JessKaria/project-3/blob/main/Home.png?raw=true)

Once we felt comfortable that our back-end was correctly built and our requests were returning the correct responses, we turned our attention to designing the front-end. We started to again divide tasks based on the routes we were responsible for which made things easier. As my team turned their attention to each of their pages - I moved on to navigation, login and registraion.

In the handleSubmit() function I was able to render the error messages created in the user model, as well as passing in { history } so we could then push users who completed the form to login.

At this point, we also let users upload a picture and we did this through Cloudinary which then allowed us to save a hosted image url saved in our Mongo database.

```
import React, { useState } from 'react'
import axios from 'axios'

export default function Register({ history }) {
  // const [inputValue, updateInputValue] = useState('')

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    image: 'http://static1.squarespace.com/static/53959f2ce4b0d0ce55449ea5/578f8a2015d5db7814d1ffd0/588f5d6b3a0411d31b553a1a/1490712148195/',
    password: '',
    passwordConfirmation: ''
  })

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    updateFormData({
      ...formData,
      [name]: value
    })
  }

  //! This will handle the image upload to Cloudinary
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

  function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = axios.post('/api/register', formData)
      history.push('/login')
    } catch (err) {
      const errorMessage = err.response.data

      if (errorMessage.errors.hasOwnProperty('email')) {
        alert(errorMessage.errors.email.message)
      }
      else if (errorMessage.errors.hasOwnProperty('password')) {
        alert('Please enter a valid password')
      }
    }
  }
```
![here](https://github.com/JessKaria/project-3/blob/main/register.png?raw=true)

## Edit Recipe

One of the features we wanted to build, was the ability for users to be able to edit their accounts and recipes, we achieved this with a simple PUT request but we were able to pre-populate those fields by executing a fetch request on the page load and then spread the data across the form fields. For our recipe model, some of our form choices expected an array, we manged this with preset of option through React Select, however we also used React Select that allowed us to create new options and save them as string within an array. This was perfect for when users wanted to add free text in for ingredients of a recipe for example.

Create a recipe 🍟

```
  const [formData, updateFormData] = useState({
    recipeName: '',
    description: '',
    linkOrMethod: '',
    servings: '',
    source: '',
    image: '',
    cookingTime: '',
    calories: '',
    ingredients: [],
    healthLabels: [],
    diet: [],
    allergens: []
  })
  })
``` 
Pre-populated form fields 🖥
![here](https://github.com/JessKaria/project-3/blob/main/burger.png?raw=true)

```
useEffect(() => {
    axios.get(`/api/recipes/${recipeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {
        const mappedFormData = {
          ...data,
          diet: data.diet.map(type => {
            return { value: type, label: type[0].toUpperCase() + type.slice(1) }
          }),
          healthLabels: data.healthLabels.map(type => {
            return { value: type, label: type[0].toUpperCase() + type.slice(1) }
          }),
          allergens: data.allergens.map(type => {
            return { value: type, label: type[0].toUpperCase() + type.slice(1) }
          }),
          ingredients: data.ingredients.map(type => {
            return { value: type, label: type[0].toUpperCase() + type.slice(1) }
          })
        }
        updateFormData(mappedFormData)
      })
  }, [])

```

## Navigation

![here](https://github.com/JessKaria/project-3/blob/main/ecommerce.png?raw=true)

In addition to user registration and login, I also headed up navigation creating buttons that are dynamic and update depending on if you are logged in or not. The navigation is also completely responsive and looks great on mobile.

```
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getLoggedInUserId } from './lib/auth'


const Navbar = ({ history }) => {
  const [mobNav, updateMobNav] = useState(false)
  const token = localStorage.getItem('token')
  // const [showUser, updateShowUser] = useState({})

  const handleLogout = () => {
    localStorage.removeItem('token')
    history.push('/logout')
  }
  const loggedIn = getLoggedInUserId()

  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-items" to={'/'}>
        <img src="https://cdn.shopify.com/s/files/1/0306/1016/1723/files/Logogoog.png?v=1614278360" width={350} />
      </Link>
      <a onClick={() => updateMobNav(!mobNav)} role="button" className={`navbar-burger ${mobNav ? 'is-active' : ''}`} >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div id="navbarBasicExample" className={`navbar-menu ${mobNav ? 'is-active' : ''}`}>
      <div className="navbar-start">
        <div className="navbar-item has-dropdown is-hoverable">
          <div className="navbar-dropdown">
            <hr className="navbar-divider" />
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="menu-item">
            {!loggedIn && <Link to="/register" className="button is-light is-rounded">Register</Link>}
            {<Link to="/recipes" className="button is-light is-rounded">All Recipes</Link>}
            {loggedIn && <Link to="/myaccount" className="button is-dark is-rounded">My Account</Link>}
            {loggedIn && <Link to="/modal" className="button is-light is-rounded">Post a Recipe</Link>}
            {!loggedIn && <Link to="/login" className="button is-dark is-rounded">Login</Link>}
            {loggedIn && <button className="button is-light is-rounded" onClick={handleLogout}>Logout</button>}
          </div>
        </div>
      </div>
    </div>
  </nav >
}

export default withRouter(Navbar)
```

## Speech Synthesis
![here](https://github.com/JessKaria/project-3/blob/main/Untitled%20design%20(5).png?raw=true)

From the ideation stage, we always discussed how it would be useful it would be if the ingredients could be read out to you. I was super happy to discover a Speech Synthesis tool that I implemented on our single recipe page. More importantly however this small feature made the content more accessible to those with vision impairements. I only wish we had implemented it across the entire website.

## Challenges

The most challenging part for myself was working trying the best way to structure the login, registration and edit modals. The whole process from building the backend from scratch to then sending requests to the back end we built was such an enjoyable process and taught be alot about the inportance of models what back-end constraints to consider when designing a system.

The second most challenging part of this project was trying to manage GIT and dealing with merge conflicts, we got over this pretty quickly, and learning this on the project was super useful.

## What I learned?

* Building this project really cemented my understanding of the MVC structure, and how websites retrive and render data from databases. 

* I learnt a lot about testing the value of good error handling, and how to stress test forms for user errors, coming from a background in marketing this was such a valuable lesson as I saw how validation was done from the ground up.

* In hindsight I think I could have been more adventurous and added some more functionality, including video or some other multi-media

## Future features

* Improve the edit account, allow users to be able to reset their password.
* Move the homeslider below fold
* Implement Speech Synthesis across the entire site
* Allow users to message each other
* Allow users to follow each other


