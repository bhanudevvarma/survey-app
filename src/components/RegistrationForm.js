// import React,{useState} from "react";
// import axios from 'axios';

// const RegistrationForm = () => {
//     const[username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleRegistration = async () => {
//         try {
//           const response = await axios.post('http://localhost:8080/api/auth/register', {
//             username,
//             password,
//           })
//           console.log(response.data);
//         } catch (error) {
//           console.error('Registration failed:', error);
//         }
//       }
//       return (
//         <div>
//           <h2>Registration</h2>
//           <label>Username:</label>
//           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//           <label>Password:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           <button onClick={handleRegistration}>Register</button>
//         </div>
//       )
//     }
    
//     export default RegistrationForm;

import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    login: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);
      console.log('Registration Successful:', response.data);
      // You can redirect or perform other actions after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Login:
          <input type="text" name="login" value={formData.login} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
