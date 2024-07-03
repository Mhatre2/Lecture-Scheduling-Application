import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
import { getUserSchedule } from "../../utils/APIRoutes";
import axios from "axios";
import "./Instructor.css"

import loaderImage from "../../assets/loader.gif";

const Instructor = ({}) => {
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState(undefined);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminKey = localStorage.getItem("secret-key-admin");
  const userKey = localStorage.getItem("secret-key");

  useEffect(() => {
    if (adminKey) {
      navigate("/admin");
    } else if (userKey) {
      setCurrUser(JSON.parse(userKey).username);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(getUserSchedule, {
          params: { currUser },
        });
        setSchedules(response.data.schedules);
      } catch (error) {
        console.error("Error fetching Schedule:", error);
        console.log("Error");
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, [currUser, navigate, schedules]);

  if (loading) {
    return (
      <div className="loader-container">
      <img src={loaderImage} alt="Loading..." className="loader-image" />
    </div>
    );
  }

  return (
    <div className="welcome-container-Inst">
      <div className="top-bar-Inst">
        <Logout />
        <h1 className="heading-Inst">Welcome {currUser}</h1>
      </div>
      <div className="main-content-Inst">
        <div className="lectures-container-Inst">
          <h2 className="section-heading-Inst">Your Upcoming Lectures</h2>
          <div className="scrollable-content-Inst">
            {schedules.map((schedule, index) => (
              <div key={index} className="lecture-card-Inst">
                <h3 className="card-heading-Inst">Course:</h3>
                <p className="course-content-Inst">{schedule.course}</p>

                <h3 className="card-heading-Inst">Lecture:</h3>
                <p className="lecture-content-Inst">{schedule.lecture}</p>

                <h3 className="card-heading-Inst">Date:</h3>
                <p className="date-content-Inst">
                  {new Date(schedule.date).toLocaleDateString()}
                </p>

                <h3 className="card-heading-Inst">Location:</h3>
                <p className="location-content-Inst">{schedule.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Instructor;
