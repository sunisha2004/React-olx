import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";

const Home = ({ setUser }) => {
  const navigate = useNavigate();


  const getUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      try {
        const res = await axios.get("http://localhost:3002/api/display", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          setUser(res.data.name);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    }
  };


  useEffect(() => {
    getUser();
    // getPosts();
  }, []);

  return (
    <div className="homepage">
        <h1>Home</h1>
      
    </div>
  );
};

export default Home;
