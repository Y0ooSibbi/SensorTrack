import React, { useState } from 'react';
import axios from 'axios';
import { isExpired, decodeToken } from "react-jwt";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username: username,
        password: password,
        userType: userType
      });

      // Handle successful login response here
      console.log(response.data);
      const decodedToken = decodeToken(response.data.token);
      console.log(decodeToken);
      localStorage.setItem('token',response.data.token)
      localStorage.setItem('userId',response.data.userId)
      localStorage.setItem('username',response.data.username)
      localStorage.setItem('userType',userType)


      window.location.href='http://localhost:3000/graph-list-page'
    } catch (error) {
      // setError('Invalid username or password');
      toast.error('Invalid username or password'); // Display success notification
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
              <ToastContainer />
        {/* <div className="image-container">
          <img src="your_image_url" alt="Image" />
        </div> */}
      <div style={{alignItems:'center'}} className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
          {/* <label>Login As </label> */}
          <select id='select-series' style={{width:300}} value={userType} onChange={(e) => setUserType(e.target.value)} required>
            <option value="">Select User Type</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select><br />
          <button style={{width:300,height:40}} className='grediant-button' type="submit">Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
