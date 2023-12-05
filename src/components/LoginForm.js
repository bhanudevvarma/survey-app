import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from '../redux/loginReducers';
import CustomGoogleLoginButton from './GoogleLoginButton';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import './LoginForm.css'
import { Navigate, useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  // const handleLoginSuccess = async (userData) => {
  //   try {
  //     // const response = await axios.post('http://localhost:8080/api/auth/login', {
  //     //   username,
  //     //   password,
  //     // });
  //     console.log('userData:--',userData);
  //     // dispatch(login({ token: response.data.token }));
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   }
  // };

  const handleLoginSuccess = async (userData) => {
    try {
      console.log(userData.access_token)
      const response = await axios.post(
        'http://localhost:8080/api/auth/google-logins',
        {
          accessToken: userData.access_token,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Google Login Successful:', response);

      // If backend authentication is successful, navigate to the survey page
      Navigate('/survey');
    } catch (error) {
      console.error('Google Login failed:', error);
    }
  };

  const handleLogin = () => {
    console.log('handle loin in login form')
  }

  const userlogin = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: (error) => console.log('Login Failed:', error)
});


  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button style = {{ marginTop: '10px', cursor: 'pointer'}} type="submit">Submit</button>
        </form>
      </div>
      <span className="or-separator">
        <span className="or-text">OR</span>
      </span>
      <div className="centered-container">
      <button className="bubble-btn button"  onClick={() => userlogin()}>Sign in with Google</button>
      </div>

     
    </div>
  );
};

export default LoginForm;

