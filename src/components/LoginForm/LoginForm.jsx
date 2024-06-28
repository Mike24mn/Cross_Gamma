import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import axios from 'axios';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  const handleAuthenticate = async () => {
    try {
      // request to backend /auth endpoint to get Schwab authentication URL
      const response = await axios.get('/auth');
  
      // ensure correct data structure from server
      const authUrl = response.data.authUrl; // aadjust according to backend response
  
      // redirect the user to Schwab authentication page
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error initiating authentication:', error);
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
        <button className="btn" onClick={handleAuthenticate}>Authenticate via Schwab</button>
      </div>
    </form>
    </div>
  );
}

export default LoginForm;
