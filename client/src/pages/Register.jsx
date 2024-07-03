import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Register.css"
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminKey = localStorage.getItem("secret-key-admin");
    const userKey = localStorage.getItem("secret-key");

    if (adminKey) {
      navigate("/admin");
    } else if (userKey) {
      navigate("/instructor");
    }
  }, [navigate]);

  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const validateForm = () => {
    const { username, email, password } = formValues;

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long.", toastOptions);
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.", toastOptions);
      return false;
    }

    if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { username, email, password, isAdmin } = formValues;
      try {
        const response = await axios.post(registerRoute, {
          username,
          email,
          password,
          isAdmin,
        });

        const { data } = response;

        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        } else if (data.status === true) {
          if (data.user.isAdmin) {
            localStorage.setItem("secret-key-admin", JSON.stringify(data.user));
            navigate("/admin");
          } else {
            localStorage.setItem("secret-key", JSON.stringify(data.user));
            navigate("/instructor");
          }
        }
      } catch (error) {
        toast.error("An error occurred during registration.", toastOptions);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <div className="form-container-register">
        <img
          src="https://toxicologycongress.wordpress.com/wp-content/uploads/2018/10/registernowgif.gif"
          alt="Register Now"
          className="registration-gif"
        />
        <div className="form-content-register">
    
          <form className="form-register" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            
            <div className="checkbox-container-register">
              <input
                type="checkbox"
                id="isAdmin"
                name="isAdmin"
                checked={formValues.isAdmin}
                onChange={handleChange}
              />
              <label htmlFor="isAdmin">Admin</label>
            </div>
            <button className="button-register" type="submit">Create User</button>
            <span>
              Already have an account? <Link to="/login">Login.</Link>
            </span>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;


