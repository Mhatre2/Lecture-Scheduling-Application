import React from "react";
import Logout from "../Logout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Instructors from "./Instructors";
import Courses from "./CoursesAdmin";
import "./Welcome.css";

export default function Welcome({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="welcome-container">
      <div className="top-bar">
        <Logout />
        <h1 className="heading">Welcome</h1>
      </div>
      <div className="main-content">
        <div className="instructors-container">
          <Instructors user={user} />
        </div>
        <div className="courses-container">
          <Courses user={user} />
        </div>
      </div>
    </div>

  );
}

