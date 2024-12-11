import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Verify.css'
import axios from "axios"

const Verify = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      console.log('Email:', email);
      const res = await axios.post("http://localhost:3002/api/verify", { email });
      console.log(res);
  
      if (res.status == 201) {
        alert(res.data.msg);
        console.log(email);
        
        localStorage.setItem("email", email);
  
       
      }
    } catch (error) {
     
      alert("Email Already Exist")
      navigate('/login')
    }
  };
  

  return (
    <div className="verify-container">
      <form className="verify-form" onSubmit={handleVerify}>
        <h2 className="verify-title">Verify Your Email</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <button type="submit" className="verify-button">
          Verify
        </button>
      </form>
    </div>
  );
};

export default Verify;
