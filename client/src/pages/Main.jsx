import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Main.css';
const Main = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    }
  }, []);

  return (
    <div className="main-container">
      <div className="overlay">
        <h1 className="message">Welcome to Course Schedule Application</h1>
        <img className="course-image" src="https://cdn.dribbble.com/users/2272835/screenshots/9602204/online_register.gif" alt="welcome gif" />
        <div className="button-container">
          <button className="button" onClick={handleLoginClick}>Login</button>
          <button className="button" onClick={handleRegisterClick}>Register</button>
        </div>
      </div>
    </div>
  );
};


export default Main;
