import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpass: "",
    
  });
//   const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({ ...formData, pic: reader.result }); // Save Base64 string
//         setPreviewImage(reader.result); // Set preview image
//       };
//       reader.readAsDataURL(file); // Convert to Base64
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await axios.post("http://localhost:3002/api/register", formData);
      if (res.status === 200) {
        alert(res.data.msg)
        navigate("/login")
      } else {
        alert(res.data.msg);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="olx-register">
      <div className="register-box">
        <div className="header">
          <h1>Create an Account</h1>
          <p>Join the community and start buying or selling today!</p>
        </div>
        <form onSubmit={handleSubmit}>
          {/* <div className="form-group">
            
              <img
                src="#"
                alt="Profile Preview"
                className="profile-preview"
              />
            
            <label>Profile Picture</label>
            <input type="file" accept="image/*"  />
          </div> */}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmpass"
              value={formData.confirmpass}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            Register
          </button>
        </form>
        <div className="footer">
          <p>Already have an account? <span onClick={() => navigate("/login")}>Log in</span></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
