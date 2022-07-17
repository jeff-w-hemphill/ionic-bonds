import React from 'react'
import AuthContext from "../../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import logo from '../../ionic_logo.png';

const HeaderCard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
      // if used in more components, this should be in context 
      // axios to /logout endpoint 
      setAuth({});
      navigate('/login');
  }
  return (
    <div className='header-card'>
      <div className="logo">
        <img src={logo} className="rotate-image" />
        <h1>Ionic Bonds</h1>
      </div>
        <p>Chatting as: <b style={{ color: 'black' }}>{auth.username}</b></p>
        <a onClick={logout}>logout</a>
    </div>
  )
}

export default HeaderCard