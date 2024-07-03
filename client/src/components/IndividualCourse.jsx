
import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import { useNavigate, useParams } from "react-router-dom";
import {getSchedule,allInstructors,getCourseName,addSchedule,availablity} from "../utils/APIRoutes";
import axios from "axios";
import "./IndividualCourse.css";

const IndividualCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [dropDropUser, setDropUser] = useState(undefined);
  const [id, setId] = useState(null);
  const [courseName, setCourseName] = useState("Dummy Course");
  const [instructorData, setInstructorData] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [schedule, setSchedule] = useState([]);

  const adminKey = localStorage.getItem("secret-key-admin");
  const userKey = localStorage.getItem("secret-key");

  useEffect(() => {
    if (adminKey) {
      const adminUserData = JSON.parse(adminKey);
      setId(adminUserData._id);
    } else if (userKey) {
      navigate("/instructor");
    } else {
      navigate("/");
    }
  }, [navigate, adminKey, userKey]);

  const updateInstructorData = (instructor) => {
    const existingInstructor = instructorData.find(
      (i) => i === instructor.username
    );
    if (!existingInstructor) {
      setInstructorData((prevData) => [...prevData, instructor.username]);
    }
  };

  const getCourseNameById = async (courseId) => {
    try {
      const response = await axios.get(`${getCourseName}/${courseId}`);
      return response.data.courseName;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        if (courseId) {
          setCourseName(await getCourseNameById(courseId));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourseName();
  }, [courseId]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        if (id) {
          const response = await axios.get(`${allInstructors}/${id}`);
          const fetchedInstructors = response.data;
          fetchedInstructors.forEach(updateInstructorData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchInstructors();
  }, [id]);

  const [lectureData, setLectureData] = useState({
    instructor: "",
    date: "",
    subject: "", 
    lecture: "",
    location: "",
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleInstructorSelection = (e) => {
    const selectedInstructor = e.target.value;
    setDropUser(selectedInstructor);
    setSelectedInstructor(selectedInstructor);
  };

  useEffect(() => { }, [setDropUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const course = courseName;
    const scheduleData = {
      course: course,
      lecture: lectureData.lecture,
      date: lectureData.date,
      instructor: dropDropUser,
      location: lectureData.location,
    };
   
    try {
      const availabilityCheckResponse = await axios.post(
        availablity,
        {
          username: dropDropUser, 
          date: lectureData.date,
        }
      );

      if (availabilityCheckResponse.status === 200) {
 const response = await axios.post(addSchedule, scheduleData);
        console.log("Schedule added successfully:", response.data);
      } else {
      
        console.error("Instructor is not available on this date date.");
    
      }
    } catch (error) {
      console.error("Error checking instructor availability:", error);
    }

    setLectureData({
      instructor: "",
      date: "",
      subject: "",
      lecture: "",
      location: "",
    });
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(getSchedule, {
          params: { courseName },
        });
        setSchedule(response.data.schedules);
      } catch (error) {
        console.error("Error fetching Schedule:", error);
      }
    };
    fetchSchedules();
  }, [courseName, dropDropUser, handleSubmit]);

  return (
    <div className="container">
      <div className="top-bar">
        <Logout />
        <h1 className="course-name">{courseName}</h1>
        <h1 className="heading">Welcome</h1>
      </div>
      <div className="content-wrapper">
        {schedule.length === 0 ? (
          <p className="no-schedule-message">No lectures scheduled.</p>
        ) : (
          <div className="card-list">
            {schedule.map((scheduleItem, index) => (
              <div className="card" key={index}>
                <div className="card-content">
                  <h2>Lecture: {scheduleItem.lecture}</h2>
                  <p>Instructor: {scheduleItem.instructor}</p>
                  <p>
                    Date: {new Date(scheduleItem.date).toLocaleDateString()}
                  </p>
                  <p>Location: {scheduleItem.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <form className="form" onSubmit={handleSubmit}>
          <h2>Schedule a Lecture</h2>
          <select
            name="instructor"
            value={selectedInstructor}
            onChange={handleInstructorSelection}
            required
          >
            <option value="" disabled>
              Select Instructor
            </option>
            {instructorData.map((instructor, index) => (
              <option key={index} value={instructor}>
                {instructor}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={lectureData.date}
            onChange={handleChange}
            required
          />
          <select
            name="subject"
            value={lectureData.subject}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Course
            </option>
            <option>{courseName}</option>
          </select>
          <input
            type="text"
            name="lecture"
            placeholder="Lecture"
            value={lectureData.lecture}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={lectureData.location}
            onChange={handleChange}
            required
          />
          <button type="submit">Schedule Lecture</button>
        </form>
      </div>
    </div>
  );
};

export default IndividualCourse;
