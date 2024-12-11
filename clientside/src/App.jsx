import { useState } from 'react';
import Navbar from './components/navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Verify from './components/Verify';
import Profile from './components/Profile';
import AddUserData from './components/AddUserData';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditUserData from './components/EditUserData';
import Sell from './components/Sell';
import ViewUserPost from './components/ViewUserPost';
import ViewPost from './components/ViewPost'
import EditPost from './components/EditPost';

function App() {
  const [user, setUser] = useState("");
  console.log("app " + user);

  return (
    <>
      <Router>
        {user && <Navbar user={user} />}
        <Routes>
          <Route path="/" element={<Home setUser={setUser} />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addUserData" element={<AddUserData />} />
          <Route path='/editUserData' element={<EditUserData/>} />
          <Route path='/sell' element={<Sell/>} />
          <Route path='/viewUserPost/:id' element={<ViewUserPost/>} />
          <Route path='/viewPost/:id' element={<ViewPost/>} />
          <Route path='/editPost/:id' element={<EditPost/>} />





        </Routes>
      </Router>
    </>
  );
}

export default App;
