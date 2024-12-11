import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";

const Home = ({ setUser }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([])
  const token = localStorage.getItem("token")


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

  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3002/api/getAllPosts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setPosts(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser()
    getPosts()
  }, [])

 

  return (
    <div className="homepage">
      {/* <h1 className="homepage-title">Explore Posts</h1> */}
      <div className="post-grid">
        {posts.length === 0 ? (
          <div className="no-posts-message">No posts available</div>
        ) : (
          posts.map((post) => (
            <Link key={post._id} to={`/viewPost/${post._id}`} className="post-link">
              <div className="post-card">
                {post.images && post.images.length > 0 && (
                  <img
                    src={post.images[0]}
                    alt={post.caption}
                    className="post-img"
                  />
                )}
                <div className="post-capt">{post.title}</div>
                <div className="post-descript">{post.description}</div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
