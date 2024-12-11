import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await axios.post("http://localhost:3002/api/login", formData);
      console.log(res.data);

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        alert("Successfully logged in!");
        navigate("/");
      } else {
        alert(res.data.msg);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="olx-login">
      <div className="login-box">
        <div className="login-header">
          <h1>Welcome Back!</h1>
          <p>Log in to access your account and start exploring!</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group-login">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group-login">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn-submit-login">
            Login
          </button>
        </form>
        <div className="footer-login">
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/verify")}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
