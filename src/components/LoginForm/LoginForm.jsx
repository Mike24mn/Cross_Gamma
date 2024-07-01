import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import axios from 'axios';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const errors = useSelector(store => store.errors)
  const dispatch = useDispatch()

  const login = (event) => {
    event.preventDefault()

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      })
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' })
    }
  } // end login

  const handleAuthenticate = async (event) => {
    event.preventDefault()
    try {
      console.log("Button clicked, starting authentication")
      const response = await axios.get('http://localhost:5001/auth')
      console.log('Received response from /auth ONLY RESPONSE WITHOUT .DATA:', response)
      console.log('Received response.data from /auth:', response.data)
      const authUrl = response.data.authUrl // check the structure of response.data
      if (authUrl) {
        window.location.href = authUrl
      } else {
        console.error('Authentication URL not found in response', response.data)
      }
    } catch (error) {
      console.error('Error initiating authentication:', error)
    }
  }

  return (
    <div>
    <h1 className="welcomeclass">Welcome to Cross-Gamma,<br /> Analysis awaits you...</h1>
    <form className="formPanel" onSubmit={login}>
      <h2>Login:</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}  
      <div>
        <label htmlFor="username">
          Username:
          <input className="inputbackground" type ="text" name="username" placeholder='Username' required
            value={username}
            onChange={(event) => setUsername(event.target.value)}>
          </input>
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input className="inputbackground" type ="password" name="password" placeholder='Password' required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
        <button className="btn" type="button" onClick={handleAuthenticate}>Authenticate via Schwab</button>
      </div>
    </form>
    </div>
  )
}

export default LoginForm
