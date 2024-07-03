import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
import { getUserSchedule } from "../../utils/APIRoutes";
import axios from "axios";
import './IndividualInstructor.css';
import loaderImage from "../../assets/loader.gif";
import { useParams } from "react-router-dom";

const IndividualInstructor = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [currUser, setCurrUser] = useState(undefined);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminKey = localStorage.getItem("secret-key-admin");

  useEffect(() => {
    if (!adminKey) {
      localStorage.clear();
      navigate("/");
    }
  }, [adminKey, navigate]);

  useEffect(() => {
    setCurrUser(username);

    const fetchSchedules = async () => {
      try {
        const response = await axios.get(getUserSchedule, {
          params: { currUser: username }, 
        });
        setSchedules(response.data.schedules);
      } catch (error) {
        console.error("Error fetching Schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [currUser, navigate]); 
  if (loading) {
    return (
      <div className="loader-container">
      <img src={loaderImage} alt="Loading..." className="loader-image" />
    </div>
    );
  }

  return (
    <div className="welcome-container">
    <div className="top-bar-Individual">
      <Logout />
      <h1 className="heading-Individual">Welcome Admin</h1>
    </div>
    <div className="main-content-Individual">
      <div className="lectures-container">
        <h2 className="section-heading">{ currUser } you have been given following lectures</h2>
        <div className="scrollable-content">
          {schedules.map((schedule, index) => (
            <div key={index} className="lecture-card">
              <h3 className="card-heading">Course:</h3>
              <p className="course-content">{schedule.course}</p>
              <h3 className="card-heading">Lecture:</h3>
              <p className="lecture-content">{schedule.lecture}</p>
              <h3 className="card-heading">Date:</h3>
              <p className="date-content">
                {new Date(schedule.date).toLocaleDateString()}
              </p>
              <h3 className="card-heading">Location:</h3>
              <p className="location-content">{schedule.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default IndividualInstructor;
