import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Login.css';
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        if (data.user.isAdmin) {
          localStorage.setItem("secret-key-admin", JSON.stringify(data.user));
          navigate("/admin");
        } else {
          localStorage.setItem("secret-key", JSON.stringify(data.user));
          navigate("/instructor");
        }
      }
    }
  };

  return (
    <>
      <div className="form-container-login">
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Admin Login</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            className="input"
          />
          <button type="submit" className="submit-button">Log In</button>
          <span>
            Don't have an account? 
            <br/>
            <Link to="/register">Register Now</Link>
          </span>
          
        </form>
      </div>
      <ToastContainer />
 

    </>
  );
}

